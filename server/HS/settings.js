const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

const SHIFT_DIR = 'D:/Debug/';
const FILE_PATH = path.join(SHIFT_DIR, 'shifttime.txt');

const stdFilePath = path.join(SHIFT_DIR, 'StdDeviationTime.txt');
const stdAFilePath = path.join(SHIFT_DIR, 'StdDeviationTime_a.txt');

const timeDevFilePath = path.join(SHIFT_DIR, "DevTime.txt");


let wss;

function readShiftTimes() {
  const lines = fs.readFileSync(FILE_PATH, 'utf8').trim()
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(Boolean);

  if (lines.length < 3) throw new Error('FIRST.txt must have 3 lines');
  const [first, second, third] = lines;
  return { first, second, third };
}

router.get('/shifts', (req, res) => {
  try { res.json(readShiftTimes()); }
  catch(err){ res.status(500).json({ error: 'Failed to read shift timings' }); }
});

router.post('/update-shifts', (req, res) => {
  try {
    const { first, second, third } = req.body;
    if(!first || !second || !third) return res.status(400).json({ error: 'All three shift times required' });

    fs.writeFileSync(FILE_PATH, `${first}\n${second}\n${third}`, 'utf8');

    broadcastShiftTimes();
    res.json({ message: 'Shift timings updated successfully' });
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update shift timings' });
  }
});

function readFileToArray(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    let values = data
      .split(/\r?\n/)
      .map(line => Number.parseFloat(line.trim()))
      .filter(val => !Number.isNaN(val));
    while (values.length < 9) values.push(0);
    return values;
  } catch(err) {
    console.error('Error reading file', filePath, err);
    return Array(9).fill(0);
  }
}

function readTimeDev() {
  try {
    const data = fs.readFileSync(timeDevFilePath, 'utf8');
    let values = data
      .split(/\r?\n/)
      .map(line => Number.parseFloat(line.trim()))
      .filter(val => !Number.isNaN(val));
    while (values.length < 9) values.push(0);
    return values;
  } catch(err) {
    console.error('Error reading TIMEDEV file', err);
    return Array(9).fill(0);
  }
}

router.post('/hs_update-table', (req, res) => {
  try {
    const { col2, col3, col4 } = req.body;

    if (!col2 || !col3 || !col4 || col2.length !== 9 || col3.length !== 9 || col4.length !== 9) {
      return res.status(400).json({ error: 'Invalid table data' });
    }

    const col2Content = col2.join('\n');
    const col3Content = col3.join('\n');
    const col4Content = col4.join('\n');

    fs.writeFileSync(stdFilePath, col2Content, 'utf8');
    fs.writeFileSync(stdAFilePath, col3Content, 'utf8');
    fs.writeFileSync(timeDevFilePath, col4Content, 'utf8');

    broadcastTableData();

    res.json({ message: 'Table updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update table' });
  }
});

function getTableData() {
  const stdValues = readFileToArray(stdFilePath);
  const stdAValues = readFileToArray(stdAFilePath);
  const timeDevValues = readFileToArray(timeDevFilePath);

  const tableData = {};
  for (let i = 0; i < 9; i++) {
    tableData[`col${i + 1}_2`] = stdValues[i];
    tableData[`col${i + 1}_3`] = stdAValues[i];
    tableData[`col${i + 1}_4`] = timeDevValues[i];
  }
  return tableData;
}

function broadcastTableData() {
  if (!wss) return;
  const tableData = getTableData();
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: 'tableData', data: tableData }));
    }
  });
  // console.log('Table data broadcasted:', tableData);
}

function broadcastShiftTimes() {
  if (!wss) return;

  const data = readShiftTimes();

  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: "shiftTimes", data }));
    }
  });
}

function setupWebSocket(server){
  wss = new WebSocket.Server({ server });

  wss.on('connection', ws => {
    try {
      ws.send(JSON.stringify({ type: 'shiftTimes', data: readShiftTimes() }));
      ws.send(JSON.stringify({ type: 'tableData', data: getTableData() }));
    } catch(err){ console.error(err); }
  });

  fs.watch(FILE_PATH, { persistent: true }, (eventType) => {
    if(eventType === 'change'){
      broadcastShiftTimes();
    }
  });

[stdFilePath, stdAFilePath, timeDevFilePath].forEach(file => { 
  fs.watch(file, { persistent: true }, (eventType) => {
    if (eventType === "change") {
      broadcastTableData();
    }
  });
});


  // console.log('✅ WebSocket server ready');
}

module.exports = { router, setupWebSocket };