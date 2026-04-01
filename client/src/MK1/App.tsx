import '../MK1/index.css';

import {
  useEffect,
  useState,
} from 'react';

import menu from '../assets/menu.gif';
import { useTheme } from '../hooks/useTheme';
import Menu from '../MK1/menu';

interface Mk1Data {
  mk1_today_data: number;
  mk1_present_data: number;
  mk1_actual_data: number;
  mk1_stop_time_data: string;
  mk1_stop_time_minutes_data: string;
  mk1_OA_data: number;
  mk1_over_time_data: number;
  mk1_pf_data: number;
  mk1_np_data: number;
}


function App() {
  const [showMenu, setShowMenu] = useState(false);
  const [, setLoading] = useState(true);
  const [boxes, setBoxes] = useState<BoxData>({});
  const [mcboxes, setmcBoxes] = useState<BoxData>({});

 const { theme, toggleTheme } = useTheme();

  const [activeType, setActiveType] = useState<"red" | "yellow" | "cumduration">("red");
  const [boxData, setBoxData] = useState<BoxData>({});
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [selectMC, setSelectMC] = useState(false);
  const [selectC, setSelectC] = useState(false);
  const [currentCellId, setCurrentCellId] = useState<string | null>(null);
  const [loginOverlayVisible, setLoginOverlayVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [overlayUserError, setOverlayUserError] = useState(false);
  const [overlayPassError, setOverlayPassError] = useState(false);
  const [overlayErrorMsg, setOverlayErrorMsg] = useState("");

    
const handleOverlayLogin = async () => {
  setOverlayUserError(false);
  setOverlayPassError(false);
  setOverlayErrorMsg("");

  if (!username) {
    setOverlayUserError(true);
    return;
  }
  if (!password) {
    setOverlayPassError(true);
    return;
  }

  try {
    const response = await fetch("http://192.168.0.24:4002/api/logincredentials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (data.field === "username") setOverlayUserError(true);
      if (data.field === "password") setOverlayPassError(true);
      setOverlayErrorMsg("Username or Password incorrect");
      return;
    }

    if (data.field === "status") {
      setOverlayErrorMsg("User already logged in on another device");
      return;
    }

    setLoginOverlayVisible(false);
    setOverlayVisible(true); 

    setUsername("");
    setPassword("");

  } catch (err) {
    console.error(err);
    setOverlayErrorMsg("Server error. Try again.");
  }
};


useEffect(() => { 
   const tdIds = [ '3_1_1','3_1_3','3_1_5','3_1_7','3_1_9','3_1_11','3_1_13','3_1_15','3_1_17','3_1_19', 
    '4_1_1','4_1_3','4_1_5','4_1_7','4_1_9','4_1_11','4_1_13','4_1_15','4_1_17','4_1_19', 
    '5_1_1','5_1_3','5_1_5','5_1_7','5_1_9','5_1_11','5_1_13','5_1_15','5_1_17','5_1_19', 
    '6_1_1','6_1_3','6_1_5','6_1_7','6_1_9','6_1_11','6_1_13','6_1_15','6_1_17','6_1_19',  
    ]; 
    tdIds.forEach(id => { 
      const cell = document.getElementById(id);
       if (cell) {
         if (cell.innerText.trim() !== '') { 
          cell.style.backgroundColor = 'rgb(8, 167, 8)';
           cell.style.color = 'white';
            cell.style.border = '1px solid white'; 
          } else {
             cell.style.backgroundColor = 'transparent';
              cell.style.color = 'black'; 
              cell.style.border = '1px solid white';
             } }
             });
             });
             
useEffect(() => { 
  const tdIds = ['3_1_2','3_1_4','3_1_6','3_1_8','3_1_10','3_1_12','3_1_14','3_1_16','3_1_18','3_1_20', 
'4_1_2','4_1_4','4_1_6','4_1_8','4_1_10','4_1_12','4_1_14','4_1_16','4_1_18','4_1_20', 
'5_1_2','5_1_4','5_1_6','5_1_8','5_1_10','5_1_12','5_1_14','5_1_16','5_1_18','5_1_20', 
'6_1_2','6_1_4','6_1_6','6_1_8','6_1_10','6_1_12','6_1_14','6_1_16','6_1_18','6_1_20',  
      ]; 
      tdIds.forEach(id => { const cell = document.getElementById(id);
         if (cell) {
           if (cell.innerText.trim() !== '') {
             cell.style.backgroundColor = 'cyan';
              cell.style.color = 'black';
               cell.style.border = '1px solid white';
               } else {
                 cell.style.backgroundColor = 'transparent'; 
                 cell.style.color = 'black'; cell.style.border = '1px solid white';
                 } }
                 });
                 });


const dbBoxMapping: Record<string, { mc: string; c: string }> = {
  "3_2_1": { mc: "BOX1_M", c: "BOX1_C" },
  "3_2_3": { mc: "BOX3_M", c: "BOX3_C" },
  "3_2_4": { mc: "BOX4_M", c: "BOX4_C" },
  "3_2_5": { mc: "BOX5_M", c: "BOX5_C" },
  "3_2_6": { mc: "BOX6_M", c: "BOX6_C" },
  "3_2_7": { mc: "BOX7_M", c: "BOX7_C" },
  "3_2_8": { mc: "BOX8_M", c: "BOX8_C" },
  "3_2_9": { mc: "BOX9_M", c: "BOX9_C" },
  "3_2_10": { mc: "BOX10_M", c: "BOX10_C" },
  "4_2_1": { mc: "BOX11_M", c: "BOX11_C" },
  "4_2_2": { mc: "BOX12_M", c: "BOX12_C" },
  "4_2_3": { mc: "BOX13_M", c: "BOX13_C" },
  "4_2_4": { mc: "BOX14_M", c: "BOX14_C" },
  "4_2_5": { mc: "BOX15_M", c: "BOX15_C" },
  "4_2_6": { mc: "BOX16_M", c: "BOX16_C" },
  "4_2_7": { mc: "BOX17_M", c: "BOX17_C" },
  "4_2_8": { mc: "BOX18_M", c: "BOX18_C" },
  "4_2_9": { mc: "BOX19_M", c: "BOX19_C" },
  "4_2_10": { mc: "BOX20_M", c: "BOX20_C" },
  "5_2_1": { mc: "BOX21_M", c: "BOX21_C" },
  "5_2_2": { mc: "BOX22_M", c: "BOX22_C" },
  "5_2_3": { mc: "BOX23_M", c: "BOX23_C" },
  "5_2_4": { mc: "BOX24_M", c: "BOX24_C" },
  "5_2_5": { mc: "BOX25_M", c: "BOX25_C" },
  "5_2_6": { mc: "BOX26_M", c: "BOX26_C" },
  "5_2_7": { mc: "BOX27_M", c: "BOX27_C" },
  "5_2_8": { mc: "BOX28_M", c: "BOX28_C" },
  "5_2_9": { mc: "BOX29_M", c: "BOX29_C" },
  "5_2_10": { mc: "BOX30_M", c: "BOX30_C" },
  "6_2_1": { mc: "BOX31_M", c: "BOX31_C" },
  "6_2_2": { mc: "BOX32_M", c: "BOX32_C" },
  "6_2_3": { mc: "BOX33_M", c: "BOX33_C" },
  "6_2_4": { mc: "BOX34_M", c: "BOX34_C" },
  "6_2_5": { mc: "BOX35_M", c: "BOX35_C" },
  "6_2_6": { mc: "BOX36_M", c: "BOX36_C" },
  "6_2_7": { mc: "BOX37_M", c: "BOX37_C" },
  "6_2_8": { mc: "BOX38_M", c: "BOX38_C" },
};


 useEffect(() => {
  const fetchBoxes = async () => {
    let url = "";
    if (activeType === "red") url = "http://192.168.0.24:4002/api/mk1_red_time";
    if (activeType === "yellow") url = "http://192.168.0.24:4002/api/mk1_yellow_time";
    // if (activeType === "cumduration") url = "http://192.168.0.24:4002/api/mk1_boxes_cumduration";

    try {
      const res = await fetch(url);
      const data = await res.json();
      setBoxData(data);
      setLoading(false);
    } catch (err) {
      console.error("API fetch error:", err);
      setLoading(false);
    }
  };

  fetchBoxes();

  const interval = setInterval(fetchBoxes, 1000); 

  return () => clearInterval(interval); 
}, [activeType]);


  const tdIdsToFill = [

  ...Array.from({length: 4}, (_, r) => 
    Array.from({length: 10}, (_, c) => `${3 + r}_3_${c+1}`)
  ).flat(),

  "7_3_1",
  "7_3_2",
  "7_3_5",
];

useEffect(() => {
  if (!boxData) return;

  const keys = Object.keys(boxData).filter(key => key.startsWith("box"));
  let boxCounter = 0;

  tdIdsToFill.forEach(tdId => {
    const td = document.getElementById(tdId);
    if (!td) return;

    const key = keys[boxCounter];
    let value = key ? boxData[key] : 0;

   const totalSeconds = Number(value) || 0;

const minutes = Math.floor(totalSeconds / 60);
const seconds = totalSeconds % 60;

value = `${minutes.toString().padStart(2, "0")}:${seconds
  .toString()
  .padStart(2, "0")}`;


    td.textContent = value as string;
if (activeType === "red") {
  td.style.backgroundColor = "transparent";

  td.style.border = "1px solid white";
} 
else if (activeType === "yellow") {
  td.style.backgroundColor = "transparent";

  td.style.border = "1px solid white";
} 
else {

  td.style.backgroundColor = "white";
    td.style.border = "1px solid white";
}

    td.style.color = "white";

    boxCounter++;
  });
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [boxData, activeType]);

const [data, setData] = useState<Mk1Data | null>(null);

useEffect(() => {
  const fetchData = () => {
    fetch("http://192.168.0.24:4002/api/mk1")
      .then(res => res.json())
      .then(result => {
        setData(result);
      })
      .catch(err => {
        console.error("API error:", err);
      });
  };

  fetchData();

  const interval = setInterval(fetchData, 1000);

  return () => clearInterval(interval); 
}, []);

  interface BoxData {
  [key: string]: string | number;
}


//  useEffect(() => {
//   const fetchBoxes = async () => {
//     try {
//       const res = await fetch("http://192.168.0.24:4002/mk1_boxes");
//       const data = await res.json();
//       setBoxes(data);
//     } catch (err) {
//       console.error("mk1_boxes error:", err);
//     }
//   };

//   fetchBoxes(); 

//   const interval = setInterval(() => {
//     fetchBoxes();
//   }, 1000); 
//   return () => clearInterval(interval); 
// }, []);


  const fetchBoxes = async () => {
  try {
    const res = await fetch("http://192.168.0.24:4002/api/mk1_mc");
    const data = await res.json();
    setmcBoxes(data);
  } catch (err) {
    console.error(err);
  }
};

useEffect(() => {
  fetchBoxes();
  const interval = setInterval(fetchBoxes, 1000); 
  return () => clearInterval(interval);
}, []);


  useEffect(() => {
    const fetchBoxes = () => {
      fetch("http://192.168.0.24:4002/api/mk1_boxes_colors")
        .then(res => res.json())
        .then(data => setBoxes(data))
        .catch(console.error);
    };

    fetchBoxes();
    const interval = setInterval(fetchBoxes, 1000);
    return () => clearInterval(interval);
  }, []);


const colorMap: { [key: string]: string } = {
  w: "white",
  y: "yellow",
  g: "rgb(8, 167, 8)",
  r: "red",
  b: "blue",
  o: "orange",

  rb: "red-blink",
  yb: "yellow-blink",
  ob: "orange-blink",
};


const getBackgroundColor = (colorCode: string | undefined) => {
  if (!colorCode) return "transparent";

  const code = colorCode.trim().toLowerCase();

  return colorMap[code] || "transparent";
};


const getTextColor = (bgColor: string) => {
  switch (bgColor) {
    case "yellow":
    case "white":
      return "black";

    case "orange":
    case "rgb(8, 167, 8)":
    case "red":
    case "blue":
      return "white";
  }
};
const getCellProps = (colorCode?: string) => {
  const code = colorCode?.trim().toLowerCase() || "";

  let className = "cell-base";
  let backgroundColor = "transparent";
  let textColor: string | undefined;

  switch (code) {
    case "rb":
      className += " red-blink";
      textColor = "white";
      break;

    case "yb":
      className += " yellow-blink";
      textColor = "white";
      break;

    case "ob":
      className += " orange-blink";
      textColor = "black";
      break;

    default:
      backgroundColor = getBackgroundColor(code);
      textColor = getTextColor(backgroundColor);
  }

  return {
    className,
    style: {
      backgroundColor,
      color: textColor
    }
  };
};

  interface RedCountData {
  [key: string]: number;
}

const [redCounts, setRedCounts] = useState<RedCountData>({});

useEffect(() => {
  const fetchRedCounts = async () => {
    try {
      const res = await fetch(
        "http://192.168.0.24:4002/api/mk1_red_count"
      );
      const data = await res.json();
      setRedCounts(data);
    } catch (err) {
      console.error("Red count error", err);
    }
  };

  fetchRedCounts(); 

  const interval = setInterval(() => {
    fetchRedCounts();
  }, 1000);

  return () => clearInterval(interval); 
}, []);


  interface YellowCountData {
  [key: string]: number;
}

const [yellowCounts, setYellowCounts] = useState<YellowCountData>({});

useEffect(() => {
  const fetchYellowCounts = async () => {
    try {
      const res = await fetch(
        "http://192.168.0.24:4002/api/mk1_yellow_count"
      );
      const data = await res.json();
      setYellowCounts(data);
    } catch (err) {
      console.error("Yellow count error", err);
    }
  };

  fetchYellowCounts(); 

  const interval = setInterval(() => {
    fetchYellowCounts();
  }, 1000); 

  return () => clearInterval(interval);
}, []);


useEffect(() => {
  const setBgColor = (id: string, value: number | string, color: string) => {
    const td = document.getElementById(id);
    if (!td) return;

    const numericValue = Number(value);
    // console.log(`ID: ${id}, value: "${value}", numericValue: ${numericValue}`);

    if (numericValue > 0) {
      td.style.backgroundColor = color;

      if (color === "yellow") {
        td.style.color = "black";
      } else {
        td.style.color = "white"; 
      }
    } else {
      td.style.backgroundColor = "transparent";
      td.style.color = "white";
    }
  };

  Object.keys(redCounts).forEach((key, i) => {
    const row = 3 + Math.floor(i / 10);
    const col = (i % 10) * 2 + 1;
    const tdId = `${row}_4_${col}`;
    setBgColor(tdId, redCounts[key], "red");
  });

  Object.keys(yellowCounts).forEach((key, i) => {
    const row = 3 + Math.floor(i / 10);
    const col = (i % 10) * 2 + 2;
    const tdId = `${row}_4_${col}`;
    setBgColor(tdId, yellowCounts[key], "yellow");
  });
}, [redCounts, yellowCounts]);

useEffect(() => {
  if (!data) return;

}, [data]);

        


  return (

    <div className="page-container">
    
    <>
   {loginOverlayVisible && (
  <div className="overlay">
    <div className="login-overlay-content">
      <h2 className="login-title">LOGIN</h2>

      <input
        className={`login-input ${overlayUserError ? "error-input" : ""}`}
        type="text"
        placeholder="USERNAME"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        className={`login-input ${overlayPassError ? "error-input" : ""}`}
        type="password"
        placeholder="PASSWORD"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {overlayErrorMsg && (
        <div className="login-error-text">{overlayErrorMsg}</div>
      )}

      <button className="login-button" onClick={handleOverlayLogin}>
        LOGIN
      </button>

      <button
        className="login-cancel"
        onClick={() => setLoginOverlayVisible(false)}
      >
        CANCEL
      </button>
    </div>
  </div>
)}


   {overlayVisible && (
  <div className="overlay">
    <div className="overlay-content modern-modal">
      <h2 className="modal-title">UPDATE STATUS</h2>

      <div className="input-section">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={selectMC}
            onChange={() => setSelectMC(prev => !prev)}
          />
          <span>M/C</span>
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={selectC}
            onChange={() => setSelectC(prev => !prev)}
          />
          <span>C</span>
        </label>
      </div>

      <div className="modal-actions">
       <button
  className="btn ok-btn"
  onClick={async () => {
    if (!currentCellId) return;

    const dbTarget = dbBoxMapping[currentCellId];

    console.log("Cell:", currentCellId);
    console.log("DB target:", dbTarget);
    console.log("Values:", {
      mc: selectMC ? 1 : 0,
      c: selectC ? 1 : 0,
    });

    if (dbTarget) {
      await fetch("http://192.168.0.24:4002/api/update-machine-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          boxM: dbTarget.mc,
          boxC: dbTarget.c,
          mcValue: selectMC ? 1 : 0,
          cValue: selectC ? 1 : 0,
        }),
      });

      fetchBoxes();
    }

    setOverlayVisible(false);
  }}
>
  OK
</button>
        <button
          className="btn cancel-btn"
          onClick={() => setOverlayVisible(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

      <div>
        {/* <header>
  <img
    src={menu}
    alt="menu"
    width="80"
    height="100"
    id="mk1_menu"
    onMouseEnter={() => setShowMenu(true)}
    onMouseLeave={() => setShowMenu(false)}
  />
  <span id="mk1">MK1</span>
  <div id='mk1_red_yellow_knob'>
  <div className={`triple-toggle ${activeType}`}>
  <div className={`triple-knob ${activeType}`} />

  <span id='red' onClick={() => setActiveType("red")}>RED</span>
  <span id='yellow' onClick={() => setActiveType("yellow")}>YELLOW</span>
</div>
</div>
</header> */}
        <table id='mk1_table_header'>
          <thead><tr><th></th></tr></thead>
          <tbody>
          <tr id='mk1_row1'>
            <td id='mk1_today'>TODAY</td>
            <td id='mk1_present'>PRESENT</td>
            <td id='mk1_actual'>ACTUAL</td>
            <td id='mk1_stop_time'>STOP TIME</td>
            <td id='mk1_OA'>OA</td>
            <td id='mk1_over_time'>OVER TIME</td>
            <td id='mk1_np'>NP</td>
            <td id='mk1_np_data'>{data?.mk1_np_data ?? 0}</td>
          </tr>
          <tr id='mk1_row2'>
          <td id="mk1_today_data">{data?.mk1_today_data ?? 0}</td>
          <td id="mk1_present_data">{data?.mk1_present_data ?? 0}</td>
          <td id="mk1_actual_data">{data?.mk1_actual_data ?? 0}</td>
          <td id="mk1_stop_time_data">
  {data?.mk1_stop_time_data && data?.mk1_stop_time_minutes_data
    ? `${data.mk1_stop_time_data}:${data.mk1_stop_time_minutes_data}`
    : "0:00"}
</td>
          <td id="mk1_OA_data">
  {data?.mk1_OA_data
    ? (Number(data.mk1_OA_data) / 10).toFixed(1)
    : ""}
</td>

          <td id="mk1_over_time_data">{data?.mk1_over_time_data ?? 0}</td>
          <td>PF</td>
          <td id="mk1_pf_data">{data?.mk1_pf_data ?? 0}</td>
        </tr>
        </tbody>
        </table>

<table id="mk1_table_body" style={{ width: "100%" }}>
   <thead><tr><th></th></tr></thead>
  <tbody>
    <tr id="mk1_header_row">
        <td
          id="main1"
          colSpan={40} 
          {...getCellProps(boxes.box53_color?.toString())}
          style={{
            backgroundColor: getBackgroundColor(boxes.box53_color?.toString()),
            color: getTextColor(getBackgroundColor(boxes.box53_color?.toString()))}}
        > <img
    src={menu}
    alt="menu"
    id="mk1_menu"
    style={{
      position: "absolute",
      zIndex: 20,
    }}
    onMouseEnter={() => setShowMenu(true)}
    onMouseLeave={() => setShowMenu(false)}
  />

          {boxes.box53_name}
          <div
    id="mk1_red_yellow_knob"
   
  >
    <div className={`triple-toggle ${activeType}`}>
      <div className={`triple-knob ${activeType}`} />
      <span id="red" role="presentation"
  tabIndex={-1} onClick={() => setActiveType("red")}>RED</span>
      <span id="yellow" role="presentation"
  tabIndex={-1} onClick={() => setActiveType("yellow")}>YELLOW</span>
    </div>
  </div>
        </td>
      </tr>

    <tr id='mk1_row3_1'>
  <td colSpan={2} id='3_1_1'>{mcboxes?.BOX1_M === 1 ? "M/C" : ""}</td>
  <td colSpan={2} id='3_1_2'>{mcboxes?.BOX1_C === 1 ? "C" : ""}</td>
  <td colSpan={2} id='3_1_3'>{mcboxes?.BOX2_M === 1 ? "M/C" : ""}</td>
  <td colSpan={2} id='3_1_4'>{mcboxes?.BOX2_C === 1 ? "C" : ""}</td>
  <td colSpan={2} id='3_1_5'>{mcboxes?.BOX3_M === 1 ? "M/C" : ""}</td>
  <td colSpan={2} id='3_1_6'>{mcboxes?.BOX3_C === 1 ? "C" : ""}</td>
  <td colSpan={2} id='3_1_7'>{mcboxes?.BOX4_M === 1 ? "M/C" : ""}</td>
  <td colSpan={2} id='3_1_8'>{mcboxes?.BOX4_C === 1 ? "C" : ""}</td>
  <td colSpan={2} id='3_1_9'>{mcboxes?.BOX5_M === 1 ? "M/C" : ""}</td>
  <td colSpan={2} id='3_1_10'>{mcboxes?.BOX5_C === 1 ? "C" : ""}</td>
  <td colSpan={2} id='3_1_11'>{mcboxes?.BOX6_M === 1 ? "M/C" : ""}</td>
  <td colSpan={2} id='3_1_12'>{mcboxes?.BOX6_C === 1 ? "C" : ""}</td>
  <td colSpan={2} id='3_1_13'>{mcboxes?.BOX7_M === 1 ? "M/C" : ""}</td>
  <td colSpan={2} id='3_1_14'>{mcboxes?.BOX7_C === 1 ? "C" : ""}</td>
  <td colSpan={2} id='3_1_15'>{mcboxes?.BOX8_M === 1 ? "M/C" : ""}</td>
  <td colSpan={2} id='3_1_16'>{mcboxes?.BOX8_C === 1 ? "C" : ""}</td>
  <td colSpan={2} id='3_1_17'>{mcboxes?.BOX9_M === 1 ? "M/C" : ""}</td>
  <td colSpan={2} id='3_1_18'>{mcboxes?.BOX9_C === 1 ? "C" : ""}</td>
  <td colSpan={2} id='3_1_19'>{mcboxes?.BOX10_M === 1 ? "M/C" : ""}</td>
  <td colSpan={2} id='3_1_20'>{mcboxes?.BOX10_C === 1 ? "C" : ""}</td>
</tr>

  <tr id='mk1_row3_2'>
  <td colSpan={4} id="3_2_1"  {...getCellProps(boxes.box1_color?.toString())} style={{
    backgroundColor: getBackgroundColor(boxes.box1_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box1_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("3_2_1");

    setSelectMC(mcboxes.BOX1_M === 1);
    setSelectC(mcboxes.BOX1_C === 1);

    setLoginOverlayVisible(true);
  }}>
  {boxes.box1_name || ""}
  </td>
  <td colSpan={4} id="3_2_2"  {...getCellProps(boxes.box2_color?.toString())} style={{
    backgroundColor: getBackgroundColor(boxes.box2_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box2_color?.toString())),
  }}>
  {boxes.box2_name || ""}
  </td>
  <td colSpan={4} id='3_2_3'  {...getCellProps(boxes.box3_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box3_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box3_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("3_2_3");


    setSelectMC(mcboxes.BOX2_M === 1);
    setSelectC(mcboxes.BOX2_C === 1);

    setLoginOverlayVisible(true);
  }}>
    {boxes.box3_name || ""}
  </td>
  <td colSpan={4} id='3_2_4'  {...getCellProps(boxes.box4_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box4_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box4_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("3_2_4");


    setSelectMC(mcboxes.BOX3_M === 1);
    setSelectC(mcboxes.BOX3_C === 1);

    setLoginOverlayVisible(true);
  }}>
    {boxes.box4_name || ""}
  </td>
  <td colSpan={4} id='3_2_5'  {...getCellProps(boxes.box5_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box5_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box5_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("3_2_5");

    setSelectMC(mcboxes.BOX4_M === 1);
    setSelectC(mcboxes.BOX4_C === 1);

    setLoginOverlayVisible(true);
  }}>
    {boxes.box5_name || ""}
  </td>
  <td colSpan={4} id='3_2_6'  {...getCellProps(boxes.box6_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box6_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box6_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("3_2_6");

    setSelectMC(mcboxes.BOX5_M === 1);
    setSelectC(mcboxes.BOX5_C === 1);

    setLoginOverlayVisible(true);
  }}>
    {boxes.box6_name || ""}
  </td>
  <td colSpan={4} id='3_2_7'  {...getCellProps(boxes.box7_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box7_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box7_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("3_2_7");

    setSelectMC(mcboxes.BOX6_M === 1);
    setSelectC(mcboxes.BOX6_C === 1);

    setLoginOverlayVisible(true);
  }}>
    {boxes.box7_name || ""}
  </td>
  <td colSpan={4} id='3_2_8'  {...getCellProps(boxes.box8_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box8_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box8_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("3_2_8");

    setSelectMC(mcboxes.BOX7_M === 1);
    setSelectC(mcboxes.BOX7_C === 1);

    setLoginOverlayVisible(true);
  }}>
    {boxes.box8_name || ""}
  </td>
  <td colSpan={4} id='3_2_9'  {...getCellProps(boxes.box9_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box9_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box9_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("3_2_9");

    setSelectMC(mcboxes.BOX8_M === 1);
    setSelectC(mcboxes.BOX8_C === 1);

    setLoginOverlayVisible(true);
  }}>
    {boxes.box9_name || ""}
  </td>
  <td colSpan={4} id='3_2_10'  {...getCellProps(boxes.box10_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box10_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box10_color?.toString())),
  }}onClick={() => {
    setCurrentCellId("3_2_10");

    setSelectMC(mcboxes.BOX9_M === 1);
    setSelectC(mcboxes.BOX9_C === 1);

    setLoginOverlayVisible(true);
  }}>
    {boxes.box10_name || ""}
  </td>
</tr>

      <tr id="mk1_row3_3">
        <td colSpan={4} id="3_3_1"></td>
        <td colSpan={4} id="3_3_2"></td>
        <td colSpan={4} id="3_3_3"></td>
        <td colSpan={4} id="3_3_4"></td>
        <td colSpan={4} id="3_3_5"></td>
        <td colSpan={4} id="3_3_6"></td>
        <td colSpan={4} id="3_3_7"></td>
        <td colSpan={4} id="3_3_8"></td>
        <td colSpan={4} id="3_3_9"></td>
        <td colSpan={4} id="3_3_10"></td>
      </tr>
          <tr id='mk1_row3_4'>
            <td colSpan={2} id='3_4_1'>{redCounts.box1_red_count || ""}</td>
            <td colSpan={2} id='3_4_2'>{yellowCounts.box1_yellow_count || ""}</td>
            <td colSpan={2} id='3_4_3'>{redCounts.box2_red_count || ""}</td>
            <td colSpan={2} id='3_4_4'>{yellowCounts.box2_yellow_count || ""}</td>
            <td colSpan={2} id='3_4_5'>{redCounts.box3_red_count || ""}</td>
            <td colSpan={2} id='3_4_6'>{yellowCounts.box3_yellow_count || ""}</td>
            <td colSpan={2} id='3_4_7'>{redCounts.box4_red_count || ""}</td>
            <td colSpan={2} id='3_4_8'>{yellowCounts.box4_yellow_count || ""}</td>
            <td colSpan={2} id='3_4_9'>{redCounts.box5_red_count || ""}</td>
            <td colSpan={2} id='3_4_10'>{yellowCounts.box5_yellow_count || ""}</td>
            <td colSpan={2} id='3_4_11'>{redCounts.box6_red_count || ""}</td>
            <td colSpan={2} id='3_4_12'>{yellowCounts.box6_yellow_count || ""}</td>
            <td colSpan={2} id='3_4_13'>{redCounts.box7_red_count || ""}</td>
            <td colSpan={2} id='3_4_14'>{yellowCounts.box7_yellow_count || ""}</td>
            <td colSpan={2} id='3_4_15'>{redCounts.box8_red_count || ""}</td>
            <td colSpan={2} id='3_4_16'>{yellowCounts.box8_yellow_count || ""}</td>
            <td colSpan={2} id='3_4_17'>{redCounts.box9_red_count || ""}</td>
            <td colSpan={2} id='3_4_18'>{yellowCounts.box9_yellow_count || ""}</td>
            <td colSpan={2} id='3_4_19'>{redCounts.box10_red_count || ""}</td>
            <td colSpan={2} id='3_4_20'>{yellowCounts.box10_yellow_count || ""}</td>
          </tr>
        <tr id='mk1_row4_1'>
  <td colSpan={2} id='4_1_1'>{mcboxes?.BOX11_M === 1 ? "M/C" : ""}</td>
  <td colSpan={2} id='4_1_2'>{mcboxes?.BOX11_C === 1 ? "C" : ""}</td>
  <td colSpan={2} id='4_1_3'>{mcboxes?.BOX12_M === 1 ? "M/C" : ""}</td>
  <td colSpan={2} id='4_1_4'>{mcboxes?.BOX12_C === 1 ? "C" : ""}</td>
  <td colSpan={2} id='4_1_5'>{mcboxes?.BOX13_M === 1 ? "M/C" : ""}</td>
  <td colSpan={2} id='4_1_6'>{mcboxes?.BOX13_C === 1 ? "C" : ""}</td>
  <td colSpan={2} id='4_1_7'>{mcboxes?.BOX14_M === 1 ? "M/C" : ""}</td>
  <td colSpan={2} id='4_1_8'>{mcboxes?.BOX14_C === 1 ? "C" : ""}</td>
  <td colSpan={2} id='4_1_9'>{mcboxes?.BOX15_M === 1 ? "M/C" : ""}</td>
  <td colSpan={2} id='4_1_10'>{mcboxes?.BOX15_C === 1 ? "C" : ""}</td>
  <td colSpan={2} id='4_1_11'>{mcboxes?.BOX16_M === 1 ? "M/C" : ""}</td>
  <td colSpan={2} id='4_1_12'>{mcboxes?.BOX16_C === 1 ? "C" : ""}</td>
  <td colSpan={2} id='4_1_13'>{mcboxes?.BOX17_M === 1 ? "M/C" : ""}</td>
  <td colSpan={2} id='4_1_14'>{mcboxes?.BOX17_C === 1 ? "C" : ""}</td>
  <td colSpan={2} id='4_1_15'>{mcboxes?.BOX18_M === 1 ? "M/C" : ""}</td>
  <td colSpan={2} id='4_1_16'>{mcboxes?.BOX18_C === 1 ? "C" : ""}</td>
  <td colSpan={2} id='4_1_17'>{mcboxes?.BOX19_M === 1 ? "M/C" : ""}</td>
  <td colSpan={2} id='4_1_18'>{mcboxes?.BOX19_C === 1 ? "C" : ""}</td>
  <td colSpan={2} id='4_1_19'>{mcboxes?.BOX20_M === 1 ? "M/C" : ""}</td>
  <td colSpan={2} id='4_1_20'>{mcboxes?.BOX20_C === 1 ? "C" : ""}</td>
</tr>



          <tr id='mk1_row4_2'>
          <td colSpan={4} id='4_2_1'  {...getCellProps(boxes.box11_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box11_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box11_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("4_2_1");

    setSelectMC(mcboxes.BOX10_M === 1);
    setSelectC(mcboxes.BOX10_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box11_name}</td>
          <td colSpan={4} id='4_2_2'  {...getCellProps(boxes.box12_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box12_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box12_color?.toString())),
  }}onClick={() => {
    setCurrentCellId("4_2_2");

    setSelectMC(mcboxes.BOX11_M === 1);
    setSelectC(mcboxes.BOX11_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box12_name}</td>
          <td colSpan={4} id='4_2_3' {...getCellProps(boxes.box13_color?.toString())}   style={{
    backgroundColor: getBackgroundColor(boxes.box13_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box13_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("4_2_3");

    setSelectMC(mcboxes.BOX12_M === 1);
    setSelectC(mcboxes.BOX12_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box13_name}</td>
          <td colSpan={4} id='4_2_4'  {...getCellProps(boxes.box14_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box14_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box14_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("4_2_4");

    setSelectMC(mcboxes.BOX13_M === 1);
    setSelectC(mcboxes.BOX13_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box14_name}</td>
          <td colSpan={4} id='4_2_5'  {...getCellProps(boxes.box15_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box15_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box15_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("4_2_5");

    setSelectMC(mcboxes.BOX14_M === 1);
    setSelectC(mcboxes.BOX14_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box15_name}</td>
          <td colSpan={4} id='4_2_6' {...getCellProps(boxes.box16_color?.toString())}   style={{
    backgroundColor: getBackgroundColor(boxes.box16_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box16_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("4_2_6");

    setSelectMC(mcboxes.BOX15_M === 1);
    setSelectC(mcboxes.BOX15_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box16_name}</td>
          <td colSpan={4} id='4_2_7'  {...getCellProps(boxes.box17_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box17_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box17_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("4_2_7");


    setSelectMC(mcboxes.BOX16_M === 1);
    setSelectC(mcboxes.BOX16_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box17_name}</td>
          <td colSpan={4} id='4_2_8'  {...getCellProps(boxes.box18_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box18_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box18_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("4_2_8");


    setSelectMC(mcboxes.BOX17_M === 1);
    setSelectC(mcboxes.BOX17_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box18_name}</td>
          <td colSpan={4} id='4_2_9'  {...getCellProps(boxes.box19_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box19_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box19_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("4_2_9");

    setSelectMC(mcboxes.BOX18_M === 1);
    setSelectC(mcboxes.BOX18_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box19_name}</td>
          <td colSpan={4} id='4_2_10'  {...getCellProps(boxes.box20_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box20_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box20_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("4_2_10");

    setSelectMC(mcboxes.BOX19_M === 1);
    setSelectC(mcboxes.BOX19_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box20_name}</td>
        </tr>
      
      <tr id="mk1_row4_3">
        <td colSpan={4} id="4_3_1"></td>
        <td colSpan={4} id="4_3_2"></td>
        <td colSpan={4} id="4_3_3"></td>
        <td colSpan={4} id="4_3_4"></td>
        <td colSpan={4} id="4_3_5"></td>
        <td colSpan={4} id="4_3_6"></td>
        <td colSpan={4} id="4_3_7"></td>
        <td colSpan={4} id="4_3_8"></td>
        <td colSpan={4} id="4_3_9"></td>
        <td colSpan={4} id="4_3_10"></td>
      </tr>
          <tr id='mk1_row4_4'>
            <td colSpan={2} id='4_4_1'>{redCounts.box11_red_count || ""}</td>
            <td colSpan={2} id='4_4_2'>{yellowCounts.box11_yellow_count || ""}</td>
            <td colSpan={2} id='4_4_3'>{redCounts.box12_red_count || ""}</td>
            <td colSpan={2} id='4_4_4'>{yellowCounts.box12_yellow_count || ""}</td>
            <td colSpan={2} id='4_4_5'>{redCounts.box13_red_count || ""}</td>
            <td colSpan={2} id='4_4_6'>{yellowCounts.box13_yellow_count || ""}</td>
            <td colSpan={2} id='4_4_7'>{redCounts.box14_red_count || ""}</td>
            <td colSpan={2} id='4_4_8'>{yellowCounts.box14_yellow_count || ""}</td>
            <td colSpan={2} id='4_4_9'>{redCounts.box15_red_count || ""}</td>
            <td colSpan={2} id='4_4_10'>{yellowCounts.box15_yellow_count || ""}</td>
            <td colSpan={2} id='4_4_11'>{redCounts.box16_red_count || ""}</td>
            <td colSpan={2} id='4_4_12'>{yellowCounts.box16_yellow_count || ""}</td>
            <td colSpan={2} id='4_4_13'>{redCounts.box17_red_count || ""}</td>
            <td colSpan={2} id='4_4_14'>{yellowCounts.box17_yellow_count || ""}</td>
            <td colSpan={2} id='4_4_15'>{redCounts.box18_red_count || ""}</td>
            <td colSpan={2} id='4_4_16'>{yellowCounts.box18_yellow_count || ""}</td>
            <td colSpan={2} id='4_4_17'>{redCounts.box19_red_count || ""}</td>
            <td colSpan={2} id='4_4_18'>{yellowCounts.box19_yellow_count || ""}</td>
            <td colSpan={2} id='4_4_19'>{redCounts.box20_red_count || ""}</td>
            <td colSpan={2} id='4_4_20'>{yellowCounts.box20_yellow_count || ""}</td>
          </tr>
          <tr id='mk1_row5_1'>
  <td colSpan={2} id='5_1_1'>{mcboxes?.BOX21_M === 1 ? "M/C" : ""}</td>
  <td colSpan={2} id='5_1_2'>{mcboxes?.BOX21_C === 1 ? "C" : ""}</td>
  <td colSpan={2} id='5_1_3'>{mcboxes?.BOX22_M === 1 ? "M/C" : ""}</td>
  <td colSpan={2} id='5_1_4'>{mcboxes?.BOX22_C === 1 ? "C" : ""}</td>
  <td colSpan={2} id='5_1_5'>{mcboxes?.BOX23_M === 1 ? "M/C" : ""}</td>
  <td colSpan={2} id='5_1_6'>{mcboxes?.BOX23_C === 1 ? "C" : ""}</td>
  <td colSpan={2} id='5_1_7'>{mcboxes?.BOX24_M === 1 ? "M/C" : ""}</td>
  <td colSpan={2} id='5_1_8'>{mcboxes?.BOX24_C === 1 ? "C" : ""}</td>
  <td colSpan={2} id='5_1_9'>{mcboxes?.BOX25_M === 1 ? "M/C" : ""}</td>
  <td colSpan={2} id='5_1_10'>{mcboxes?.BOX25_C === 1 ? "C" : ""}</td>
  <td colSpan={2} id='5_1_11'>{mcboxes?.BOX26_M === 1 ? "M/C" : ""}</td>
  <td colSpan={2} id='5_1_12'>{mcboxes?.BOX26_C === 1 ? "C" : ""}</td>
  <td colSpan={2} id='5_1_13'>{mcboxes?.BOX27_M === 1 ? "M/C" : ""}</td>
  <td colSpan={2} id='5_1_14'>{mcboxes?.BOX27_C === 1 ? "C" : ""}</td>
  <td colSpan={2} id='5_1_15'>{mcboxes?.BOX28_M === 1 ? "M/C" : ""}</td>
  <td colSpan={2} id='5_1_16'>{mcboxes?.BOX28_C === 1 ? "C" : ""}</td>
  <td colSpan={2} id='5_1_17'>{mcboxes?.BOX29_M === 1 ? "M/C" : ""}</td>
  <td colSpan={2} id='5_1_18'>{mcboxes?.BOX29_C === 1 ? "C" : ""}</td>
  <td colSpan={2} id='5_1_19'>{mcboxes?.BOX30_M === 1 ? "M/C" : ""}</td>
  <td colSpan={2} id='5_1_20'>{mcboxes?.BOX30_C === 1 ? "C" : ""}</td>
</tr>
          <tr id='mk1_row5_2'>
          <td colSpan={4} id='5_2_1'  {...getCellProps(boxes.box21_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box21_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box21_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("5_2_1");

    setSelectMC(mcboxes.BOX20_M === 1);
    setSelectC(mcboxes.BOX20_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box21_name}</td>
          <td colSpan={4} id='5_2_2'  {...getCellProps(boxes.box22_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box22_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box22_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("5_2_2");

    setSelectMC(mcboxes.BOX21_M === 1);
    setSelectC(mcboxes.BOX21_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box22_name}</td>
          <td colSpan={4} id='5_2_3'  {...getCellProps(boxes.box23_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box23_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box23_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("5_2_3");

    setSelectMC(mcboxes.BOX22_M === 1);
    setSelectC(mcboxes.BOX22_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box23_name}</td>
          <td colSpan={4} id='5_2_4'  {...getCellProps(boxes.box24_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box24_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box24_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("5_2_4");

    setSelectMC(mcboxes.BOX23_M === 1);
    setSelectC(mcboxes.BOX23_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box24_name}</td>
          <td colSpan={4} id='5_2_5'  {...getCellProps(boxes.box25_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box25_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box25_color?.toString())),
  }}onClick={() => {
    setCurrentCellId("5_2_5");

    setSelectMC(mcboxes.BOX24_M === 1);
    setSelectC(mcboxes.BOX24_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box25_name}</td>
          <td colSpan={4} id='5_2_6'  {...getCellProps(boxes.box26_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box26_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box26_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("5_2_6");

    setSelectMC(mcboxes.BOX25_M === 1);
    setSelectC(mcboxes.BOX25_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box26_name}</td>
          <td colSpan={4} id='5_2_7'  {...getCellProps(boxes.box27_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box27_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box27_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("5_2_7");

    setSelectMC(mcboxes.BOX26_M === 1);
    setSelectC(mcboxes.BOX26_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box27_name}</td>
          <td colSpan={4} id='5_2_8'  {...getCellProps(boxes.box28_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box28_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box28_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("5_2_8");

    setSelectMC(mcboxes.BOX27_M === 1);
    setSelectC(mcboxes.BOX27_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box28_name}</td>
          <td colSpan={4} id='5_2_9'  {...getCellProps(boxes.box29_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box29_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box29_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("5_2_9");

    setSelectMC(mcboxes.BOX28_M === 1);
    setSelectC(mcboxes.BOX28_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box29_name}</td>
          <td colSpan={4} id='5_2_10'  {...getCellProps(boxes.box30_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box30_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box30_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("5_2_10");

    setSelectMC(mcboxes.BOX29_M === 1);
    setSelectC(mcboxes.BOX29_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box30_name}</td>
        </tr>
       
      <tr id="mk1_row5_3">
        <td colSpan={4} id="5_3_1"></td>
        <td colSpan={4} id="5_3_2"></td>
        <td colSpan={4} id="5_3_3"></td>
        <td colSpan={4} id="5_3_4"></td>
        <td colSpan={4} id="5_3_5"></td>
        <td colSpan={4} id="5_3_6"></td>
        <td colSpan={4} id="5_3_7"></td>
        <td colSpan={4} id="5_3_8"></td>
        <td colSpan={4} id="5_3_9"></td>
        <td colSpan={4} id="5_3_10"></td>
      </tr>
          <tr id='mk1_row5_4'>
            <td colSpan={2} id='5_4_1'>{redCounts.box21_red_count || ""}</td>
            <td colSpan={2} id='5_4_2'>{yellowCounts.box21_yellow_count || ""}</td>
            <td colSpan={2} id='5_4_3'>{redCounts.box22_red_count || ""}</td>
            <td colSpan={2} id='5_4_4'>{yellowCounts.box22_yellow_count || ""}</td>
            <td colSpan={2} id='5_4_5'>{redCounts.box23_red_count || ""}</td>
            <td colSpan={2} id='5_4_6'>{yellowCounts.box23_yellow_count || ""}</td>
            <td colSpan={2} id='5_4_7'>{redCounts.box24_red_count || ""}</td>
            <td colSpan={2} id='5_4_8'>{yellowCounts.box24_yellow_count || ""}</td>
            <td colSpan={2} id='5_4_9'>{redCounts.box25_red_count || ""}</td>
            <td colSpan={2} id='5_4_10'>{yellowCounts.box25_yellow_count || ""}</td>
            <td colSpan={2} id='5_4_11'>{redCounts.box26_red_count || ""}</td>
            <td colSpan={2} id='5_4_12'>{yellowCounts.box26_yellow_count || ""}</td>
            <td colSpan={2} id='5_4_13'>{redCounts.box27_red_count || ""}</td>
            <td colSpan={2} id='5_4_14'>{yellowCounts.box27_yellow_count || ""}</td>
            <td colSpan={2} id='5_4_15'>{redCounts.box28_red_count || ""}</td>
            <td colSpan={2} id='5_4_16'>{yellowCounts.box28_yellow_count || ""}</td>
            <td colSpan={2} id='5_4_17'>{redCounts.box29_red_count || ""}</td>
            <td colSpan={2} id='5_4_18'>{yellowCounts.box29_yellow_count || ""}</td>
            <td colSpan={2} id='5_4_19'>{redCounts.box30_red_count || ""}</td>
            <td colSpan={2} id='5_4_20'>{yellowCounts.box30_yellow_count || ""}</td>
          </tr>
          <tr id='mk1_row6_1'>
  <td colSpan={2} id='6_1_1'>{mcboxes?.BOX31_M === 1 ? "M/C" : ""}</td>
  <td colSpan={2} id='6_1_2'>{mcboxes?.BOX31_C === 1 ? "C" : ""}</td>
  <td colSpan={2} id='6_1_3'>{mcboxes?.BOX32_M === 1 ? "M/C" : ""}</td>
  <td colSpan={2} id='6_1_4'>{mcboxes?.BOX32_C === 1 ? "C" : ""}</td>
  <td colSpan={2} id='6_1_5'>{mcboxes?.BOX33_M === 1 ? "M/C" : ""}</td>
  <td colSpan={2} id='6_1_6'>{mcboxes?.BOX33_C === 1 ? "C" : ""}</td>
  <td colSpan={2} id='6_1_7'>{mcboxes?.BOX34_M === 1 ? "M/C" : ""}</td>
  <td colSpan={2} id='6_1_8'>{mcboxes?.BOX34_C === 1 ? "C" : ""}</td>
  <td colSpan={2} id='6_1_9'>{mcboxes?.BOX35_M === 1 ? "M/C" : ""}</td>
  <td colSpan={2} id='6_1_10'>{mcboxes?.BOX35_C === 1 ? "C" : ""}</td>
  <td colSpan={2} id='6_1_11'>{mcboxes?.BOX36_M === 1 ? "M/C" : ""}</td>
  <td colSpan={2} id='6_1_12'>{mcboxes?.BOX36_C === 1 ? "C" : ""}</td>
  <td colSpan={2} id='6_1_13'>{mcboxes?.BOX37_M === 1 ? "M/C" : ""}</td>
  <td colSpan={2} id='6_1_14'>{mcboxes?.BOX37_C === 1 ? "C" : ""}</td>
  <td colSpan={2} id='6_1_15'>{mcboxes?.BOX38_M === 1 ? "M/C" : ""}</td>
  <td colSpan={2} id='6_1_16'>{mcboxes?.BOX38_C === 1 ? "C" : ""}</td>
  <td colSpan={2} id='6_1_17'>{mcboxes?.BOX39_M === 1 ? "M/C" : ""}</td>
  <td colSpan={2} id='6_1_18'>{mcboxes?.BOX39_C === 1 ? "C" : ""}</td>
  <td colSpan={2} id='6_1_19'>{mcboxes?.BOX40_M === 1 ? "M/C" : ""}</td>
  <td colSpan={2} id='6_1_20'>{mcboxes?.BOX40_C === 1 ? "C" : ""}</td>
</tr>
          <tr id='mk1_row6_2'>
          <td colSpan={4} id='6_2_1' {...getCellProps(boxes.box31_color?.toString())}   style={{
    backgroundColor: getBackgroundColor(boxes.box31_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box31_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("6_2_1");

    setSelectMC(mcboxes.BOX30_M === 1);
    setSelectC(mcboxes.BOX30_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box31_name}</td>
          <td colSpan={4} id='6_2_2'  {...getCellProps(boxes.box32_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box32_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box32_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("6_2_2");

    setSelectMC(mcboxes.BOX31_M === 1);
    setSelectC(mcboxes.BOX31_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box32_name}</td>
          <td colSpan={4} id='6_2_3'  {...getCellProps(boxes.box33_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box33_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box33_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("6_2_3");

    setSelectMC(mcboxes.BOX32_M === 1);
    setSelectC(mcboxes.BOX32_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box33_name}</td>
          <td colSpan={4} id='6_2_4'  {...getCellProps(boxes.box34_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box34_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box34_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("6_2_4");

    setSelectMC(mcboxes.BOX33_M === 1);
    setSelectC(mcboxes.BOX33_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box34_name}</td>
          <td colSpan={4} id='6_2_5'  {...getCellProps(boxes.box35_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box35_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box35_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("6_2_5");

    setSelectMC(mcboxes.BOX34_M === 1);
    setSelectC(mcboxes.BOX34_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box35_name}</td>
          <td colSpan={4} id='6_2_6'  {...getCellProps(boxes.box36_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box36_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box36_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("6_2_6");

    setSelectMC(mcboxes.BOX35_M === 1);
    setSelectC(mcboxes.BOX35_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box36_name}</td>
          <td colSpan={4} id='6_2_7'  {...getCellProps(boxes.box37_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box37_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box37_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("6_2_7");

    setSelectMC(mcboxes.BOX36_M === 1);
    setSelectC(mcboxes.BOX36_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box37_name}</td>
          <td colSpan={4} id='6_2_8'  {...getCellProps(boxes.box38_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box38_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box38_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("6_2_8");

    setSelectMC(mcboxes.BOX37_M === 1);
    setSelectC(mcboxes.BOX37_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box38_name}</td>
          <td
  colSpan={4}
  id="6_2_9"
  {...getCellProps(boxes.box39_color?.toString())}
  style={{
    backgroundColor: getBackgroundColor(boxes.box39_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box39_color?.toString())),
    whiteSpace: "pre-line", // ✅ ensures \n is rendered as a new line
  }}
>
  {typeof boxes.box39_name === "string"
    ? boxes.box39_name.startsWith("MK1")
      ? boxes.box39_name.replace("MK1", "MK1\n")
      : boxes.box39_name
    : ""}
</td>
          <td colSpan={4} id='6_2_10'  {...getCellProps(boxes.box40_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box40_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box40_color?.toString())),
  }}>{boxes.box40_name}</td>
        </tr>
        
      <tr id="mk1_row6_3">
        <td colSpan={4} id="6_3_1"></td>
        <td colSpan={4} id="6_3_2"></td>
        <td colSpan={4} id="6_3_3"></td>
        <td colSpan={4} id="6_3_4"></td>
        <td colSpan={4} id="6_3_5"></td>
        <td colSpan={4} id="6_3_6"></td>
        <td colSpan={4} id="6_3_7"></td>
        <td colSpan={4} id="6_3_8"></td>
        <td colSpan={4} id="6_3_9"></td>
        <td colSpan={4} id="6_3_10"></td>
      </tr>
          <tr id='mk1_row6_4'>
            <td colSpan={2} id='6_4_1'>{redCounts.box31_red_count || ""}</td>
            <td colSpan={2} id='6_4_2'>{yellowCounts.box31_yellow_count || ""}</td>
            <td colSpan={2} id='6_4_3'>{redCounts.box32_red_count || ""}</td>
            <td colSpan={2} id='6_4_4'>{yellowCounts.box32_yellow_count || ""}</td>
            <td colSpan={2} id='6_4_5'>{redCounts.box33_red_count || ""}</td>
            <td colSpan={2} id='6_4_6'>{yellowCounts.box33_yellow_count || ""}</td>
            <td colSpan={2} id='6_4_7'>{redCounts.box34_red_count || ""}</td>
            <td colSpan={2} id='6_4_8'>{yellowCounts.box34_yellow_count || ""}</td>
            <td colSpan={2} id='6_4_9'>{redCounts.box35_red_count || ""}</td>
            <td colSpan={2} id='6_4_10'>{yellowCounts.box35_yellow_count || ""}</td>
            <td colSpan={2} id='6_4_11'>{redCounts.box36_red_count || ""}</td>
            <td colSpan={2} id='6_4_12'>{yellowCounts.box36_yellow_count || ""}</td>
            <td colSpan={2} id='6_4_13'>{redCounts.box37_red_count || ""}</td>
            <td colSpan={2} id='6_4_14'>{yellowCounts.box37_yellow_count || ""}</td>
            <td colSpan={2} id='6_4_15'>{redCounts.box38_red_count || ""}</td>
            <td colSpan={2} id='6_4_16'>{yellowCounts.box38_yellow_count || ""}</td>
            <td colSpan={2} id='6_4_17'>{redCounts.box39_red_count || ""}</td>
            <td colSpan={2} id='6_4_18'>{yellowCounts.box39_yellow_count || ""}</td>
            <td colSpan={2} id='6_4_19'>{redCounts.box40_red_count || ""}</td>
            <td colSpan={2} id='6_4_20'>{yellowCounts.box40_yellow_count || ""}</td>
          </tr>
          <tr id='mk1_row7_1'>
            <td colSpan={4} rowSpan={3} id='7_1_1' {...getCellProps(boxes.box41_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box41_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box41_color?.toString())),
  }}>{boxes.box41_name}</td>
            {/* <td colSpan={4} id='7_1_2' style={{fontSize:"30px"}}>{formatCumDuration(cum.box44_cumduration)}</td> */}
            <td colSpan={4} id='7_1_2' rowSpan={2} {...getCellProps(boxes.box42_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box42_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box42_color?.toString())),
  }}>{boxes.box42_name}</td>
            <td colSpan={4} rowSpan={2} id='7_1_3'  {...getCellProps(boxes.box43_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box43_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box43_color?.toString())),
  }}>{boxes.box43_name}</td>
            <td
  colSpan={4}
  rowSpan={3}
  id="7_1_4"
  {...getCellProps(boxes.box44_color?.toString())}
  style={{
    backgroundColor: getBackgroundColor(boxes.box44_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box44_color?.toString())),
    whiteSpace: "pre-line", // ✅ ensures \n is rendered as a new line
  }}
>
  {typeof boxes.box44_name === "string"
    ? boxes.box44_name.startsWith("MK1")
      ? boxes.box44_name.replace("MK1", "MK1\n")
      : boxes.box44_name
    : ""}
</td>
            <td
  colSpan={4}
  rowSpan={3}
  id="7_1_5"
  {...getCellProps(boxes.box45_color?.toString())}
  style={{
    backgroundColor: getBackgroundColor(boxes.box45_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box45_color?.toString())),
    whiteSpace: "pre-line", // ✅ allows \n to render as a new line
  }}
>
  {typeof boxes.box45_name === "string"
    ? boxes.box45_name.startsWith("MK2")
      ? boxes.box45_name.replace("MK2", "MK2\n")
      : boxes.box45_name
    : ""}
</td>
            <td colSpan={4} rowSpan={3} id='7_1_6'  {...getCellProps(boxes.box46_color?.toString())} style={{
    backgroundColor: getBackgroundColor(boxes.box46_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box46_color?.toString())),
  }}>{boxes.box46_name}</td>
            <td colSpan={4} rowSpan={2} id='7_1_7' {...getCellProps(boxes.box47_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box47_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box47_color?.toString())),
  }}>{boxes.box47_name}</td>
           <td
  colSpan={4}
  rowSpan={3}
  id="7_1_8"
  {...getCellProps(boxes.box49_color?.toString())}
  style={{
    backgroundColor: getBackgroundColor(boxes.box49_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box49_color?.toString())),
    whiteSpace: "pre-line", // ✅ ensures \n is rendered as a new line
  }}
>
  {typeof boxes.box49_name === "string"
    ? boxes.box49_name.startsWith("MK1")
      ? boxes.box49_name.replace("MK1", "MK1\n")
      : boxes.box49_name
    : ""}
</td>
            <td colSpan={4} rowSpan={2} id='7_1_9' {...getCellProps(boxes.box50_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box50_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box50_color?.toString())),
  }}>{boxes.box50_name}</td>
          <td
  colSpan={4}
  rowSpan={2}
  id="7_1_10"
  {...getCellProps(boxes.box52_color?.toString())}
  style={{
    backgroundColor: getBackgroundColor(boxes.box52_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box52_color?.toString())),
    whiteSpace: "pre-line", // ensures \n is rendered as a new line
  }}
>
  {typeof boxes.box52_name === "string"
    ? boxes.box52_name.startsWith("MK1")
      ? boxes.box52_name.replace("MK1", "MK1\n")
      : boxes.box52_name
    : ""}
</td>
          </tr>
          <tr id='mk1_row7_2'>
            {/* <td colSpan={4} id='7_2_1' {...getCellProps(boxes.box42_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box42_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box42_color?.toString())),
  }}>{boxes.box42_name}</td> */}
          </tr>
          <tr id='mk1_row7_3'>
          {/* <td colSpan={4} id="7_3_1">{formatCumDuration(cum.box41_cumduration)}</td>
          <td colSpan={4} id="7_3_2">{formatCumDuration(cum.box42_cumduration)}</td> */}
          <td colSpan={4} id="7_3_1"></td>
          <td colSpan={4} id="7_3_2"></td>
          <td colSpan={4} id='7_3_3'  {...getCellProps(boxes.box48_color?.toString())} style={{
    backgroundColor: getBackgroundColor(boxes.box48_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box48_color?.toString())),fontSize: "40px"
  }}>{boxes.box48_name}</td>
            <td colSpan={4} id='7_3_4'  {...getCellProps(boxes.box51_color?.toString())} style={{
    backgroundColor: getBackgroundColor(boxes.box51_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box51_color?.toString())),fontSize: "40px"
  }}>{boxes.box51_name}</td>
            {/* <td colSpan={4} id="7_3_5">{formatCumDuration(cum.box43_cumduration)}</td> */}
            <td colSpan={4} id="7_3_5"></td>
          </tr>
       </tbody>
        </table>
              {showMenu && (
  <Menu
    setShowMenu={setShowMenu}
    toggleTheme={toggleTheme}
    theme={theme}
  />
)}

      </div>
    </>
    </div>
  )
}

export default App;