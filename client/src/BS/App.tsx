import '../BS/index.css';

import {
  useEffect,
  useState,
} from 'react';

import menu from '../assets/menu.gif';
import { useTheme } from '../hooks/useTheme';
import Menu from '../MK1/menu';

interface bsData {
      bs_today_data: number,
      bs_present_data: number,
      bs_bs_actual_data: number,
      bs_ps_actual_data: number,
      bs_over_time_data: number,
      bs_stop_time_data: string,
      bs_stop_time_minutes_data: string,
      bs_actual_data: number
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
    const response = await fetch("http://192.168.0.24:4002/api/bs_logincredentials", {
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
   const tdIds = [ 'bs_3_1_1','bs_3_1_3','bs_3_1_5','bs_3_1_7','bs_3_1_9','bs_3_1_11','bs_3_1_13','bs_3_1_15','bs_3_1_17','bs_3_1_19', 
    'bs_6_1_1','bs_6_1_3','bs_6_1_5','bs_6_1_7','bs_6_1_9','bs_6_1_11','bs_6_1_13','bs_6_1_15','bs_6_1_17','bs_6_1_19',  
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
  const tdIds = ['bs_3_1_2','bs_3_1_4','bs_3_1_6','bs_3_1_8','bs_3_1_10','bs_3_1_12','bs_3_1_14','bs_3_1_16','bs_3_1_18','bs_3_1_20', 
'bs_6_1_2','bs_6_1_4','bs_6_1_6','bs_6_1_8','bs_6_1_10','bs_6_1_12','bs_6_1_14','bs_6_1_16','bs_6_1_18','bs_6_1_20',  
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
  "bs_4_1": { mc: "BOX1_M", c: "BOX1_C" },
  "bs_4_2": { mc: "BOX2_M", c: "BOX2_C" },
  "bs_4_3": { mc: "BOX3_M", c: "BOX3_C" },
  "bs_4_4": { mc: "BOX4_M", c: "BOX4_C" },
  "bs_4_5": { mc: "BOX5_M", c: "BOX5_C" },
  "bs_4_6": { mc: "BOX6_M", c: "BOX6_C" },
  "bs_4_7": { mc: "BOX7_M", c: "BOX7_C" },
  "bs_4_8": { mc: "BOX8_M", c: "BOX8_C" },
  "bs_4_9": { mc: "BOX9_M", c: "BOX9_C" },
  "bs_4_10": { mc: "BOX10_M", c: "BOX10_C" },
  "bs_6_1": { mc: "BOX11_M", c: "BOX11_C" },
  "bs_6_2": { mc: "BOX12_M", c: "BOX12_C" },
  "bs_6_3": { mc: "BOX13_M", c: "BOX13_C" },
  "bs_6_4": { mc: "BOX14_M", c: "BOX14_C" },
  "bs_6_5": { mc: "BOX15_M", c: "BOX15_C" },
  "bs_6_6": { mc: "BOX16_M", c: "BOX16_C" },
  "bs_6_7": { mc: "BOX17_M", c: "BOX17_C" },
  "bs_6_8": { mc: "BOX18_M", c: "BOX18_C" },
  "bs_6_9": { mc: "BOX19_M", c: "BOX19_C" },
  "bs_6_10": { mc: "BOX20_M", c: "BOX20_C" },
};

         

         const [data, setData] = useState<bsData | null>(null);
         
         useEffect(() => {
           const fetchData = () => {
             fetch("http://192.168.0.24:4002/api/bs")
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

         
//  useEffect(() => {
//   const fetchBoxes = async () => {
//     try {
//       const res = await fetch("http://192.168.0.24:4002/api/bs_boxes");
//       const data = await res.json();
//       setBoxes(prev => ({
//   ...prev,
//   ...data
// }));

//     } catch (err) {
//       console.error("bs_boxes error:", err);
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
      fetch("http://192.168.0.24:4002/api/bs_boxes_colors")
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
      const res = await fetch("http://192.168.0.24:4002/api/bs_yellow_count");
      const data = await res.json();
      setYellowCounts(data);
    } catch (err) {
      console.error("bs_yellow_count error:", err);
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
        const res = await fetch("http://192.168.0.24:4002/api/bs_yellow_time");
        const data = await res.json();
        setYellowTimes(data);
      } catch (err) {
        console.error("bs_yellow_time error:", err);
      }
    };

    fetchYellowTimes();
    const interval = setInterval(fetchYellowTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!yellowTimes) return;

    for (let i = 1; i <= 10; i++) {
      const td = document.getElementById(`bs_4_1_${i}`);
      if (td) {
        const valueInSeconds = yellowTimes[`box${i}_yellow_time`] ?? 0;
        td.textContent = secondsToMMSS(valueInSeconds);
      }
    }

    for (let i = 11; i <= 20; i++) {
      const td = document.getElementById(`bs_6_2_${i - 10}`);
      if (td) {
        const valueInSeconds = yellowTimes[`box${i}_yellow_time`] ?? 0;
        td.textContent = secondsToMMSS(valueInSeconds);
      }
    }
  }, [yellowTimes]);

  
  const fetchBoxes = async () => {
  try {
    const res = await fetch("http://192.168.0.24:4002/api/bs_mc");
    const data = await res.json();
    setmcBoxes(data);
  } catch (err) {
    console.error(err);
  }
};

useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect
  fetchBoxes();
  const interval = setInterval(fetchBoxes, 1000);
  return () => clearInterval(interval);
}, []);



useEffect(() => {
  if (!data) return;
}, [data]);

  return (

      <div className="page-container">
   {loginOverlayVisible && (
  <div className="overlay">
    <div className="login-overlay-content">
      <h2 className="login-title">LOGIN</h2>

      <input
        className={`login-input ${overlayUserError ? "error-input" : ""}`}
        type="text"
        placeholder="USERNAME"
        value={username}
        onChange={(e) => setUsername(e.target.value)}/>

      <input
        className={`login-input ${overlayPassError ? "error-input" : ""}`}
        type="password"
        placeholder="PASSWORD"
        value={password}
        onChange={(e) => setPassword(e.target.value)}/>

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
            onChange={() => setSelectMC(prev => !prev)}/>
          M/C
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={selectC}
            onChange={() => setSelectC(prev => !prev)}/>
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
      await fetch("http://192.168.0.24:4002/api/bs_update-machine-status", {
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
       {/* <header> <img
  src={menu}
  alt="menu"
  width="80"
  height="100"
  id='bs_menu'
  onMouseEnter={() => setShowMenu(true)}
  onMouseLeave={() => setShowMenu(false)}
/>
<span  id='bs'>BS</span>
<div  id='bs_red_yellow_knob'>
<div className={`triple-toggle`}>
  <div className={`triple-knob`} />

  <span id='red'>RED</span>
  <span id='yellow'>YELLOW</span>
</div>
</div>
</header> */}
        <table id='bs_table_header'>
          <thead>
            <tr><td></td></tr>
          </thead>
        <tbody>
         <tr id='bs_row1'>
          <td id='bs_today'>TODAY</td>
          <td id='bs_present'>PRESENT</td>
          <td id='bs_actual'>BS ACTUAL</td>
          <td id='ps_actual'>PS ACTUAL</td>
          <td id='bs_over_time'>OVER TIME</td>
          <td id='bs_oa' rowSpan={3}></td>
          <td id='bs_main3' rowSpan={3}>MAIN1</td>
          <td id='bs_stop_time' colSpan={2}>STOP TIME</td>
          <td id='setting' rowSpan={3}></td>
         </tr>
         <tr id='bs_row2'>

         <td rowSpan={2} id='bs_today_data'>{data?.bs_today_data ?? 0}</td>
          <td rowSpan={2} id='bs_present_data'>{data?.bs_present_data ?? 0}</td>
          <td rowSpan={2} id='bs_bs_actual_data'>{data?.bs_bs_actual_data ?? 0}</td>
          <td rowSpan={2} id='bs_cs_actual_data'>{data?.bs_ps_actual_data ?? 0}</td>
          <td rowSpan={2} id='bs_over_time_data'>{data?.bs_over_time_data ?? 0}</td>
          <td colSpan={2} id='bs_stop_time_data'>{data?.bs_stop_time_data && data?.bs_stop_time_minutes_data
    ? `${data.bs_stop_time_data}:${data.bs_stop_time_minutes_data}`
    : "0:00"}</td>
         </tr>
         <tr id='bs_row3'>
        <td>ACT</td>
        <td>{data?.bs_actual_data ?? 0}</td>
         </tr>
         </tbody>
        </table>
        
        <table id='bs_table_body'>
          <thead><tr><td></td></tr></thead>
        <tbody>
         <tr><td id='bs_bs' colSpan={20}  {...getCellProps(boxes.box41_color?.toString())}   style={{
    backgroundColor: getBackgroundColor(boxes.box41_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box41_color?.toString())),
  }}>
     <img
  src={menu}
  alt="menu"
  width="80"
  height="100"
  id='bs_menu'
   style={{
      position: "absolute",
      zIndex: 20,
    }}
  onMouseEnter={() => setShowMenu(true)}
  onMouseLeave={() => setShowMenu(false)}
/>
{boxes.box41_name}
<div  id='bs_red_yellow_knob'>
<div className={`triple-toggle`}>
  <div className={`triple-knob`} />

  <span id='red'>RED</span>
  <span id='yellow'>YELLOW</span>
</div>
</div></td></tr>

    <tr id='bs_row3'>
            <td id='bs_3_1_1'>{mcboxes?.BOX1_M === 1 ? "M/C" : ""}</td>
            <td id='bs_3_1_2'>{mcboxes?.BOX1_C === 1 ? "C" : ""}</td>
            <td id='bs_3_1_3'>{mcboxes?.BOX2_M === 1 ? "M/C" : ""}</td>
            <td id='bs_3_1_4'>{mcboxes?.BOX2_C === 1 ? "C" : ""}</td>
            <td id='bs_3_1_5'>{mcboxes?.BOX3_M === 1 ? "M/C" : ""}</td>
            <td id='bs_3_1_6'>{mcboxes?.BOX3_C === 1 ? "C" : ""}</td>
            <td id='bs_3_1_7'>{mcboxes?.BOX4_M === 1 ? "M/C" : ""}</td>
            <td id='bs_3_1_8'>{mcboxes?.BOX4_C === 1 ? "C" : ""}</td>
            <td id='bs_3_1_9'>{mcboxes?.BOX5_M === 1 ? "M/C" : ""}</td>
            <td id='bs_3_1_10'>{mcboxes?.BOX5_C === 1 ? "C" : ""}</td>
            <td id='bs_3_1_11'>{mcboxes?.BOX6_M === 1 ? "M/C" : ""}</td>
            <td id='bs_3_1_12'>{mcboxes?.BOX6_C === 1 ? "C" : ""}</td>
            <td id='bs_3_1_13'>{mcboxes?.BOX7_M === 1 ? "M/C" : ""}</td>
            <td id='bs_3_1_14'>{mcboxes?.BOX7_C === 1 ? "C" : ""}</td>
            <td id='bs_3_1_15'>{mcboxes?.BOX8_M === 1 ? "M/C" : ""}</td>
            <td id='bs_3_1_16'>{mcboxes?.BOX8_C === 1 ? "C" : ""}</td>
            <td id='bs_3_1_17'>{mcboxes?.BOX9_M === 1 ? "M/C" : ""}</td>
            <td id='bs_3_1_18'>{mcboxes?.BOX9_C === 1 ? "C" : ""}</td>
            <td id='bs_3_1_19'>{mcboxes?.BOX10_M === 1 ? "M/C" : ""}</td>
            <td id='bs_3_1_20'>{mcboxes?.BOX10_C === 1 ? "C" : ""}</td>
          </tr>
         <tr id='bs_row4'>
          <td id='bs_4_1' colSpan={2}  {...getCellProps(boxes.box1_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box1_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box1_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("bs_4_1");

    setSelectMC(mcboxes.BOX1_M === 1);
    setSelectC(mcboxes.BOX1_C === 1);
    setLoginOverlayVisible(true);
  }}>{boxes.box1_name}</td>
          <td id='bs_4_2' colSpan={2}  {...getCellProps(boxes.box2_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box2_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box2_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("bs_4_2");

    setSelectMC(mcboxes.BOX2_M === 1);
    setSelectC(mcboxes.BOX2_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box2_name}</td>
          <td id='bs_4_3' colSpan={2}  {...getCellProps(boxes.box3_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box3_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box3_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("bs_4_3");

    setSelectMC(mcboxes.BOX3_M === 1);
    setSelectC(mcboxes.BOX3_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box3_name}</td>
          <td id='bs_4_4'  colSpan={2}  {...getCellProps(boxes.box4_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box4_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box4_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("bs_4_4");

    setSelectMC(mcboxes.BOX4_M === 1);
    setSelectC(mcboxes.BOX4_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box4_name}</td>
          <td id='bs_4_5' colSpan={2}  {...getCellProps(boxes.box5_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box5_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box5_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("bs_4_5");

    setSelectMC(mcboxes.BOX5_M === 1);
    setSelectC(mcboxes.BOX5_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box5_name}</td>
          <td id='bs_4_6'  colSpan={2}  {...getCellProps(boxes.box6_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box6_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box6_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("bs_4_6");

    setSelectMC(mcboxes.BOX6_M === 1);
    setSelectC(mcboxes.BOX6_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box6_name}</td>
          <td id='bs_4_7'  colSpan={2}  {...getCellProps(boxes.box7_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box7_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box7_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("bs_4_7");

    setSelectMC(mcboxes.BOX7_M === 1);
    setSelectC(mcboxes.BOX7_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box7_name}</td>
          <td id='bs_4_8' colSpan={2}  {...getCellProps(boxes.box8_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box8_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box8_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("bs_4_8");

    setSelectMC(mcboxes.BOX8_M === 1);
    setSelectC(mcboxes.BOX8_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box8_name}</td>
          <td id='bs_4_9' colSpan={2}  {...getCellProps(boxes.box9_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box9_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box9_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("bs_4_9");

    setSelectMC(mcboxes.BOX9_M === 1);
    setSelectC(mcboxes.BOX9_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box9_name}</td>
          <td id='bs_4_10' colSpan={2}  {...getCellProps(boxes.box10_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box10_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box10_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("bs_4_10");

    setSelectMC(mcboxes.BOX10_M === 1);
    setSelectC(mcboxes.BOX10_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box10_name}</td>
         </tr>

         <tr id='bs_row4_1'>
            <td colSpan={2} id='bs_4_1_1'></td>
            <td colSpan={2} id='bs_4_1_2'></td>
            <td colSpan={2} id='bs_4_1_3'></td>
            <td colSpan={2} id='bs_4_1_4'></td>
            <td colSpan={2} id='bs_4_1_5'></td>
            <td colSpan={2} id='bs_4_1_6'></td>
            <td colSpan={2} id='bs_4_1_7'></td>
            <td colSpan={2} id='bs_4_1_8'></td>
            <td colSpan={2} id='bs_4_1_9'></td>
            <td colSpan={2} id='bs_4_1_10'></td>
          </tr>
           {/* <tr id='bs_row4_2'>
            <td  id='bs_4_2_1'>{redCounts.box1_red_count || ""}</td>
            <td  id='bs_4_2_2'>{yellowCounts.box1_yellow_count || ""}</td>
            <td  id='bs_4_2_3'>{redCounts.box2_red_count || ""}</td>
            <td  id='bs_4_2_4'>{yellowCounts.box2_yellow_count || ""}</td>
            <td  id='bs_4_2_5'>{redCounts.box3_red_count || ""}</td>
            <td  id='bs_4_2_6'>{yellowCounts.box3_yellow_count || ""}</td>
            <td  id='bs_4_2_7'>{redCounts.box4_red_count || ""}</td>
            <td  id='bs_4_2_8'>{yellowCounts.box4_yellow_count || ""}</td>
            <td  id='bs_4_2_9'>{redCounts.box5_red_count || ""}</td>
            <td  id='bs_4_2_10'>{yellowCounts.box5_yellow_count || ""}</td>
            <td  id='bs_4_2_11'>{redCounts.box6_red_count || ""}</td>
            <td  id='bs_4_2_12'>{yellowCounts.box6_yellow_count || ""}</td>
            <td  id='bs_4_2_13'>{redCounts.box7_red_count || ""}</td>
            <td  id='bs_4_2_14'>{yellowCounts.box7_yellow_count || ""}</td>
            <td  id='bs_4_2_15'>{redCounts.box8_red_count || ""}</td>
            <td  id='bs_4_2_16'>{yellowCounts.box8_yellow_count || ""}</td>
            <td  id='bs_4_2_17'>{redCounts.box9_red_count || ""}</td>
            <td  id='bs_4_2_18'>{yellowCounts.box9_yellow_count || ""}</td>
            <td  id='bs_4_2_19'>{redCounts.box10_red_count || ""}</td>
            <td  id='bs_4_2_20'>{yellowCounts.box10_yellow_count || ""}</td>
          </tr> */}

          <tr id='bs_row4_2'>
          
            <td  id='bs_4_2_2' colSpan={2} style={{ backgroundColor: isYellowActive(yellowCounts?.box1_yellow_count) ? "yellow" : "transparent",color: isYellowActive(yellowCounts?.box1_yellow_count)
      ? "black"
      : undefined }}>
      {yellowCounts?.box1_yellow_count ?? 0}</td>
           
            <td  id='bs_4_2_4' colSpan={2} style={{ backgroundColor: isYellowActive(yellowCounts?.box2_yellow_count) ? "yellow" : "transparent",color: isYellowActive(yellowCounts?.box2_yellow_count)
      ? "black"
      : undefined }}>
      {yellowCounts?.box2_yellow_count ?? 0}</td>
          
            <td  id='bs_4_2_6' colSpan={2} style={{ backgroundColor: isYellowActive(yellowCounts?.box3_yellow_count) ? "yellow" : "transparent",color: isYellowActive(yellowCounts?.box3_yellow_count)
      ? "black"
      : undefined }}>
      {yellowCounts?.box3_yellow_count ?? 0}</td>
           
            <td  id='bs_4_2_8' colSpan={2} style={{ backgroundColor: isYellowActive(yellowCounts?.box4_yellow_count) ? "yellow" : "transparent",color: isYellowActive(yellowCounts?.box4_yellow_count)
      ? "black"
      : undefined }}>
      {yellowCounts?.box4_yellow_count ?? 0}</td>
       
            <td  id='bs_4_2_10' colSpan={2} style={{ backgroundColor: isYellowActive(yellowCounts?.box5_yellow_count) ? "yellow" : "transparent",color: isYellowActive(yellowCounts?.box5_yellow_count)
      ? "black"
      : undefined }}>
      {yellowCounts?.box5_yellow_count ?? 0}</td>
         
            <td  id='bs_4_2_12' colSpan={2} style={{ backgroundColor: isYellowActive(yellowCounts?.box6_yellow_count) ? "yellow" : "transparent",color: isYellowActive(yellowCounts?.box6_yellow_count)
      ? "black"
      : undefined }}>
      {yellowCounts?.box6_yellow_count ?? 0}</td>
         
            <td  id='bs_4_2_14' colSpan={2} style={{ backgroundColor: isYellowActive(yellowCounts?.box7_yellow_count) ? "yellow" : "transparent",color: isYellowActive(yellowCounts?.box7_yellow_count)
      ? "black"
      : undefined }}>
      {yellowCounts?.box7_yellow_count ?? 0}</td>
           
            <td  id='bs_4_2_16' colSpan={2} style={{ backgroundColor: isYellowActive(yellowCounts?.box8_yellow_count) ? "yellow" : "transparent",color: isYellowActive(yellowCounts?.box8_yellow_count)
      ? "black"
      : undefined }}>
      {yellowCounts?.box8_yellow_count ?? 0}</td>
           
            <td  id='bs_4_2_18' colSpan={2} style={{ backgroundColor: isYellowActive(yellowCounts?.box9_yellow_count) ? "yellow" : "transparent",color: isYellowActive(yellowCounts?.box9_yellow_count)
      ? "black"
      : undefined }}>
      {yellowCounts?.box9_yellow_count ?? 0}</td>
           
            <td  id='bs_4_2_20' colSpan={2} style={{ backgroundColor: isYellowActive(yellowCounts?.box10_yellow_count) ? "yellow" : "transparent",color: isYellowActive(yellowCounts?.box10_yellow_count)
      ? "black"
      : undefined }}>
      {yellowCounts?.box10_yellow_count ?? 0}</td>
          </tr>

           <tr id='bs_row6_1'>
            <td id='bs_6_1_1'>{mcboxes?.BOX11_M === 1 ? "M/C" : ""}</td>
            <td id='bs_6_1_2'>{mcboxes?.BOX11_C === 1 ? "C" : ""}</td>
            <td id='bs_6_1_3'>{mcboxes?.BOX12_M === 1 ? "M/C" : ""}</td>
            <td id='bs_6_1_4'>{mcboxes?.BOX12_C === 1 ? "C" : ""}</td>
            <td id='bs_6_1_5'>{mcboxes?.BOX13_M === 1 ? "M/C" : ""}</td>
            <td id='bs_6_1_6'>{mcboxes?.BOX13_C === 1 ? "C" : ""}</td>
            <td id='bs_6_1_7'>{mcboxes?.BOX14_M === 1 ? "M/C" : ""}</td>
            <td id='bs_6_1_8'>{mcboxes?.BOX14_C === 1 ? "C" : ""}</td>
            <td id='bs_6_1_9'>{mcboxes?.BOX15_M === 1 ? "M/C" : ""}</td>
            <td id='bs_6_1_10'>{mcboxes?.BOX15_C === 1 ? "C" : ""}</td>
            <td id='bs_6_1_11'>{mcboxes?.BOX16_M === 1 ? "M/C" : ""}</td>
            <td id='bs_6_1_12'>{mcboxes?.BOX16_C === 1 ? "C" : ""}</td>
            <td id='bs_6_1_13'>{mcboxes?.BOX17_M === 1 ? "M/C" : ""}</td>
            <td id='bs_6_1_14'>{mcboxes?.BOX17_C === 1 ? "C" : ""}</td>
            <td id='bs_6_1_15'>{mcboxes?.BOX18_M === 1 ? "M/C" : ""}</td>
            <td id='bs_6_1_16'>{mcboxes?.BOX18_C === 1 ? "C" : ""}</td>
            <td id='bs_6_1_17'>{mcboxes?.BOX19_M === 1 ? "M/C" : ""}</td>
            <td id='bs_6_1_18'>{mcboxes?.BOX19_C === 1 ? "C" : ""}</td>
            <td id='bs_6_1_19'>{mcboxes?.BOX20_M === 1 ? "M/C" : ""}</td>
            <td id='bs_6_1_20'>{mcboxes?.BOX20_C === 1 ? "C" : ""}</td>
          </tr>
        
         <tr id='bs_row6'>
          <td id='bs_6_1' colSpan={2}  {...getCellProps(boxes.box11_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box11_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box11_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("bs_6_1");

    setSelectMC(mcboxes.BOX11_M === 1);
    setSelectC(mcboxes.BOX11_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box11_name}</td>
          <td id='bs_6_2'  colSpan={2}  {...getCellProps(boxes.box12_color?.toString())}   style={{
    backgroundColor: getBackgroundColor(boxes.box12_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box12_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("bs_6_2");

    setSelectMC(mcboxes.BOX12_M === 1);
    setSelectC(mcboxes.BOX12_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box12_name}</td>
          <td id='bs_6_3' colSpan={2}  {...getCellProps(boxes.box13_color?.toString())}   style={{
    backgroundColor: getBackgroundColor(boxes.box13_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box13_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("bs_6_3");

    setSelectMC(mcboxes.BOX13_M === 1);
    setSelectC(mcboxes.BOX13_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box13_name}</td>
          <td id='bs_6_4'  colSpan={2}  {...getCellProps(boxes.box14_color?.toString())}   style={{
    backgroundColor: getBackgroundColor(boxes.box14_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box14_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("bs_6_4");

    setSelectMC(mcboxes.BOX14_M === 1);
    setSelectC(mcboxes.BOX14_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box14_name}</td>
          <td id='bs_6_5'  colSpan={2}   {...getCellProps(boxes.box15_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box15_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box15_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("bs_6_5");

    setSelectMC(mcboxes.BOX15_M === 1);
    setSelectC(mcboxes.BOX15_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box15_name}</td>
          <td id='bs_6_6' colSpan={2}  {...getCellProps(boxes.box16_color?.toString())}   style={{
    backgroundColor: getBackgroundColor(boxes.box16_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box16_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("bs_6_6");

    setSelectMC(mcboxes.BOX16_M === 1);
    setSelectC(mcboxes.BOX16_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box16_name}</td>
          <td id='bs_6_7'  colSpan={2}  {...getCellProps(boxes.box17_color?.toString())}   style={{
    backgroundColor: getBackgroundColor(boxes.box17_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box17_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("bs_6_7");

    setSelectMC(mcboxes.BOX17_M === 1);
    setSelectC(mcboxes.BOX17_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box17_name}</td>
          <td id='bs_6_8' colSpan={2}  {...getCellProps(boxes.box18_color?.toString())}   style={{
    backgroundColor: getBackgroundColor(boxes.box18_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box18_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("bs_6_8");

    setSelectMC(mcboxes.BOX18_M === 1);
    setSelectC(mcboxes.BOX18_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box18_name}</td>
          <td id='bs_6_9'  colSpan={2}  {...getCellProps(boxes.box19_color?.toString())}   style={{
    backgroundColor: getBackgroundColor(boxes.box19_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box19_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("bs_6_9");

    setSelectMC(mcboxes.BOX19_M === 1);
    setSelectC(mcboxes.BOX19_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box19_name}</td>
          <td id='bs_6_10' colSpan={2}   {...getCellProps(boxes.box20_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box20_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box20_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("bs_6_10");

    setSelectMC(mcboxes.BOX20_M === 1);
    setSelectC(mcboxes.BOX20_C === 1);

    setLoginOverlayVisible(true);
  }}>{boxes.box20_name}</td>
         </tr>

           <tr id='bs_row6_2'>
            <td colSpan={2} id='bs_6_2_1'></td>
            <td colSpan={2} id='bs_6_2_2'></td>
            <td colSpan={2} id='bs_6_2_3'></td>
            <td colSpan={2} id='bs_6_2_4'></td>
            <td colSpan={2} id='bs_6_2_5'></td>
            <td colSpan={2} id='bs_6_2_6'></td>
            <td colSpan={2} id='bs_6_2_7'></td>
            <td colSpan={2} id='bs_6_2_8'></td>
            <td colSpan={2} id='bs_6_2_9'></td>
            <td colSpan={2} id='bs_6_2_10'></td>
          </tr>
           <tr id='bs_row6_3'>
      
            <td  id='bs_6_3_2' colSpan={2}  style={{ backgroundColor: isYellowActive(yellowCounts?.box11_yellow_count) ? "yellow" : "transparent",color: isYellowActive(yellowCounts?.box11_yellow_count)
      ? "black"
      : undefined }}>
      {yellowCounts?.box11_yellow_count ?? 0}</td>
   
            <td  id='bs_6_3_4' colSpan={2}  style={{ backgroundColor: isYellowActive(yellowCounts?.box12_yellow_count) ? "yellow" : "transparent",color: isYellowActive(yellowCounts?.box12_yellow_count)
      ? "black"
      : undefined }}>
      {yellowCounts?.box12_yellow_count ?? 0}</td>
  
            <td  id='bs_6_3_6' colSpan={2}  style={{ backgroundColor: isYellowActive(yellowCounts?.box13_yellow_count) ? "yellow" : "transparent",color: isYellowActive(yellowCounts?.box13_yellow_count)
      ? "black"
      : undefined }}>
      {yellowCounts?.box13_yellow_count ?? 0}</td>
       
            <td  id='bs_6_3_8' colSpan={2}  style={{ backgroundColor: isYellowActive(yellowCounts?.box14_yellow_count) ? "yellow" : "transparent",color: isYellowActive(yellowCounts?.box14_yellow_count)
      ? "black"
      : undefined }}>
      {yellowCounts?.box14_yellow_count ?? 0}</td>
          
            <td  id='bs_6_3_10' colSpan={2}  style={{ backgroundColor: isYellowActive(yellowCounts?.box15_yellow_count) ? "yellow" : "transparent",color: isYellowActive(yellowCounts?.box15_yellow_count)
      ? "black"
      : undefined }}>
      {yellowCounts?.box15_yellow_count ?? 0}</td>
     
            <td  id='bs_6_3_12' colSpan={2}  style={{ backgroundColor: isYellowActive(yellowCounts?.box16_yellow_count) ? "yellow" : "transparent",color: isYellowActive(yellowCounts?.box16_yellow_count)
      ? "black"
      : undefined }}>
      {yellowCounts?.box16_yellow_count ?? 0}</td>
       
            <td  id='bs_6_3_14' colSpan={2}  style={{ backgroundColor: isYellowActive(yellowCounts?.box17_yellow_count) ? "yellow" : "transparent",color: isYellowActive(yellowCounts?.box17_yellow_count)
      ? "black"
      : undefined }}>
      {yellowCounts?.box17_yellow_count ?? 0}</td>
            
            <td  id='bs_6_3_16' colSpan={2}  style={{ backgroundColor: isYellowActive(yellowCounts?.box18_yellow_count) ? "yellow" : "transparent",color: isYellowActive(yellowCounts?.box18_yellow_count)
      ? "black"
      : undefined }}>
      {yellowCounts?.box18_yellow_count ?? 0}</td>
        
            <td  id='bs_6_3_18' colSpan={2}  style={{ backgroundColor: isYellowActive(yellowCounts?.box19_yellow_count) ? "yellow" : "transparent",color: isYellowActive(yellowCounts?.box19_yellow_count)
      ? "black"
      : undefined }}>
      {yellowCounts?.box19_yellow_count ?? 0}</td>
       
            <td  id='bs_6_3_20' colSpan={2}  style={{ backgroundColor: isYellowActive(yellowCounts?.box20_yellow_count) ? "yellow" : "transparent",color: isYellowActive(yellowCounts?.box20_yellow_count)
      ? "black"
      : undefined }}>
      {yellowCounts?.box20_yellow_count ?? 0}</td>
          </tr>
         
        <tr id='bs_row8'>
          <td id='bs_8_1' colSpan={2}  {...getCellProps(boxes.box21_color?.toString())}   style={{
    backgroundColor: getBackgroundColor(boxes.box21_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box21_color?.toString())),
  }} >{boxes.box21_name}</td>
          <td id='bs_8_2'  colSpan={2}  {...getCellProps(boxes.box22_color?.toString())}   style={{
    backgroundColor: getBackgroundColor(boxes.box22_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box22_color?.toString())),
  }} >{boxes.box22_name}</td>
          <td id='bs_8_3' colSpan={2}  {...getCellProps(boxes.box23_color?.toString())}   style={{
    backgroundColor: getBackgroundColor(boxes.box23_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box23_color?.toString())),
  }} >{boxes.box23_name}</td>
          <td id='bs_8_4' colSpan={2}  {...getCellProps(boxes.box24_color?.toString())}   style={{
    backgroundColor: getBackgroundColor(boxes.box24_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box24_color?.toString())),
  }} >{boxes.box24_name}</td>
          <td id='bs_8_5'  colSpan={2}  {...getCellProps(boxes.box25_color?.toString())}   style={{
    backgroundColor: getBackgroundColor(boxes.box25_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box25_color?.toString())),
  }} >{boxes.box25_name}</td>
          <td id='bs_8_6' colSpan={2}  {...getCellProps(boxes.box26_color?.toString())}   style={{
    backgroundColor: getBackgroundColor(boxes.box26_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box26_color?.toString())),
  }} >{boxes.box26_name}</td>
          <td id='bs_8_7' colSpan={2}   {...getCellProps(boxes.box27_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box27_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box27_color?.toString())),
  }} >{boxes.box27_name}</td>
          <td id='bs_8_8' colSpan={2}  {...getCellProps(boxes.box28_color?.toString())}   style={{
    backgroundColor: getBackgroundColor(boxes.box28_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box28_color?.toString())),
  }} >{boxes.box28_name}</td>
          <td id='bs_8_9' colSpan={2}   {...getCellProps(boxes.box29_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box29_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box29_color?.toString())),
  }} >{boxes.box29_name}</td>
          <td id='bs_8_10' colSpan={2}  {...getCellProps(boxes.box30_color?.toString())}   style={{
    backgroundColor: getBackgroundColor(boxes.box30_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box30_color?.toString())),
  }} >{boxes.box30_name}</td>
         </tr>
         <tr id='bs_row9'>
          <td id='bs_9_1' colSpan={2}  {...getCellProps(boxes.box31_color?.toString())}   style={{
    backgroundColor: getBackgroundColor(boxes.box31_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box31_color?.toString())),
  }} >{boxes.box31_name}</td>
          <td id='bs_9_2' colSpan={2}  {...getCellProps(boxes.box32_color?.toString())}   style={{
    backgroundColor: getBackgroundColor(boxes.box32_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box32_color?.toString())),
  }} >{boxes.box32_name}</td>
          <td id='bs_9_3' colSpan={2}  {...getCellProps(boxes.box33_color?.toString())}   style={{
    backgroundColor: getBackgroundColor(boxes.box33_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box33_color?.toString())),
  }} >{boxes.box33_name}</td>
          <td id='bs_9_4'  colSpan={2}  {...getCellProps(boxes.box34_color?.toString())}   style={{
    backgroundColor: getBackgroundColor(boxes.box34_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box34_color?.toString())),
  }} >{boxes.box34_name}</td>
          <td id='bs_9_5'  colSpan={2}   {...getCellProps(boxes.box35_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box35_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box35_color?.toString())),
  }} >{boxes.box35_name}</td>
          <td id='bs_9_6' colSpan={2}   {...getCellProps(boxes.box36_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box36_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box36_color?.toString())),
  }} >{boxes.box36_name}</td>
          <td id='bs_9_7' colSpan={2}  {...getCellProps(boxes.box37_color?.toString())}   style={{
    backgroundColor: getBackgroundColor(boxes.box37_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box37_color?.toString())),
  }} >{boxes.box37_name}</td>
          <td id='bs_9_8' colSpan={2}  {...getCellProps(boxes.box38_color?.toString())}   style={{
    backgroundColor: getBackgroundColor(boxes.box38_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box38_color?.toString())),
  }} >{boxes.box38_name}</td>
          <td id='bs_9_9' colSpan={2}  {...getCellProps(boxes.box39_color?.toString())}    style={{
    backgroundColor: getBackgroundColor(boxes.box39_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box39_color?.toString())),
  }} >{boxes.box39_name}</td>
          <td id='bs_9_10' colSpan={2}  {...getCellProps(boxes.box40_color?.toString())}   style={{
    backgroundColor: getBackgroundColor(boxes.box40_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box40_color?.toString())),
  }} >{boxes.box40_name}</td>
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
    </div>
  )
}

export default App;