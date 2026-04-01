import '../ET/index.css';

import {
  useEffect,
  useState,
} from 'react';

import menu from '../assets/menu.gif';
import { useTheme } from '../hooks/useTheme';
import Menu from '../MK1/menu';

interface etData {
      et_today_data: number,
      et_present_data: number,
      et_actual_data: number,
      et_over_time_data: number,
      et_stop_time_data: string,
      et_stop_time_minutes_data: string,
      et_main3_stop_time_data: number,
      et_main3_stop_time_minutes_data: string,
      et_main3_actual_data: number,
      et_oa_data: string
}

 interface BoxData {
  [key: string]: string | number;
}


function App() {
    const [showMenu, setShowMenu] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const [boxes, setBoxes] = useState<BoxData>({});
    const [mcboxes, setmcBoxes] = useState<BoxData>({});
    const [loginOverlayVisible, setLoginOverlayVisible] = useState(false);
    const [overlayUserError, setOverlayUserError] = useState(false);
    const [overlayPassError, setOverlayPassError] = useState(false);
    const [overlayErrorMsg, setOverlayErrorMsg] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [selectMC, setSelectMC] = useState(false);
    const [selectC, setSelectC] = useState(false);
    const [currentCellId, setCurrentCellId] = useState<string | null>(null);
    const [overlayVisible, setOverlayVisible] = useState(false);

  
         const [data, setData] = useState<etData | null>(null);
         
         useEffect(() => {
           const fetchData = () => {
             fetch("http://192.168.0.24:4002/api/et")
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
    const response = await fetch("http://192.168.0.24:4002/api/et_logincredentials", {
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
   const tdIds = [ 'et_3_1_1','et_3_1_3','et_3_1_5','et_3_1_7','et_3_1_9','et_3_1_11','et_3_1_13','et_3_1_15','et_3_1_17', 
    'et_6_1_1','et_6_1_3','et_6_1_5','et_6_1_7','et_6_1_9','et_6_1_11','et_6_1_13','et_6_1_15','et_6_1_17',  
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
             }, [mcboxes]);
             
useEffect(() => { 
  const tdIds = ['et_3_1_2','et_3_1_4','et_3_1_6','et_3_1_8','et_3_1_10','et_3_1_12','et_3_1_14','et_3_1_16','et_3_1_18',
'et_6_1_2','et_6_1_4','et_6_1_6','et_6_1_8','et_6_1_10','et_6_1_12','et_6_1_14','et_6_1_16','et_6_1_18',  
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
                 }, [mcboxes]);


const dbBoxMapping: Record<string, { mc: string; c: string }> = {
  "et_4_1": { mc: "BOX1_M", c: "BOX1_C" },
  "et_4_2": { mc: "BOX2_M", c: "BOX2_C" },
  "et_4_3": { mc: "BOX3_M", c: "BOX3_C" },
  "et_4_4": { mc: "BOX4_M", c: "BOX4_C" },
  "et_4_5": { mc: "BOX5_M", c: "BOX5_C" },
  "et_4_6": { mc: "BOX6_M", c: "BOX6_C" },
  "et_4_7": { mc: "BOX7_M", c: "BOX7_C" },
  "et_4_8": { mc: "BOX8_M", c: "BOX8_C" },
  "et_4_9": { mc: "BOX9_M", c: "BOX9_C" },
  "et_6_1": { mc: "BOX10_M", c: "BOX10_C" },
  "et_6_2": { mc: "BOX11_M", c: "BOX11_C" },
  "et_6_3": { mc: "BOX12_M", c: "BOX12_C" },
  "et_6_4": { mc: "BOX13_M", c: "BOX13_C" },
  "et_6_5": { mc: "BOX14_M", c: "BOX14_C" },
  "et_6_6": { mc: "BOX15_M", c: "BOX15_C" },
  "et_6_7": { mc: "BOX16_M", c: "BOX16_C" },
  "et_6_8": { mc: "BOX17_M", c: "BOX17_C" },
  "et_6_9": { mc: "BOX18_M", c: "BOX18_C" },
};

      
//  useEffect(() => {
//   const fetchBoxes = async () => {
//     try {
//       const res = await fetch("http://192.168.0.24:4002/api/et_boxes");
//       const data = await res.json();
//       setBoxes(prev => ({
//   ...prev,
//   ...data
// }));

//     } catch (err) {
//       console.error("et_boxes error:", err);
//     }
//   };

//   fetchBoxes();

//   const interval = setInterval(() => {
//     fetchBoxes();
//   }, 1000);

//   return () => clearInterval(interval);
// }, []);


  useEffect(() => {
    const fetchBoxes = () => {
      fetch("http://192.168.0.24:4002/api/et_boxes_colors")
        .then(res => res.json())
        .then(data => {
  setBoxes(prev => {
    if (JSON.stringify(prev) === JSON.stringify(data)) {
      return prev;
    }
    return data;
  });
})

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


interface YellowCounts {
  [key: string]: number | null;
}

const [yellowCounts, setYellowCounts] = useState<YellowCounts | null>(null);

const isYellowActive = (value?: number | null): boolean => {
  return value !== undefined && value !== null && value > 0;
};


useEffect(() => {
  const fetchYellowCounts = async () => {
    try {
      const res = await fetch("http://192.168.0.24:4002/api/et_yellow_count");
      const data = await res.json();
      setYellowCounts(data);
    } catch (err) {
      console.error("et_yellow_count error:", err);
    }
  };

  fetchYellowCounts();
  const interval = setInterval(fetchYellowCounts, 1000);
  return () => clearInterval(interval);
}, []);


type YellowTimes = {
  [key: string]: number | null;
};

 const [yellowTimes, setYellowTimes] = useState<YellowTimes | null>(null);

  const secondsToMMSS = (seconds?: number | null) => {
    const totalSeconds = seconds ?? 0;
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const fetchYellowTimes = async () => {
      try {
        const res = await fetch("http://192.168.0.24:4002/api/et_yellow_time");
        const data = await res.json();
        setYellowTimes(data);
      } catch (err) {
        console.error("et_yellow_time error:", err);
      }
    };

    fetchYellowTimes();
    const interval = setInterval(fetchYellowTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!yellowTimes) return;

    for (let i = 1; i <= 9; i++) {
      const td = document.getElementById(`et_4_1_${i}`);
      if (td) {
        const valueInSeconds = yellowTimes[`box${i}_yellow_time`] ?? 0;
        td.textContent = secondsToMMSS(valueInSeconds);
      }
    }

    for (let i = 10; i <= 18; i++) {
      const td = document.getElementById(`et_6_2_${i - 9}`);
      if (td) {
        const valueInSeconds = yellowTimes[`box${i}_yellow_time`] ?? 0;
        td.textContent = secondsToMMSS(valueInSeconds);
      }
    }
  }, [yellowTimes]);

const fetchMcBoxes = async () => {
  try {
    const res = await fetch("http://192.168.0.24:4002/api/et_mc");
    const data = await res.json();

    const parsedData: BoxData = {};
    Object.keys(data).forEach(key => {
      parsedData[key] = Number(data[key]);
    });

    console.log("Parsed Data:", parsedData);
    setmcBoxes(parsedData);
  } catch (err) {
    console.error(err);
  }
};

useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect
  fetchMcBoxes();

  const interval = setInterval(fetchMcBoxes, 1000); 
  return () => clearInterval(interval);
}, []);


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
          M/C
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={selectC}
            onChange={() => setSelectC(prev => !prev)}
          />
          C
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
      await fetch("http://192.168.0.24:4002/api/et_update-machine-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          boxM: dbTarget.mc,
          boxC: dbTarget.c,
          mcValue: selectMC ? 1 : 0,
          cValue: selectC ? 1 : 0,
        }),
      });

      fetchMcBoxes();

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
       {/* <header> <img
  src={menu}
  alt="menu"
  width="80"
  height="100"
  id='et_menu'
  onMouseEnter={() => setShowMenu(true)}
  onMouseLeave={() => setShowMenu(false)}
/>
<span  id='et'>ET</span>
<div id='et_red_yellow_knob'>
<div className={`triple-toggle`}>
  <div className={`triple-knob`} />

  <span id='red'>RED</span>
  <span id='yellow'>YELLOW</span>
</div>
</div>
</header> */}
        <table id='et_table_header'>
          <tbody>
         <tr id='et_row1'>
          <td id='et_today'>TODAY</td>
          <td id='et_present'>PRESENT</td>
          <td id='et_actual'>ACTUAL</td>
          <td id='et_over_time'>OVER TIME</td>
          <td id='et_oa'>OA</td>
          <td id='et_main3' rowSpan={3}>MAIN3</td>
          <td id='et_stop_time' colSpan={2}>STOP TIME</td>
          <td id='et_setting'>SETTING</td>
         </tr>
         <tr id='et_row2'>
          <td id='et_2_1' rowSpan={2}>{data?.et_today_data ?? 0}</td>
          <td id='et_2_2' rowSpan={2}>{data?.et_present_data ?? 0}</td>
          <td id='et_2_3' rowSpan={2}>{data?.et_actual_data ?? 0}</td>
          <td id='et_2_4' rowSpan={2}>{data?.et_over_time_data ?? 0}</td>
          <td id="et_2_5" rowSpan={2}>{data?.et_oa_data
    ? (Number(data.et_oa_data) / 10).toFixed(1)
    : ""}</td>

          <td id='et_2_6' colSpan={2}>{data?.et_main3_stop_time_data && data?.et_main3_stop_time_minutes_data
    ? `${data.et_main3_stop_time_data}:${data.et_main3_stop_time_minutes_data}`
    : "0:00"}</td>
          <td id='et_2_7' rowSpan={2}  style={{
    backgroundColor: getBackgroundColor(boxes.box38_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box38_color?.toString())),
  }}>{boxes.box38_name}</td>
         </tr>
         <tr id='et_row3'>
          <td id='et_3_1'>ACT</td>
          <td id='et_3_2'>{data?.et_main3_actual_data ?? 0}</td>
         </tr>
         </tbody>
        </table>
        
        <table id='et_table_body'>
          <tbody>
         <tr><td id='et_sps' colSpan={18}  {...getCellProps(boxes.box37_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box37_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box37_color?.toString())),
  }}>
    <img
  src={menu}
  alt="menu"
  width="80"
  height="100"
  id='et_menu'
  style={{
      position: "absolute",
      zIndex: 20,
    }}
  onMouseEnter={() => setShowMenu(true)}
  onMouseLeave={() => setShowMenu(false)}
/>
{boxes.box37_name}
<div id='et_red_yellow_knob'>
<div className={`triple-toggle`}>
  <div className={`triple-knob`} />

  <span id='red'>RED</span>
  <span id='yellow'>YELLOW</span>
</div>
</div>
</td></tr>
        
        <tr id='et_row3'>
            <td id='et_3_1_1'>{mcboxes?.BOX1_M === 1 ? "M/C" : ""}</td>
            <td id='et_3_1_2'>{mcboxes?.BOX1_C === 1 ? "C" : ""}</td>
            <td id='et_3_1_3'>{mcboxes?.BOX2_M === 1 ? "M/C" : ""}</td>
            <td id='et_3_1_4'>{mcboxes?.BOX2_C === 1 ? "C" : ""}</td>
            <td id='et_3_1_5'>{mcboxes?.BOX3_M === 1 ? "M/C" : ""}</td>
            <td id='et_3_1_6'>{mcboxes?.BOX3_C === 1 ? "C" : ""}</td>
            <td id='et_3_1_7'>{mcboxes?.BOX4_M === 1 ? "M/C" : ""}</td>
            <td id='et_3_1_8'>{mcboxes?.BOX4_C === 1 ? "C" : ""}</td>
            <td id='et_3_1_9'>{mcboxes?.BOX5_M === 1 ? "M/C" : ""}</td>
            <td id='et_3_1_10'>{mcboxes?.BOX5_C === 1 ? "C" : ""}</td>
            <td id='et_3_1_11'>{mcboxes?.BOX6_M === 1 ? "M/C" : ""}</td>
            <td id='et_3_1_12'>{mcboxes?.BOX6_C === 1 ? "C" : ""}</td>
            <td id='et_3_1_13'>{mcboxes?.BOX7_M === 1 ? "M/C" : ""}</td>
            <td id='et_3_1_14'>{mcboxes?.BOX7_C === 1 ? "C" : ""}</td>
            <td id='et_3_1_15'>{mcboxes?.BOX8_M === 1 ? "M/C" : ""}</td>
            <td id='et_3_1_16'>{mcboxes?.BOX8_C === 1 ? "C" : ""}</td>
            <td id='et_3_1_17'>{mcboxes?.BOX9_M === 1 ? "M/C" : ""}</td>
            <td id='et_3_1_18'>{mcboxes?.BOX9_C === 1 ? "C" : ""}</td>
          </tr>

         <tr id='et_row4'>
          <td id='et_4_1' colSpan={2}   {...getCellProps(boxes.box1_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box1_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box1_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("et_4_1");

  
    setSelectMC(mcboxes.BOX1_M === 1);
    setSelectC(mcboxes.BOX1_C === 1);

 
    setLoginOverlayVisible(true);
  }}>{boxes.box1_name}</td>
          <td id='et_4_2' colSpan={2}  {...getCellProps(boxes.box2_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box2_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box2_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("et_4_2");

    
    setSelectMC(mcboxes.BOX2_M === 1);
    setSelectC(mcboxes.BOX2_C === 1);

  
    setLoginOverlayVisible(true);
  }}>{boxes.box2_name}</td>
          <td id='et_4_3'  colSpan={2}  {...getCellProps(boxes.box3_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box3_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box3_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("et_4_3");

 
    setSelectMC(mcboxes.BOX3_M === 1);
    setSelectC(mcboxes.BOX3_C === 1);

 
    setLoginOverlayVisible(true);
  }}>{boxes.box3_name}</td>
          <td id='et_4_4'  colSpan={2} {...getCellProps(boxes.box4_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box4_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box4_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("et_4_4");

    
    setSelectMC(mcboxes.BOX4_M === 1);
    setSelectC(mcboxes.BOX4_C === 1);


    setLoginOverlayVisible(true);
  }}>{boxes.box4_name}</td>
          <td id='et_4_5' colSpan={2} {...getCellProps(boxes.box5_color?.toString())}   style={{
    backgroundColor: getBackgroundColor(boxes.box5_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box5_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("et_4_5");

    setSelectMC(mcboxes.BOX5_M === 1);
    setSelectC(mcboxes.BOX5_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box5_name}</td>
          <td id='et_4_6' colSpan={2}  {...getCellProps(boxes.box6_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box6_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box6_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("et_4_6");

 
    setSelectMC(mcboxes.BOX6_M === 1);
    setSelectC(mcboxes.BOX6_C === 1);

    
    setLoginOverlayVisible(true);
  }}>{boxes.box6_name}</td>
          <td id='et_4_7' colSpan={2}  {...getCellProps(boxes.box7_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box7_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box7_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("et_4_7");


    setSelectMC(mcboxes.BOX7_M === 1);
    setSelectC(mcboxes.BOX7_C === 1);

  
    setLoginOverlayVisible(true);
  }}>{boxes.box7_name}</td>
          <td id='et_4_8'  colSpan={2} {...getCellProps(boxes.box8_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box8_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box8_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("et_4_8");

  
    setSelectMC(mcboxes.BOX8_M === 1);
    setSelectC(mcboxes.BOX8_C === 1);

  
    setLoginOverlayVisible(true);
  }}>{boxes.box8_name}</td>
          <td id='et_4_9' colSpan={2} {...getCellProps(boxes.box9_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box9_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box9_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("et_4_9");


    setSelectMC(mcboxes.BOX9_M === 1);
    setSelectC(mcboxes.BOX9_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box9_name}</td>
         </tr>

          <tr id='et_row4_1'>
            <td colSpan={2} id='et_4_1_1'></td>
            <td colSpan={2} id='et_4_1_2'></td>
            <td colSpan={2} id='et_4_1_3'></td>
            <td colSpan={2} id='et_4_1_4'></td>
            <td colSpan={2} id='et_4_1_5'></td>
            <td colSpan={2} id='et_4_1_6'></td>
            <td colSpan={2} id='et_4_1_7'></td>
            <td colSpan={2} id='et_4_1_8'></td>
            <td colSpan={2} id='et_4_1_9'></td>
          </tr>
           {/* <tr id='et_row4_2'>
            <td  id='et_4_2_1'>{redCounts.box1_red_count || ""}</td>
            <td  id='et_4_2_2'>{yellowCounts.box1_yellow_count || ""}</td>
            <td  id='et_4_2_3'>{redCounts.box2_red_count || ""}</td>
            <td  id='et_4_2_4'>{yellowCounts.box2_yellow_count || ""}</td>
            <td  id='et_4_2_5'>{redCounts.box3_red_count || ""}</td>
            <td  id='et_4_2_6'>{yellowCounts.box3_yellow_count || ""}</td>
            <td  id='et_4_2_7'>{redCounts.box4_red_count || ""}</td>
            <td  id='et_4_2_8'>{yellowCounts.box4_yellow_count || ""}</td>
            <td  id='et_4_2_9'>{redCounts.box5_red_count || ""}</td>
            <td  id='et_4_2_10'>{yellowCounts.box5_yellow_count || ""}</td>
            <td  id='et_4_2_11'>{redCounts.box6_red_count || ""}</td>
            <td  id='et_4_2_12'>{yellowCounts.box6_yellow_count || ""}</td>
            <td  id='et_4_2_13'>{redCounts.box7_red_count || ""}</td>
            <td  id='et_4_2_14'>{yellowCounts.box7_yellow_count || ""}</td>
            <td  id='et_4_2_15'>{redCounts.box8_red_count || ""}</td>
            <td  id='et_4_2_16'>{yellowCounts.box8_yellow_count || ""}</td>
            <td  id='et_4_2_17'>{redCounts.box9_red_count || ""}</td>
            <td  id='et_4_2_18'>{yellowCounts.box9_yellow_count || ""}</td>
          </tr> */}

                     <tr id='et_row4_2'>
  
            <td  id='et_4_2_2' colSpan={2} style={{ backgroundColor: isYellowActive(yellowCounts?.box1_yellow_count) ? "yellow" : "transparent",color: isYellowActive(yellowCounts?.box1_yellow_count)
      ? "black"
      : undefined }}>
      {yellowCounts?.box1_yellow_count ?? 0}</td>
            
            <td  id='et_4_2_4' colSpan={2} style={{ backgroundColor: isYellowActive(yellowCounts?.box2_yellow_count) ? "yellow" : "transparent",color: isYellowActive(yellowCounts?.box2_yellow_count)
      ? "black"
      : undefined }}>
      {yellowCounts?.box2_yellow_count ?? 0}</td>
           
            <td  id='et_4_2_6' colSpan={2} style={{ backgroundColor: isYellowActive(yellowCounts?.box3_yellow_count) ? "yellow" : "transparent",color: isYellowActive(yellowCounts?.box3_yellow_count)
      ? "black"
      : undefined }}>
      {yellowCounts?.box3_yellow_count ?? 0}</td>
           
            <td  id='et_4_2_8' colSpan={2} style={{ backgroundColor: isYellowActive(yellowCounts?.box4_yellow_count) ? "yellow" : "transparent",color: isYellowActive(yellowCounts?.box4_yellow_count)
      ? "black"
      : undefined }}>
      {yellowCounts?.box4_yellow_count ?? 0}</td>
           
            <td  id='et_4_2_10' colSpan={2} style={{ backgroundColor: isYellowActive(yellowCounts?.box5_yellow_count) ? "yellow" : "transparent",color: isYellowActive(yellowCounts?.box5_yellow_count)
      ? "black"
      : undefined }}>
      {yellowCounts?.box5_yellow_count ?? 0}</td>
           
            <td  id='et_4_2_12' colSpan={2} style={{ backgroundColor: isYellowActive(yellowCounts?.box6_yellow_count) ? "yellow" : "transparent",color: isYellowActive(yellowCounts?.box6_yellow_count)
      ? "black"
      : undefined }}>
      {yellowCounts?.box6_yellow_count ?? 0}</td>
        
            <td  id='et_4_2_14' colSpan={2} style={{ backgroundColor: isYellowActive(yellowCounts?.box7_yellow_count) ? "yellow" : "transparent",color: isYellowActive(yellowCounts?.box7_yellow_count)
      ? "black"
      : undefined }}>
      {yellowCounts?.box7_yellow_count ?? 0}</td>
          
            <td  id='et_4_2_16' colSpan={2} style={{ backgroundColor: isYellowActive(yellowCounts?.box8_yellow_count) ? "yellow" : "transparent",color: isYellowActive(yellowCounts?.box8_yellow_count)
      ? "black"
      : undefined }}>
      {yellowCounts?.box8_yellow_count ?? 0}</td>
        
            <td  id='et_4_2_18' colSpan={2} style={{ backgroundColor: isYellowActive(yellowCounts?.box9_yellow_count) ? "yellow" : "transparent",color: isYellowActive(yellowCounts?.box9_yellow_count)
      ? "black"
      : undefined }}>
      {yellowCounts?.box9_yellow_count ?? 0}</td>
          </tr>

           <tr id='et_row6_1'>
            <td id='et_6_1_1'>{mcboxes?.BOX10_M === 1 ? "M/C" : ""}</td>
            <td id='et_6_1_2'>{mcboxes?.BOX10_C === 1 ? "C" : ""}</td>
            <td id='et_6_1_3'>{mcboxes?.BOX11_M === 1 ? "M/C" : ""}</td>
            <td id='et_6_1_4'>{mcboxes?.BOX11_C === 1 ? "C" : ""}</td>
            <td id='et_6_1_5'>{mcboxes?.BOX12_M === 1 ? "M/C" : ""}</td>
            <td id='et_6_1_6'>{mcboxes?.BOX12_C === 1 ? "C" : ""}</td>
            <td id='et_6_1_7'>{mcboxes?.BOX13_M === 1 ? "M/C" : ""}</td>
            <td id='et_6_1_8'>{mcboxes?.BOX13_C === 1 ? "C" : ""}</td>
            <td id='et_6_1_9'>{mcboxes?.BOX14_M === 1 ? "M/C" : ""}</td>
            <td id='et_6_1_10'>{mcboxes?.BOX14_C === 1 ? "C" : ""}</td>
            <td id='et_6_1_11'>{mcboxes?.BOX15_M === 1 ? "M/C" : ""}</td>
            <td id='et_6_1_12'>{mcboxes?.BOX15_C === 1 ? "C" : ""}</td>
            <td id='et_6_1_13'>{mcboxes?.BOX16_M === 1 ? "M/C" : ""}</td>
            <td id='et_6_1_14'>{mcboxes?.BOX16_C === 1 ? "C" : ""}</td>
            <td id='et_6_1_15'>{mcboxes?.BOX17_M === 1 ? "M/C" : ""}</td>
            <td id='et_6_1_16'>{mcboxes?.BOX17_C === 1 ? "C" : ""}</td>
            <td id='et_6_1_17'>{mcboxes?.BOX18_M === 1 ? "M/C" : ""}</td>
            <td id='et_6_1_18'>{mcboxes?.BOX18_C === 1 ? "C" : ""}</td>

          </tr>
        
        
         <tr id='et_row6'>
          <td id='et_6_1' colSpan={2} {...getCellProps(boxes.box10_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box10_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box10_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("et_6_1");

    setSelectMC(mcboxes.BOX10_M === 1);
    setSelectC(mcboxes.BOX10_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box10_name}</td>
          <td id='et_6_2'  colSpan={2} {...getCellProps(boxes.box11_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box11_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box11_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("et_6_2");

    setSelectMC(mcboxes.BOX11_M === 1);
    setSelectC(mcboxes.BOX11_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box11_name}</td>
          <td id='et_6_3' colSpan={2} {...getCellProps(boxes.box12_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box12_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box12_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("et_6_3");

    setSelectMC(mcboxes.BOX12_M === 1);
    setSelectC(mcboxes.BOX12_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box12_name}</td>
          <td id='et_6_4' colSpan={2} {...getCellProps(boxes.box13_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box13_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box13_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("et_6_4");

    setSelectMC(mcboxes.BOX13_M === 1);
    setSelectC(mcboxes.BOX13_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box13_name}</td>
          <td id='et_6_5'  colSpan={2}  {...getCellProps(boxes.box14_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box14_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box14_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("et_6_5");

    setSelectMC(mcboxes.BOX14_M === 1);
    setSelectC(mcboxes.BOX14_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box14_name}</td>
          <td id='et_6_6' colSpan={2} {...getCellProps(boxes.box15_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box15_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box15_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("et_6_6");

    setSelectMC(mcboxes.BOX15_M === 1);
    setSelectC(mcboxes.BOX15_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box15_name}</td>
          <td id='et_6_7' colSpan={2} {...getCellProps(boxes.box16_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box16_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box16_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("et_6_7");

    setSelectMC(mcboxes.BOX16_M === 1);
    setSelectC(mcboxes.BOX16_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box16_name}</td>
          <td id='et_6_8' colSpan={2} {...getCellProps(boxes.box17_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box17_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box17_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("et_6_8");

    setSelectMC(mcboxes.BOX17_M === 1);
    setSelectC(mcboxes.BOX17_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box17_name}</td>
          <td id='et_6_9' colSpan={2} {...getCellProps(boxes.box18_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box18_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box18_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("et_6_9");

    setSelectMC(mcboxes.BOX18_M === 1);
    setSelectC(mcboxes.BOX18_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box18_name}</td>
         </tr>

          <tr id='et_row6_2'>
            <td colSpan={2} id='et_6_2_1'></td>
            <td colSpan={2} id='et_6_2_2'></td>
            <td colSpan={2} id='et_6_2_3'></td>
            <td colSpan={2} id='et_6_2_4'></td>
            <td colSpan={2} id='et_6_2_5'></td>
            <td colSpan={2} id='et_6_2_6'></td>
            <td colSpan={2} id='et_6_2_7'></td>
            <td colSpan={2} id='et_6_2_8'></td>
            <td colSpan={2} id='et_6_2_9'></td>
          </tr>
           <tr id='et_row6_3'>
            
            <td  id='et_6_3_2' colSpan={2} style={{ backgroundColor: isYellowActive(yellowCounts?.box10_yellow_count) ? "yellow" : "transparent",color: isYellowActive(yellowCounts?.box10_yellow_count)
      ? "black"
      : undefined }}>
      {yellowCounts?.box10_yellow_count ?? 0}</td>
            
            <td  id='et_6_3_4' colSpan={2} style={{ backgroundColor: isYellowActive(yellowCounts?.box11_yellow_count) ? "yellow" : "transparent",color: isYellowActive(yellowCounts?.box11_yellow_count)
      ? "black"
      : undefined }}>
      {yellowCounts?.box11_yellow_count ?? 0}</td>
            
            <td  id='et_6_3_6' colSpan={2} style={{ backgroundColor: isYellowActive(yellowCounts?.box12_yellow_count) ? "yellow" : "transparent",color: isYellowActive(yellowCounts?.box12_yellow_count)
      ? "black"
      : undefined }}>
      {yellowCounts?.box12_yellow_count ?? 0}</td>
            
            <td  id='et_6_3_8' colSpan={2} style={{ backgroundColor: isYellowActive(yellowCounts?.box13_yellow_count) ? "yellow" : "transparent",color: isYellowActive(yellowCounts?.box13_yellow_count)
      ? "black"
      : undefined }}>
      {yellowCounts?.box13_yellow_count ?? 0}</td>
         
            <td  id='et_6_3_10' colSpan={2} style={{ backgroundColor: isYellowActive(yellowCounts?.box14_yellow_count) ? "yellow" : "transparent",color: isYellowActive(yellowCounts?.box14_yellow_count)
      ? "black"
      : undefined }}>
      {yellowCounts?.box14_yellow_count ?? 0}</td>
           
            <td  id='et_6_3_12' colSpan={2} style={{ backgroundColor: isYellowActive(yellowCounts?.box15_yellow_count) ? "yellow" : "transparent",color: isYellowActive(yellowCounts?.box15_yellow_count)
      ? "black"
      : undefined }}>
      {yellowCounts?.box15_yellow_count ?? 0}</td>
        
            <td  id='et_6_3_14' colSpan={2} style={{ backgroundColor: isYellowActive(yellowCounts?.box16_yellow_count) ? "yellow" : "transparent",color: isYellowActive(yellowCounts?.box16_yellow_count)
      ? "black"
      : undefined }}>
      {yellowCounts?.box16_yellow_count ?? 0}</td>
           
            <td  id='et_6_3_16' colSpan={2} style={{ backgroundColor: isYellowActive(yellowCounts?.box17_yellow_count) ? "yellow" : "transparent",color: isYellowActive(yellowCounts?.box17_yellow_count)
      ? "black"
      : undefined }}>
      {yellowCounts?.box17_yellow_count ?? 0}</td>
        
            <td  id='et_6_3_18' colSpan={2} style={{ backgroundColor: isYellowActive(yellowCounts?.box18_yellow_count) ? "yellow" : "transparent",color: isYellowActive(yellowCounts?.box18_yellow_count)
      ? "black"
      : undefined }}>
      {yellowCounts?.box18_yellow_count ?? 0}</td>
          </tr>
          
         
         
         <tr id='et_row8'>
         <td
  id="et_8_1"
  colSpan={3}
  style={{
    backgroundColor: getBackgroundColor(boxes.box19_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box19_color?.toString())),
    whiteSpace: "pre-line",
  }}
>
  {typeof boxes.box19_name === "string"
    ? boxes.box19_name.startsWith("OIL")
      ? boxes.box19_name.replace("OIL", "OIL\n")
      : boxes.box19_name
    : ""}
</td>

<td
  id="et_8_2"
  colSpan={3}
  style={{
    backgroundColor: getBackgroundColor(boxes.box20_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box20_color?.toString())),
    whiteSpace: "pre-line",
  }}
>
  {typeof boxes.box20_name === "string"
    ? boxes.box20_name.startsWith("WATER")
      ? boxes.box20_name.replace("WATER", "WATER\n")
      : boxes.box20_name
    : ""}
</td>
          <td id='et_8_3' colSpan={2}   style={{
    backgroundColor: getBackgroundColor(boxes.box21_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box21_color?.toString())),
  }} >{boxes.box21_name}</td>
          <td id='et_8_4' colSpan={2}   style={{
    backgroundColor: getBackgroundColor(boxes.box22_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box22_color?.toString())),
  }} >{boxes.box22_name}</td>
         <td
  id="et_8_5"
  colSpan={2}
  style={{
    backgroundColor: getBackgroundColor(boxes.box23_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box23_color?.toString())),
    whiteSpace: "pre-line",
  }}
>
  {typeof boxes.box23_name === "string"
    ? boxes.box23_name.startsWith("OIL")
      ? boxes.box23_name.replace("OIL", "OIL\n")
      : boxes.box23_name
    : ""}
</td>
          <td id='et_8_6' colSpan={2}   style={{
    backgroundColor: getBackgroundColor(boxes.box24_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box24_color?.toString())),
  }} >{boxes.box24_name}</td>
          <td id='et_8_7' colSpan={2}    style={{
    backgroundColor: getBackgroundColor(boxes.box25_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box25_color?.toString())),
  }} >{boxes.box25_name}</td>
          <td id='et_8_8' colSpan={2}   style={{
    backgroundColor: getBackgroundColor(boxes.box26_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box26_color?.toString())),
  }} >{boxes.box26_name}</td>
         </tr>
         <tr id='et_row9'>
         <td
  id="et_9_1"
  colSpan={2}
  style={{
    backgroundColor: getBackgroundColor(boxes.box27_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box27_color?.toString())),
    whiteSpace: "pre-line",
  }}
>
  {typeof boxes.box27_name === "string"
    ? boxes.box27_name.startsWith("SPS")
      ? boxes.box27_name.replace("SPS", "SPS\n")
      : boxes.box27_name
    : ""}
</td>

<td
  id="et_9_2"
  colSpan={2}
  style={{
    backgroundColor: getBackgroundColor(boxes.box28_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box28_color?.toString())),
    whiteSpace: "pre-line",
  }}
>
  {typeof boxes.box28_name === "string"
    ? boxes.box28_name.startsWith("ET")
      ? boxes.box28_name.replace("ET", "ET\n")
      : boxes.box28_name
    : ""}
</td>

<td
  id="et_9_3"
  colSpan={2}
  style={{
    backgroundColor: getBackgroundColor(boxes.box29_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box29_color?.toString())),
    whiteSpace: "pre-line",
  }}
>
  {typeof boxes.box29_name === "string"
    ? boxes.box29_name.startsWith("SPS")
      ? boxes.box29_name.replace("SPS", "SPS\n")
      : boxes.box29_name
    : ""}
</td>
          <td id='et_9_4' colSpan={2}   style={{
    backgroundColor: getBackgroundColor(boxes.box30_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box30_color?.toString())),
  }} >{boxes.box30_name}</td>
          <td id='et_9_5' colSpan={2}   style={{
    backgroundColor: getBackgroundColor(boxes.box31_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box31_color?.toString())),
  }} >{boxes.box31_name}</td>
          <td id='et_9_6'  colSpan={2}   style={{
    backgroundColor: getBackgroundColor(boxes.box32_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box32_color?.toString())),
  }} >{boxes.box32_name}</td>
          <td id='et_9_7' colSpan={2}    style={{
    backgroundColor: getBackgroundColor(boxes.box33_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box33_color?.toString())),
  }} >{boxes.box33_name}</td>
          <td id='et_9_8' colSpan={2}    style={{
    backgroundColor: getBackgroundColor(boxes.box34_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box34_color?.toString())),
  }} >{boxes.box34_name}</td>
          <td id='et_9_9'    style={{
    backgroundColor: getBackgroundColor(boxes.box35_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box35_color?.toString())),
  }} >{boxes.box35_name}</td>
          <td id='et_9_10'    style={{
    backgroundColor: getBackgroundColor(boxes.box36_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box36_color?.toString())),
  }} >{boxes.box36_name}</td>
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