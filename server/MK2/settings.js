const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

const SHIFT_DIR = 'D:/Debug/';
const FILE_PATH = path.join(SHIFT_DIR, 'shifttime.txt');
const stdFilePath = path.join(SHIFT_DIR, 'StdDeviationTime.txt');
const stdAFilePath = path.join(SHIFT_DIR, 'StdDeviationTime_a.txt');
const timeDevFilePath = path.join(SHIFT_DIR, 'DevTime.txt');

let wss;

// Generic function to read numeric arrays from a file
function readNumberFile(filePath, length = 9) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const values = data
      .split(/\r?\n/)
      .map(line => parseFloat(line.trim()))
      .filter(val => !isNaN(val));
    while (values.length < length) values.push(0);
    return values;
  } catch (err) {
    console.error('Error reading file', filePath, err);
    return new Array(length).fill(0);
  }
}

// Read shift times
function readShiftTimes() {
  const lines = fs.readFileSync(FILE_PATH, 'utf8')
    .trim()
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(Boolean);

  if (lines.length < 3) throw new Error('Shift file must have 3 lines');
  const [first, second, third] = lines;
  return { first, second, third };
}

// Helper for consistent error responses
function handleError(res, err, msg) {
  console.error(err);
  res.status(500).json({ error: msg });
}

// Routes
router.get('/shifts', (req, res) => {
  try {
    res.json(readShiftTimes());
  } catch (err) {
    handleError(res, err, 'Failed to read shift timings');
  }
});

router.post('/update-shifts', (req, res) => {
  try {
    const { first, second, third } = req.body;
    if (!first || !second || !third)
      return res.status(400).json({ error: 'All three shift times required' });

    fs.writeFileSync(FILE_PATH, `${first}\n${second}\n${third}`, 'utf8');
    broadcastShiftTimes();
    res.json({ message: 'Shift timings updated successfully' });
  } catch (err) {
    handleError(res, err, 'Failed to update shift timings');
  }
});

router.post('/mk2_update-table', (req, res) => {
  try {
    const { col2, col3, col4 } = req.body;
    if (!col2 || !col3 || !col4 || col2.length !== 9 || col3.length !== 9 || col4.length !== 9) {
      return res.status(400).json({ error: 'Invalid table data' });
    }

    fs.writeFileSync(stdFilePath, col2.join('\n'), 'utf8');
    fs.writeFileSync(stdAFilePath, col3.join('\n'), 'utf8');
    fs.writeFileSync(timeDevFilePath, col4.join('\n'), 'utf8');

    broadcastTableData();
    res.json({ message: 'Table updated successfully' });
  } catch (err) {
    handleError(res, err, 'Failed to update table');
  }
});

// Get table data
function getTableData() {
  const stdValues = readNumberFile(stdFilePath);
  const stdAValues = readNumberFile(stdAFilePath);
  const timeDevValues = readNumberFile(timeDevFilePath);

  const tableData = {};
  for (let i = 0; i < 9; i++) {
    tableData[`col${i + 1}_2`] = stdValues[i];
    tableData[`col${i + 1}_3`] = stdAValues[i];
    tableData[`col${i + 1}_4`] = timeDevValues[i];
  }
  return tableData;
}

// Broadcast helpers
function broadcast(type, dataFunc) {
  if (!wss) return;
  const data = dataFunc();
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type, data }));
    }
  });
}

function broadcastTableData() {
  broadcast('tableData', getTableData);
}

function broadcastShiftTimes() {
  broadcast('shiftTimes', readShiftTimes);
}

// WebSocket + file watchers
function setupWebSocket(server) {
  wss = new WebSocket.Server({ server });

  wss.on('connection', ws => {
    try {
      ws.send(JSON.stringify({ type: 'shiftTimes', data: readShiftTimes() }));
      ws.send(JSON.stringify({ type: 'tableData', data: getTableData() }));
    } catch (err) {
      console.error(err);
    }
  });

  const watchedFiles = [
    { file: FILE_PATH, callback: broadcastShiftTimes },
    { file: stdFilePath, callback: broadcastTableData },
    { file: stdAFilePath, callback: broadcastTableData },
    { file: timeDevFilePath, callback: broadcastTableData },
  ];

  watchedFiles.forEach(({ file, callback }) =>
    fs.watch(file, { persistent: true }, eventType => {
      if (eventType === 'change') callback();
    })
  );
}

module.exports = { router, setupWebSocket };