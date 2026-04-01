/* eslint-disable react-hooks/exhaustive-deps */
import '../MK2/index.css';

import {
  useEffect,
  useState,
} from 'react';

import menu from '../assets/menu.gif';
import { useTheme } from '../hooks/useTheme';
import Menu from '../MK1/menu';

interface mk2Data {
  mk2_today_data: number;
  mk2_present_data: number;
  mk2_main2_actual_data: number;
  mk2_main3_actual_data: number;
  mk2_main2_oa_data: number;
  mk2_main2_stop_time_data: string;
  mk2_main2_stop_time_minutes_data: string;
  mk2_main3_oa_data: number;
  mk2_main3_np_data: number;
  mk2_main3_pf_data: number;
  mk2_main2_np_data: number;
  mk2_main2_pf_data: number;
  mk2_main3_Stop_time_data: string;
  mk2_main3_stop_time_minutes_data: string;
  mk2_over_time_data: number;
}

function App() {
    const [showMenu, setShowMenu] = useState(false);
     const [boxes, setBoxes] = useState<BoxData>({});
        const [activeType, setActiveType] = useState<"red" | "yellow" | "cumduration">("red");
        const [boxData, setBoxData] = useState<BoxData>({});
        const [data, setData] = useState<mk2Data | null>(null);
        const [, setLoading] = useState(true);
        const [overlayVisible, setOverlayVisible] = useState(false);
        const [mcboxes, setmcBoxes] = useState<BoxData>({});
        const [selectMC, setSelectMC] = useState(false);
        const [selectC, setSelectC] = useState(false);
        const [currentCellId, setCurrentCellId] = useState<string | null>(null);
      const [loginOverlayVisible, setLoginOverlayVisible] = useState(false);
      const [username, setUsername] = useState("");
      const [password, setPassword] = useState("");
    
      const [overlayUserError, setOverlayUserError] = useState(false);
      const [overlayPassError, setOverlayPassError] = useState(false);
      const [overlayErrorMsg, setOverlayErrorMsg] = useState("");
    const { theme, toggleTheme } = useTheme();

useEffect(() => { 
   const tdIds = [ 'mk2_5_1_5','mk2_5_1_7','mk2_5_1_9','mk2_5_1_11','mk2_5_1_13','mk2_5_1_15','mk2_5_1_17','mk2_5_1_19','mk2_5_1_21','mk2_5_1_23','mk2_8_1_4','mk2_8_1_6',
    'mk2_8_1_8','mk2_8_1_11','mk2_8_1_13','mk2_8_1_15','mk2_row11_1_2','mk2_row11_1_4','mk2_row11_1_6','mk2_row11_1_8','mk2_row11_1_10','mk2_row11_1_12','mk2_row11_1_14','mk2_row11_1_16','mk2_row11_1_18',
    'mk2_row12_2_1','mk2_row12_2_3','mk2_row12_2_5','mk2_row12_2_7','mk2_row12_2_9','mk2_row12_2_11','mk2_row12_2_13','mk2_row12_2_15','mk2_row12_2_17','mk2_row12_2_19',
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
  const tdIds = ['mk2_5_1_6','mk2_5_1_8','mk2_5_1_10','mk2_5_1_12','mk2_5_1_14','mk2_5_1_16','mk2_5_1_18','mk2_5_1_20','mk2_5_1_22','mk2_5_1_24','mk2_8_1_5','mk2_8_1_7',
    'mk2_8_1_9','mk2_8_1_12','mk2_8_1_14','mk2_8_1_16','mk2_row11_1_3','mk2_row11_1_5','mk2_row11_1_7','mk2_row11_1_9','mk2_row11_1_11','mk2_row11_1_13','mk2_row11_1_15','mk2_row11_1_17','mk2_row11_1_19',
    'mk2_row12_2_2','mk2_row12_2_4','mk2_row12_2_6','mk2_row12_2_8','mk2_row12_2_10','mk2_row12_2_12','mk2_row12_2_14','mk2_row12_2_16','mk2_row12_2_18','mk2_row12_2_20',
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
  "mk2_1_1_4": { mc: "BOX1_M", c: "BOX1_C" },
  "mk2_1_1_5": { mc: "BOX2_M", c: "BOX2_C" },
  "mk2_1_1_6": { mc: "BOX3_M", c: "BOX3_C" },
  "mk2_1_1_7": { mc: "BOX4_M", c: "BOX4_C" },
  "mk2_1_1_8": { mc: "BOX5_M", c: "BOX5_C" },
  "mk2_1_1_9": { mc: "BOX6_M", c: "BOX6_C" },
  "mk2_1_1_10": { mc: "BOX7_M", c: "BOX7_C" },
  "mk2_2_1_3": { mc: "BOX8_M", c: "BOX8_C" },
  "mk2_2_1_4": { mc: "BOX9_M", c: "BOX9_C" },
  "mk2_2_1_5": { mc: "BOX10_M", c: "BOX10_C" },
  "mk2_2_2_2": { mc: "BOX11_M", c: "BOX11_C" },
  "mk2_3_1_2": { mc: "BOX12_M", c: "BOX12_C" },
  "mk2_3_1_3": { mc: "BOX13_M", c: "BOX13_C" },
  "mk2_3_1_4": { mc: "BOX14_M", c: "BOX14_C" },
  "mk2_3_1_5": { mc: "BOX15_M", c: "BOX15_C" },
  "mk2_3_1_6": { mc: "BOX16_M", c: "BOX16_C" },
  "mk2_3_1_7": { mc: "BOX17_M", c: "BOX17_C" },
  "mk2_3_1_8": { mc: "BOX18_M", c: "BOX18_C" },
  "mk2_3_1_9": { mc: "BOX19_M", c: "BOX19_C" },
  "mk2_3_1_10": { mc: "BOX20_M", c: "BOX20_C" },
  "mk2_4_1_1": { mc: "BOX21_M", c: "BOX21_C" },
  "mk2_4_1_2": { mc: "BOX22_M", c: "BOX22_C" },
  "mk2_4_1_3": { mc: "BOX23_M", c: "BOX23_C" },
  "mk2_4_1_4": { mc: "BOX24_M", c: "BOX24_C" },
  "mk2_4_1_5": { mc: "BOX25_M", c: "BOX25_C" },
  "mk2_4_1_6": { mc: "BOX26_M", c: "BOX26_C" },
  "mk2_4_1_7": { mc: "BOX27_M", c: "BOX27_C" },
  "mk2_4_1_8": { mc: "BOX28_M", c: "BOX28_C" },
  "mk2_4_1_9": { mc: "BOX29_M", c: "BOX29_C" },
  "mk2_4_1_10": { mc: "BOX30_M", c: "BOX30_C" },
};


useEffect(() => {
  const fetchBoxes = async () => {
    let url = "";
    if (activeType === "red") url = "http://192.168.0.24:4002/api/mk2_red_time";
    if (activeType === "yellow") url = "http://192.168.0.24:4002/api/mk2_yellow_time";
    // if (activeType === "cumduration") url = "http://192.168.0.24:4002/api/mk2_boxes_cumduration";

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

const tdBoxMapping = {

  ...Object.fromEntries(
    Array.from({ length: 8 }, (_, i) => [
      `mk2_7_${i + 1}`,
      i + 1
    ])
  ),

  mk2_2_3_5: 10,
  mk2_2_3_6: 11,
  mk2_2_3_7: 12,
  mk2_2_3_8: 14,
  mk2_2_3_9: 15,
  mk2_2_3_10: 16,

  ...Object.fromEntries(
    Array.from({ length: 10 }, (_, i) => [
      `mk2_3_2_${i + 1}`,
      i + 17
    ])
  ),

  mk2_14_1: 27,
  mk2_14_2: 28,
  mk2_14_3: 29,
  mk2_14_4: 33,
  mk2_14_5: 34,
  mk2_14_6: 35,
  mk2_14_7: 36,

  mk2_row16_1: 38,
  mk2_row16_3: 43,
  mk2_row16_5: 48,
};



useEffect(() => {
  if (!boxData) return;

  const timeType = activeType === "red" ? "red" : "yellow";

  Object.entries(tdBoxMapping).forEach(([tdId, boxNumber]) => {
    const td = document.getElementById(tdId);
    if (!td) return;

    const fieldName = `box${boxNumber}_${timeType}_time`;

    const totalSeconds = Number(boxData[fieldName]) || 0;

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formatted = `${minutes
      .toString()
      .padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;

    td.textContent = formatted;

    td.style.backgroundColor = "transparent";
    td.style.border = "1px solid white";
    td.style.color = "white";
  });

}, [boxData, activeType]);

  
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
    const response = await fetch("http://192.168.0.24:4002/api/mk2_logincredentials", {
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

  const fetchBoxes = async () => {
  try {
    const res = await fetch("http://192.168.0.24:4002/api/mk2_mc");
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
  const fetchData = async () => {
    try {
      const res = await fetch("http://192.168.0.24:4002/api/mk2");
      const result = await res.json();
      setData(result);
      setLoading(false);
    } catch (err) {
      console.error("API error:", err);
      setLoading(false);
    }
  };

  fetchData();

  
  const intervalId = setInterval(fetchData, 1000);

  return () => clearInterval(intervalId);
}, []);


        interface BoxData {
  [key: string]: string | number;
}


// useEffect(() => {
//   const fetchBoxes = async () => {
//     try {
//       const res = await fetch("http://192.168.0.24:4002/api/mk2_boxes");
//       const data = await res.json();

//       setBoxes(prev => {
//         if (JSON.stringify(prev) === JSON.stringify(data)) {
//           return prev;
//         }
//         return data;
//       });

//     } catch (err) {
//       console.error("API error:", err);
//     }
//   };

//   fetchBoxes();

//   const intervalId = setInterval(fetchBoxes, 5000);

//   return () => clearInterval(intervalId);
// }, []);


  
  useEffect(() => {
    const fetchBoxes = () => {
      fetch("http://192.168.0.24:4002/api/mk2_boxes_colors")
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



  interface RedCountData {
  [key: string]: number;
}
const [redCounts, setRedCounts] = useState<RedCountData>({});

useEffect(() => {
  const fetchRedCounts = async () => {
    try {
      const res = await fetch("http://192.168.0.24:4002/api/mk2_red_count");
      const data = await res.json();

      const numericData: RedCountData = {};
      Object.keys(data).forEach((key) => {
        numericData[key] = Number(data[key]);
      });

      setRedCounts(numericData);
    } catch (err) {
      console.error("Red count error:", err);
    }
  };

  fetchRedCounts();
  const intervalId = setInterval(fetchRedCounts, 1000);
  return () => clearInterval(intervalId);
}, []);



  interface YellowCountData {
  [key: string]: number;
}

const [yellowCounts, setYellowCounts] = useState<YellowCountData>({});

useEffect(() => {
  const fetchYellowCounts = async () => {
    try {
      const res = await fetch("http://192.168.0.24:4002/api/mk2_yellow_count");
      const data = await res.json();

      const numericData: YellowCountData = {};
      Object.keys(data).forEach((key) => {
        numericData[key] = Number(data[key]);
      });

      setYellowCounts(numericData);
    } catch (err) {
      console.error("Yellow count error:", err);
    }
  };

  fetchYellowCounts();
  const intervalId = setInterval(fetchYellowCounts, 1000);

  return () => clearInterval(intervalId);
}, []);


  // const setBgColor = (id: string, value: number | string, color: string) => {
  //   const td = document.getElementById(id);
  //   if (!td) return;

  //   const numericValue = Number(value);
  //   // console.log(`ID: ${id}, value: "${value}", numericValue: ${numericValue}`);

  //  if (numericValue > 0) {
  //     td.style.backgroundColor = color;

  //     if (color === "yellow") {
  //       td.style.color = "black";
  //     } else {
  //       td.style.color = "white";
  //     }
  //   } else {
  //     td.style.backgroundColor = "transparent";
  //     td.style.color = "white";
  //   }
  // };
// const redKeyToTdId: Record<string, string> = {
//   // mk2_7_1_x series
//   box1_red_count: "mk2_7_1_5",
//   box2_red_count: "mk2_7_1_7",
//   box3_red_count: "mk2_7_1_9",
//   box4_red_count: "mk2_7_1_11",
//   box5_red_count: "mk2_7_1_13",
//   box6_red_count: "mk2_7_1_15",
//   box7_red_count: "mk2_7_1_17",
//   box8_red_count: "mk2_7_1_19",

//   // mk2_row_11_x series
//   box9_red_count: "mk2_row_11_6",
//   box10_red_count: "mk2_row_11_8",
//   box11_red_count: "mk2_row_11_10",
//   box12_red_count: "mk2_row_11_12",
//   box13_red_count: "mk2_row_11_14",
//   box14_red_count: "mk2_row_11_16",

//   // mk2_12_1_x series
//   box15_red_count: "mk2_12_1_1",
//   box16_red_count: "mk2_12_1_3",
//   box17_red_count: "mk2_12_1_5",
//   box18_red_count: "mk2_12_1_7",
//   box19_red_count: "mk2_12_1_9",
//   box20_red_count: "mk2_12_1_11",
//   box21_red_count: "mk2_12_1_13",
//   box22_red_count: "mk2_12_1_15",
//   box23_red_count: "mk2_12_1_17",
//   box24_red_count: "mk2_12_1_19",

//   // mk2_row14_1_x series
//   box25_red_count: "mk2_row14_1_1",
//   box26_red_count: "mk2_row14_1_3",
//   box27_red_count: "mk2_row14_1_5",
//   box28_red_count: "mk2_row14_1_7",
//   box29_red_count: "mk2_row14_1_9",
//   box30_red_count: "mk2_row14_1_11",
//   box31_red_count: "mk2_row14_1_13",

//   // mk2_row19_x series
//   box38_red_count: "mk2_row19_1",
//   box43_red_count: "mk2_row19_3",
//   box48_red_count: "mk2_row19_5"
// };

// const yellowKeyToTdId: Record<string, string> = {
//   // mk2_7_1_x series
//   box1_yellow_count: "mk2_7_1_6",
//   box2_yellow_count: "mk2_7_1_8",
//   box3_yellow_count: "mk2_7_1_10",
//   box4_yellow_count: "mk2_7_1_12",
//   box5_yellow_count: "mk2_7_1_14",
//   box6_yellow_count: "mk2_7_1_16",
//   box7_yellow_count: "mk2_7_1_18",
//   box8_yellow_count: "mk2_7_1_20",

//   // mk2_row_11_x series
//   box9_yellow_count: "mk2_row_11_7",
//   box10_yellow_count: "mk2_row_11_9",
//   box11_yellow_count: "mk2_row_11_11",
//   box12_yellow_count: "mk2_row_11_13",
//   box13_yellow_count: "mk2_row_11_15",
//   box14_yellow_count: "mk2_row_11_17",

//   // mk2_12_1_x series
//   box15_yellow_count: "mk2_12_1_2",
//   box16_yellow_count: "mk2_12_1_4",
//   box17_yellow_count: "mk2_12_1_6",
//   box18_yellow_count: "mk2_12_1_8",
//   box19_yellow_count: "mk2_12_1_10",
//   box20_yellow_count: "mk2_12_1_12",
//   box21_yellow_count: "mk2_12_1_14",
//   box22_yellow_count: "mk2_12_1_16",
//   box23_yellow_count: "mk2_12_1_18",
//   box24_yellow_count: "mk2_12_1_20",

//   // mk2_row14_1_x series
//   box25_yellow_count: "mk2_row14_1_2",
//   box26_yellow_count: "mk2_row14_1_4",
//   box27_yellow_count: "mk2_row14_1_6",
//   box28_yellow_count: "mk2_row14_1_8",
//   box29_yellow_count: "mk2_row14_1_10",
//   box30_yellow_count: "mk2_row14_1_12",
//   box31_yellow_count: "mk2_row14_1_14",

//   // mk2_row19_x series
//   box38_yellow_count: "mk2_row19_2",
//   box43_yellow_count: "mk2_row19_4",
//   box48_yellow_count: "mk2_row19_6"
// };


// useEffect(() => {
// Object.entries(redCounts).forEach(([key, value]) => {
//   const tdId = redKeyToTdId[key];
//   if (tdId) setBgColor(tdId, value, "red");
// });


//  Object.entries(yellowCounts).forEach(([key, value]) => {
//   const tdId = yellowKeyToTdId[key];
//   if (tdId) setBgColor(tdId, value, "yellow");
// });

// }, [redCounts, yellowCounts]);

const getCellStyle = (value?: number, color?: "red" | "yellow") => {
  if (value && value > 0) {
    return {
      backgroundColor: color,
      color: color === "yellow" ? "black" : "white",
    };
  }

  return {
    backgroundColor: "transparent",
    color: "white",
  };
};


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
             role="presentation" tabIndex={-1} 
            onChange={() => setSelectMC(prev => !prev)}
          />
          <span>M/C</span>
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={selectC}
             role="presentation" tabIndex={-1} 
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
      await fetch("http://192.168.0.24:4002/api/mk2_update-machine-status", {
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
  id='mk2_menu'
  onMouseEnter={() => setShowMenu(true)}
  onMouseLeave={() => setShowMenu(false)}
/>
<span  id='mk2'>MK2</span>
<div id='mk2_red_yellow_knob'>
<div className={`triple-toggle ${activeType}`}>
  <div className={`triple-knob ${activeType}`} />

  <span id='red' onClick={() => setActiveType("red")}>RED</span>
  <span id='yellow' onClick={() => setActiveType("yellow")}>YELLOW</span>
</div>
</div>
</header> */}
        <table id='mk2_table1'>
          <thead><tr><th></th></tr></thead>
          <tbody>
            <tr id='mk2_row1'>
              <td  id='mk2_today'>TODAY</td>
              <td  id='mk2_present'>PRESENT</td>
              <td  id='mk2_mk3' rowSpan={2}>MK3</td>
              <td  id='mk2_actual'>ACTUAL</td>
              <td  id='mk2_stop_time'>STOP TIME</td>
              <td  id='mk2_OA'>OA</td>
              <td  id='mk2_np'>NP</td>
              <td  id='mk2_pf'>PF</td>
              <td  id='mk2_over_time'>OVER TIME</td>
              <td  id='mk2_sps' rowSpan={2} {...getCellProps(boxes.box51_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box51_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box51_color?.toString())),
  }}>
  {boxes.box51_name || ""}</td>
            </tr>
            <tr id='mk2_row2'>
              <td id='mk2_data1'>{data?.mk2_today_data ?? 0}</td>
            <td id='mk2_data2'>{data?.mk2_present_data ?? 0}</td>
            <td id='mk2_data3'>{data?.mk2_main3_actual_data ?? 0}</td>
            <td id='mk2_data4'>{data?.mk2_main3_Stop_time_data && data?.mk2_main3_stop_time_minutes_data
    ? `${data.mk2_main3_Stop_time_data}:${data.mk2_main3_stop_time_minutes_data}`
    : "0:00"}</td>
            <td id='mk2_data5'>{data?.mk2_main3_oa_data? (Number(data.mk2_main3_oa_data) / 10).toFixed(1): ""}</td>
            <td id='mk2_data6'>{data?.mk2_main3_np_data ?? 0}</td>
            <td id='mk2_data7'>{data?.mk2_main3_pf_data ?? 0}</td>
            <td id='mk2_data8'>{data?.mk2_over_time_data ?? 0}</td>
            </tr>
          </tbody>
        </table>
       

        <table id='mk2_table2'>
          <thead><tr><th></th></tr></thead>
          <tbody>
          <tr><td id='mk2_main2' colSpan={20} {...getCellProps(boxes.box49_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box49_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box49_color?.toString())),
  }}>
     <img
  src={menu}
  alt="menu"
  width="80"
  height="100"
  id='mk2_menu'
   style={{
      position: "absolute",
      zIndex: 20,
    }}
  onMouseEnter={() => setShowMenu(true)}
  onMouseLeave={() => setShowMenu(false)}
/>
  {boxes.box49_name || ""}
  <div id='mk2_red_yellow_knob'>
<div className={`triple-toggle ${activeType}`}>
  <div className={`triple-knob ${activeType}`} />

  <span id='red' role="presentation"
  tabIndex={-1} onClick={() => setActiveType("red")}>RED</span>
  <span id='yellow' role="presentation"
  tabIndex={-1} onClick={() => setActiveType("yellow")}>YELLOW</span>
  {/* <span id='cumduration' onClick={() => setActiveType("cumduration")}>DEFAULT</span> */}
</div>
</div></td></tr>
  <tr id='mk2_row5_1'>
          <td id='mk2_5_1_1' colSpan={2}></td>
          <td id='mk2_5_1_3' colSpan={2}></td>
          <td id='mk2_5_1_5' colSpan={2}></td>
          <td id='mk2_5_1_7'>{mcboxes?.BOX1_M === 1 ? "M/C" : ""}</td>
          <td id='mk2_5_1_8'>{mcboxes?.BOX1_C === 1 ? "C" : ""}</td>
          <td id='mk2_5_1_9'>{mcboxes?.BOX2_M === 1 ? "M/C" : ""}</td>
          <td id='mk2_5_1_10'>{mcboxes?.BOX2_C === 1 ? "C" : ""}</td>
          <td id='mk2_5_1_11'>{mcboxes?.BOX3_M === 1 ? "M/C" : ""}</td>
          <td id='mk2_5_1_12'>{mcboxes?.BOX3_C === 1 ? "C" : ""}</td>
          <td id='mk2_5_1_13'>{mcboxes?.BOX4_M === 1 ? "M/C" : ""}</td>
          <td id='mk2_5_1_14'>{mcboxes?.BOX4_C === 1 ? "C" : ""}</td>
          <td id='mk2_5_1_15'>{mcboxes?.BOX5_M === 1 ? "M/C" : ""}</td>
          <td id='mk2_5_1_16'>{mcboxes?.BOX6_C === 1 ? "C" : ""}</td>
          <td id='mk2_5_1_17'>{mcboxes?.BOX6_M === 1 ? "M/C" : ""}</td>
          <td id='mk2_5_1_18'>{mcboxes?.BOX6_C === 1 ? "C" : ""}</td>
          <td id='mk2_5_1_19'>{mcboxes?.BOX7_M === 1 ? "M/C" : ""}</td>
          <td id='mk2_5_1_20'>{mcboxes?.BOX7_C === 1 ? "C" : ""}</td>
         </tr>
         <tr id='mk2_row5'>
            <td id='mk2_1_1_1' colSpan={2}>ACTUAL</td>
            <td id='mk2_1_1_2' colSpan={2}>OA</td>
           <td
  id="mk2_1_1_3"
  colSpan={2}
  rowSpan={2}
  {...getCellProps(boxes.box1_color?.toString())}
  style={{
    backgroundColor: getBackgroundColor(boxes.box1_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box1_color?.toString())),
    whiteSpace: "pre-line", // ✅ ensures \n is rendered as a new line
  }}
>
  {typeof boxes.box1_name === "string"
    ? boxes.box1_name.startsWith("MID")
      ? boxes.box1_name.replace("MID", "MID\n")
      : boxes.box1_name
    : ""}
</td>
            <td id='mk2_1_1_4' colSpan={2} rowSpan={2} {...getCellProps(boxes.box2_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box2_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box2_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("mk2_1_1_4");

    setSelectMC(mcboxes.BOX1_M === 1);
    setSelectC(mcboxes.BOX1_C === 1);

    setLoginOverlayVisible(true);
  }}>
  {boxes.box2_name || ""}</td>
            <td id='mk2_1_1_5' colSpan={2} rowSpan={2} {...getCellProps(boxes.box3_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box3_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box3_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("mk2_1_1_5");

    setSelectMC(mcboxes.BOX2_M === 1);
    setSelectC(mcboxes.BOX2_C === 1);

    setLoginOverlayVisible(true);
  }}>
  {boxes.box3_name || ""}</td>
            <td id='mk2_1_1_6' colSpan={2} rowSpan={2} {...getCellProps(boxes.box4_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box4_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box4_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("mk2_1_1_6");

    setSelectMC(mcboxes.BOX3_M === 1);
    setSelectC(mcboxes.BOX3_C === 1);

    setLoginOverlayVisible(true);
  }}>
  {boxes.box4_name || ""}</td>
            <td id='mk2_1_1_7' colSpan={2} rowSpan={2} {...getCellProps(boxes.box5_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box5_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box5_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("mk2_1_1_7");

    setSelectMC(mcboxes.BOX4_M === 1);
    setSelectC(mcboxes.BOX4_C === 1);

    setLoginOverlayVisible(true);
  }}>
  {boxes.box5_name || ""}</td>
            <td id='mk2_1_1_8' colSpan={2} rowSpan={2} {...getCellProps(boxes.box6_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box6_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box6_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("mk2_1_1_8");

    setSelectMC(mcboxes.BOX5_M === 1);
    setSelectC(mcboxes.BOX5_C === 1);

    setLoginOverlayVisible(true);
  }}>
  {boxes.box6_name || ""}</td>
            <td id='mk2_1_1_9' colSpan={2} rowSpan={2} {...getCellProps(boxes.box7_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box7_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box7_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("mk2_1_1_9");

    setSelectMC(mcboxes.BOX6_M === 1);
    setSelectC(mcboxes.BOX6_C === 1);

    setLoginOverlayVisible(true);
  }}>
  {boxes.box7_name || ""}</td>
            <td id='mk2_1_1_10' colSpan={2} rowSpan={2} {...getCellProps(boxes.box8_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box8_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box8_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("mk2_1_1_10");

    setSelectMC(mcboxes.BOX7_M === 1);
    setSelectC(mcboxes.BOX7_C === 1);

    setLoginOverlayVisible(true);
  }}>
  {boxes.box8_name || ""}</td>
          </tr>

          <tr id='mk2_row6'>
            <td id='mk2_1_2_1' colSpan={2} rowSpan={3}>{data?.mk2_main2_actual_data ?? 0}</td>
            <td id="mk2_1_2_2" colSpan={2} rowSpan={3}>
  {data?.mk2_main2_oa_data
    ? (Number(data.mk2_main2_oa_data) / 10).toFixed(1)
    : ""}
</td>

          </tr>
          <tr id='mk2_row7'>
            <td id='mk2_7_1' colSpan={2}></td>
            <td id='mk2_7_2' colSpan={2}></td>
            <td id='mk2_7_3' colSpan={2}></td>
            <td id='mk2_7_4' colSpan={2}></td>
            <td id='mk2_7_5' colSpan={2}></td>
            <td id='mk2_7_6' colSpan={2}></td>
            <td id='mk2_7_7' colSpan={2}></td>
            <td id='mk2_7_8' colSpan={2}></td>
          </tr>
          <tr id='mk2_row7_1'>  
            <td id='mk2_7_1_5'  style={getCellStyle(redCounts.box1_red_count, "red")}>{redCounts.box1_red_count ?? ""}</td>
            <td id='mk2_7_1_6' style={getCellStyle(yellowCounts.box1_yellow_count, "yellow")}>{yellowCounts.box1_yellow_count ?? ""}</td>
            <td id='mk2_7_1_7'  style={getCellStyle(redCounts.box2_red_count, "red")}>{redCounts.box2_red_count ?? ""}</td>
            <td id='mk2_7_1_8' style={getCellStyle(yellowCounts.box2_yellow_count, "yellow")}>{yellowCounts.box2_yellow_count ?? ""}</td>
            <td id='mk2_7_1_9'  style={getCellStyle(redCounts.box3_red_count, "red")}>{redCounts.box3_red_count ?? ""}</td>
            <td id='mk2_7_1_10' style={getCellStyle(yellowCounts.box3_yellow_count, "yellow")}>{yellowCounts.box3_yellow_count ?? ""}</td>
            <td id='mk2_7_1_11' style={getCellStyle(redCounts.box4_red_count, "red")}>{redCounts.box4_red_count ?? ""}</td>
            <td id='mk2_7_1_12' style={getCellStyle(yellowCounts.box4_yellow_count, "yellow")}>{yellowCounts.box4_yellow_count ?? ""}</td>
            <td id='mk2_7_1_13'  style={getCellStyle(redCounts.box5_red_count, "red")}>{redCounts.box5_red_count ?? ""}</td>
            <td id='mk2_7_1_14' style={getCellStyle(yellowCounts.box5_yellow_count, "yellow")}>{yellowCounts.box5_yellow_count ?? ""}</td>
            <td id='mk2_7_1_15' style={getCellStyle(redCounts.box6_red_count, "red")}>{redCounts.box6_red_count ?? ""}</td>
            <td id='mk2_7_1_16' style={getCellStyle(yellowCounts.box6_yellow_count, "yellow")}>{yellowCounts.box6_yellow_count ?? ""}</td>
            <td id='mk2_7_1_17' style={getCellStyle(redCounts.box7_red_count, "red")}>{redCounts.box7_red_count ?? ""}</td>
            <td id='mk2_7_1_18' style={getCellStyle(yellowCounts.box7_yellow_count, "yellow")}>{yellowCounts.box7_yellow_count ?? ""}</td>
            <td id='mk2_7_1_19' style={getCellStyle(redCounts.box8_red_count, "red")}>{redCounts.box8_red_count ?? ""}</td>
            <td id='mk2_7_1_20' style={getCellStyle(yellowCounts.box8_yellow_count, "yellow")}>{yellowCounts.box8_yellow_count ?? ""}</td>
          </tr>
          <tr id='mk2_8_1'>
            <td id='mk2_8_1_1' colSpan={4}></td>
            
            <td id='mk2_8_1_3' colSpan={2}></td>
            <td id='mk2_8_1_4'>{mcboxes?.BOX8_M === 1 ? "M/C" : ""}</td>
            <td id='mk2_8_1_5'>{mcboxes?.BOX8_C === 1 ? "C" : ""}</td>
            <td id='mk2_8_1_6'>{mcboxes?.BOX9_M === 1 ? "M/C" : ""}</td>
            <td id='mk2_8_1_7'>{mcboxes?.BOX9_C === 1 ? "C" : ""}</td>
            <td id='mk2_8_1_8'>{mcboxes?.BOX10_M === 1 ? "M/C" : ""}</td>
            <td id='mk2_8_1_9'>{mcboxes?.BOX10_C === 1 ? "C" : ""}</td>
            <td id='mk2_8_1_10' colSpan={2}></td>
            <td id='mk2_8_1_11'>{mcboxes?.BOX11_M === 1 ? "M/C" : ""}</td>
            <td id='mk2_8_1_12'>{mcboxes?.BOX11_C === 1 ? "C" : ""}</td>
            <td id='mk2_8_1_13' colSpan={2}></td>
            <td id='mk2_8_1_15' colSpan={2}></td>
          </tr>

          <tr id='mk2_row8'>
            <td id='mk2_2_1_1' colSpan={4}>STOP TIME</td>
            <td
  id="mk2_2_1_2"
  rowSpan={4}
  colSpan={2}
  {...getCellProps(boxes.box9_color?.toString())}
  style={{
    backgroundColor: getBackgroundColor(boxes.box9_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box9_color?.toString())),
    whiteSpace: "pre-line", // ✅ allows \n to render as new line
  }}
>
  {typeof boxes.box9_name === "string"
    ? boxes.box9_name.startsWith("ALL")
      ? boxes.box9_name.replace("ALL", "ALL\n")
      : boxes.box9_name
    : ""}
</td>
            <td id='mk2_2_1_3' rowSpan={2} colSpan={2} {...getCellProps(boxes.box10_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box10_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box10_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("mk2_2_1_3");

    setSelectMC(mcboxes.BOX8_M === 1);
    setSelectC(mcboxes.BOX8_C === 1);

    setLoginOverlayVisible(true);
  }}>
  {boxes.box10_name || ""}</td>
            <td id='mk2_2_1_4' rowSpan={2} colSpan={2} {...getCellProps(boxes.box11_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box11_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box11_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("mk2_2_1_4");

    setSelectMC(mcboxes.BOX9_M === 1);
    setSelectC(mcboxes.BOX9_C === 1);

    setLoginOverlayVisible(true);
  }}>
  {boxes.box11_name || ""}</td>
            <td id='mk2_2_1_5' rowSpan={2} colSpan={2} {...getCellProps(boxes.box12_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box12_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box12_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("mk2_2_1_5");

    setSelectMC(mcboxes.BOX10_M === 1);
    setSelectC(mcboxes.BOX10_C === 1);

    setLoginOverlayVisible(true);
  }}>
  {boxes.box12_name || ""}</td>
           <td
  id="mk2_2_1_6"
  rowSpan={4}
  colSpan={2}
  {...getCellProps(boxes.box13_color?.toString())}
  style={{
    backgroundColor: getBackgroundColor(boxes.box13_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box13_color?.toString())),
    whiteSpace: "pre-line", // ✅ ensures \n is rendered as a new line
  }}
>
  {typeof boxes.box13_name === "string"
    ? boxes.box13_name.startsWith("MAIN2")
      ? boxes.box13_name.replace("MAIN2", "MAIN2\n")
      : boxes.box13_name
    : ""}
</td>
            <td id='mk2_2_1_7' colSpan={2} rowSpan={2} {...getCellProps(boxes.box14_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box14_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box14_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("mk2_2_2_2");

    setSelectMC(mcboxes.BOX11_M === 1);
    setSelectC(mcboxes.BOX11_C === 1);

    setLoginOverlayVisible(true);
  }}>
  {boxes.box14_name || ""}</td>
          <td
  id="mk2_2_1_8"
  colSpan={2}
  rowSpan={2}
  {...getCellProps(boxes.box15_color?.toString())}
  style={{
    backgroundColor: getBackgroundColor(boxes.box15_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box15_color?.toString())),
    whiteSpace: "pre-line", // ✅ ensures \n is rendered as a new line
  }}
>
  {typeof boxes.box15_name === "string"
    ? boxes.box15_name.startsWith("MAIN2")
      ? boxes.box15_name.replace("MAIN2", "MAIN2\n")
      : boxes.box15_name
    : ""}
</td>
           <td
  id="mk2_2_1_9"
  colSpan={2}
  rowSpan={2}
  {...getCellProps(boxes.box16_color?.toString())}
  style={{
    backgroundColor: getBackgroundColor(boxes.box16_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box16_color?.toString())),
    whiteSpace: "pre-line", // ✅ ensures \n is rendered as a new line
  }}
>
  {typeof boxes.box16_name === "string"
    ? boxes.box16_name.startsWith("MK2")
      ? boxes.box16_name.replace("MK2", "MK2\n")
      : boxes.box16_name
    : ""}
</td>
          </tr>
          <tr id='mk2_row9'>
            <td id='mk2_2_2_1' colSpan={4}>{data?.mk2_main2_stop_time_data && data?.mk2_main2_stop_time_minutes_data
    ? `${data.mk2_main2_stop_time_data}:${data.mk2_main2_stop_time_minutes_data}`
    : "0:00"}</td>
            {/* <td id='mk2_2_2_2' colSpan={2} {...getCellProps(boxes.box14_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box14_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box14_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("mk2_2_2_2");

    setSelectMC(mcboxes.BOX11_M === 1);
    setSelectC(mcboxes.BOX11_C === 1);

    setLoginOverlayVisible(true);
  }}>
  {boxes.box14_name || ""}</td> */}
          </tr>
       <tr id='mk2_row10'>
            <td id='mk2_2_3_1' rowSpan={2}>NP</td>
            <td id='mk2_2_3_2' rowSpan={2}>{data?.mk2_main2_np_data ?? 0}</td>
            <td id='mk2_2_3_3' rowSpan={2}>PF</td>
            <td id='mk2_2_3_4' rowSpan={2}>{data?.mk2_main2_pf_data ?? 0}</td>
            <td id='mk2_2_3_5' colSpan={2}></td>
            <td id='mk2_2_3_6' colSpan={2}></td>
            <td id='mk2_2_3_7' colSpan={2}></td>
            <td id='mk2_2_3_8' colSpan={2}></td>
            <td id='mk2_2_3_9' colSpan={2}></td>
            <td id='mk2_2_3_10' colSpan={2}></td>
            
          </tr>
          <tr id='mk2_row_11'>
            <td id='mk2_row_11_6' style={getCellStyle(redCounts.box10_red_count, "red")}>{redCounts.box10_red_count ?? ""}</td>
            <td id='mk2_row_11_7' style={getCellStyle(yellowCounts.box10_yellow_count, "yellow")}>{yellowCounts.box10_yellow_count ?? ""}</td>
            <td id='mk2_row_11_8' style={getCellStyle(redCounts.box11_red_count, "red")}>{redCounts.box11_red_count ?? ""}</td>
            <td id='mk2_row_11_9' style={getCellStyle(yellowCounts.box11_yellow_count, "yellow")}>{yellowCounts.box11_yellow_count ?? ""}</td>
            <td id='mk2_row_11_10' style={getCellStyle(redCounts.box12_red_count, "red")}>{redCounts.box12_red_count ?? ""}</td>
            <td id='mk2_row_11_11' style={getCellStyle(yellowCounts.box12_yellow_count, "yellow")}>{yellowCounts.box12_yellow_count ?? ""}</td>
            <td id='mk2_row_11_12' style={getCellStyle(redCounts.box14_red_count, "red")}>{redCounts.box14_red_count ?? ""}</td>
            <td id='mk2_row_11_13' style={getCellStyle(yellowCounts.box14_yellow_count, "yellow")}>{yellowCounts.box14_yellow_count ?? ""}</td>
            <td id='mk2_row_11_14' style={getCellStyle(redCounts.box15_red_count, "red")}>{redCounts.box15_red_count ?? ""}</td>
            <td id='mk2_row_11_15' style={getCellStyle(yellowCounts.box15_yellow_count, "yellow")}>{yellowCounts.box15_yellow_count ?? ""}</td>
            <td id='mk2_row_11_16' style={getCellStyle(redCounts.box16_red_count, "red")}>{redCounts.box16_red_count ?? ""}</td>
            <td id='mk2_row_11_17' style={getCellStyle(yellowCounts.box16_yellow_count, "yellow")}>{yellowCounts.box16_yellow_count ?? ""}</td> 
          </tr>
          <tr><td id='mk2_main3' colSpan={20} {...getCellProps(boxes.box50_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box50_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box50_color?.toString())),
  }}>
  {boxes.box50_name || ""}</td></tr>

  <tr id='mk2_row11_1'>
    <td id='mk2_row11_1_1' colSpan={2}></td>
    <td id='mk2_row11_1_2'>{mcboxes?.BOX12_M === 1 ? "M/C" : ""}</td>
    <td id='mk2_row11_1_3'>{mcboxes?.BOX12_C === 1 ? "C" : ""}</td>
    <td id='mk2_row11_1_4'>{mcboxes?.BOX13_M === 1 ? "M/C" : ""}</td>
    <td id='mk2_row11_1_5'>{mcboxes?.BOX13_C === 1 ? "C" : ""}</td>
    <td id='mk2_row11_1_6'>{mcboxes?.BOX14_M === 1 ? "M/C" : ""}</td>
    <td id='mk2_row11_1_7'>{mcboxes?.BOX14_C === 1 ? "C" : ""}</td>
    <td id='mk2_row11_1_8'>{mcboxes?.BOX15_M === 1 ? "M/C" : ""}</td>
    <td id='mk2_row11_1_9'>{mcboxes?.BOX15_C === 1 ? "C" : ""}</td>
    <td id='mk2_row11_1_10'>{mcboxes?.BOX16_M === 1 ? "M/C" : ""}</td>
    <td id='mk2_row11_1_11'>{mcboxes?.BOX16_C === 1 ? "C" : ""}</td>
    <td id='mk2_row11_1_12'>{mcboxes?.BOX17_M === 1 ? "M/C" : ""}</td>
    <td id='mk2_row11_1_13'>{mcboxes?.BOX17_C === 1 ? "C" : ""}</td>
    <td id='mk2_row11_1_14'>{mcboxes?.BOX18_M === 1 ? "M/C" : ""}</td>
    <td id='mk2_row11_1_15'>{mcboxes?.BOX18_C === 1 ? "C" : ""}</td>
    <td id='mk2_row11_1_16'>{mcboxes?.BOX19_M === 1 ? "M/C" : ""}</td>
    <td id='mk2_row11_1_17'>{mcboxes?.BOX19_C === 1 ? "C" : ""}</td>
    <td id='mk2_row11_1_18'>{mcboxes?.BOX20_M === 1 ? "M/C" : ""}</td>
    <td id='mk2_row11_1_19'>{mcboxes?.BOX20_C === 1 ? "C" : ""}</td>

  </tr>
          <tr id='mk2_row11'>
           <td
  id="mk2_3_1_1"
  colSpan={2}
  {...getCellProps(boxes.box17_color?.toString())}
  style={{
    backgroundColor: getBackgroundColor(boxes.box17_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box17_color?.toString())),
    whiteSpace: "pre-line", // ✅ ensures \n is rendered as a new line
  }}
>
  {typeof boxes.box17_name === "string"
    ? boxes.box17_name.startsWith("MAIN2")
      ? boxes.box17_name.replace("MAIN2", "MAIN2\n")
      : boxes.box17_name
    : ""}
</td>
            <td id='mk2_3_1_2'  colSpan={2} {...getCellProps(boxes.box18_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box18_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box18_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("mk2_3_1_2");

    setSelectMC(mcboxes.BOX12_M === 1);
    setSelectC(mcboxes.BOX12_C === 1);

    setLoginOverlayVisible(true);
  }}>
  {boxes.box18_name || ""}</td>
            <td id='mk2_3_1_3' colSpan={2} {...getCellProps(boxes.box19_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box19_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box19_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("mk2_3_1_3");

    setSelectMC(mcboxes.BOX13_M === 1);
    setSelectC(mcboxes.BOX13_C === 1);

    setLoginOverlayVisible(true);
  }}>
  {boxes.box19_name || ""}</td>
            <td id='mk2_3_1_4' colSpan={2} {...getCellProps(boxes.box20_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box20_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box20_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("mk2_3_1_4");

    setSelectMC(mcboxes.BOX14_M === 1);
    setSelectC(mcboxes.BOX14_C === 1);

    setLoginOverlayVisible(true);
  }}>
  {boxes.box20_name || ""}</td>
            <td id='mk2_3_1_5' colSpan={2} {...getCellProps(boxes.box21_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box21_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box21_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("mk2_3_1_5");

    setSelectMC(mcboxes.BOX15_M === 1);
    setSelectC(mcboxes.BOX15_C === 1);

    setLoginOverlayVisible(true);
  }}>
  {boxes.box21_name || ""}</td>
            <td id='mk2_3_1_6' colSpan={2} {...getCellProps(boxes.box22_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box22_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box22_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("mk2_3_1_6");

    setSelectMC(mcboxes.BOX16_M === 1);
    setSelectC(mcboxes.BOX16_C === 1);

    setLoginOverlayVisible(true);
  }}>
  {boxes.box22_name || ""}</td>
            <td id='mk2_3_1_7' colSpan={2} {...getCellProps(boxes.box23_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box23_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box23_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("mk2_3_1_7");

    setSelectMC(mcboxes.BOX17_M === 1);
    setSelectC(mcboxes.BOX17_C === 1);

    setLoginOverlayVisible(true);
  }}>
  {boxes.box23_name || ""}</td>
            <td id='mk2_3_1_8' colSpan={2} {...getCellProps(boxes.box24_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box24_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box24_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("mk2_3_1_8");

    setSelectMC(mcboxes.BOX18_M === 1);
    setSelectC(mcboxes.BOX18_C === 1);

    setLoginOverlayVisible(true);
  }}>
  {boxes.box24_name || ""}</td>
            <td id='mk2_3_1_9' colSpan={2} {...getCellProps(boxes.box25_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box25_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box25_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("mk2_3_1_9");

    setSelectMC(mcboxes.BOX19_M === 1);
    setSelectC(mcboxes.BOX19_C === 1);

    setLoginOverlayVisible(true);
  }}>
  {boxes.box25_name || ""}</td>
            <td id='mk2_3_1_10' colSpan={2} {...getCellProps(boxes.box26_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box26_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box26_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("mk2_3_1_10");


    setSelectMC(mcboxes.BOX20_M === 1);
    setSelectC(mcboxes.BOX20_C === 1);


    setLoginOverlayVisible(true);
  }}>
  {boxes.box26_name || ""}</td>
          </tr>
          <tr id='mk2_row12'>
            <td id='mk2_3_2_1' colSpan={2} ></td>
            <td id='mk2_3_2_2' colSpan={2} ></td>
            <td id='mk2_3_2_3' colSpan={2}></td>
            <td id='mk2_3_2_4' colSpan={2}></td>
            <td id='mk2_3_2_5' colSpan={2}></td>
            <td id='mk2_3_2_6' colSpan={2}></td>
            <td id='mk2_3_2_7' colSpan={2}></td>
            <td id='mk2_3_2_8' colSpan={2}></td>
            <td id='mk2_3_2_9' colSpan={2}></td>
            <td id='mk2_3_2_10' colSpan={2}></td>
          </tr>
           <tr id='mk2_row12_1'>
            <td id='mk2_12_1_1' style={getCellStyle(redCounts.box17_red_count, "red")}>{redCounts.box17_red_count ?? ""}</td>
            <td id='mk2_12_1_2' style={getCellStyle(yellowCounts.box17_yellow_count, "yellow")}>{yellowCounts.box17_yellow_count ?? ""}</td>
            <td id='mk2_12_1_3' style={getCellStyle(redCounts.box18_red_count, "red")}>{redCounts.box18_red_count ?? ""}</td>
            <td id='mk2_12_1_4' style={getCellStyle(yellowCounts.box18_yellow_count, "yellow")}>{yellowCounts.box18_yellow_count ?? ""}</td>
            <td id='mk2_12_1_5' style={getCellStyle(redCounts.box19_red_count, "red")}>{redCounts.box19_red_count ?? ""}</td>
            <td id='mk2_12_1_6' style={getCellStyle(yellowCounts.box19_yellow_count, "yellow")}>{yellowCounts.box19_yellow_count ?? ""}</td>
            <td id='mk2_12_1_7' style={getCellStyle(redCounts.box20_red_count, "red")}>{redCounts.box20_red_count ?? ""}</td>
            <td id='mk2_12_1_8' style={getCellStyle(yellowCounts.box20_yellow_count, "yellow")}>{yellowCounts.box20_yellow_count ?? ""}</td>
            <td id='mk2_12_1_9' style={getCellStyle(redCounts.box21_red_count, "red")}>{redCounts.box21_red_count ?? ""}</td>
            <td id='mk2_12_1_10' style={getCellStyle(yellowCounts.box21_yellow_count, "yellow")}>{yellowCounts.box21_yellow_count ?? ""}</td>
            <td id='mk2_12_1_11' style={getCellStyle(redCounts.box22_red_count, "red")}>{redCounts.box22_red_count ?? ""}</td>
            <td id='mk2_12_1_12' style={getCellStyle(yellowCounts.box22_yellow_count, "yellow")}>{yellowCounts.box22_yellow_count ?? ""}</td>
            <td id='mk2_12_1_13' style={getCellStyle(redCounts.box23_red_count, "red")}>{redCounts.box23_red_count ?? ""}</td>
            <td id='mk2_12_1_14' style={getCellStyle(yellowCounts.box23_yellow_count, "yellow")}>{yellowCounts.box23_yellow_count ?? ""}</td>
            <td id='mk2_12_1_15' style={getCellStyle(redCounts.box24_red_count, "red")}>{redCounts.box24_red_count ?? ""}</td>
            <td id='mk2_12_1_16' style={getCellStyle(yellowCounts.box24_yellow_count, "yellow")}>{yellowCounts.box24_yellow_count ?? ""}</td>
            <td id='mk2_12_1_17' style={getCellStyle(redCounts.box25_red_count, "red")}>{redCounts.box25_red_count ?? ""}</td>
            <td id='mk2_12_1_18' style={getCellStyle(yellowCounts.box25_yellow_count, "yellow")}>{yellowCounts.box25_yellow_count ?? ""}</td>
            <td id='mk2_12_1_19' style={getCellStyle(redCounts.box26_red_count, "red")}>{redCounts.box26_red_count ?? ""}</td>
            <td id='mk2_12_1_20' style={getCellStyle(yellowCounts.box26_yellow_count, "yellow")}>{yellowCounts.box26_yellow_count ?? ""}</td>
          </tr>
          <tr id='mk2_row12_2'>
            <td id='mk2_row12_2_1'>{mcboxes?.BOX21_M === 1 ? "M/C" : ""}</td>
            <td id='mk2_row12_2_2'>{mcboxes?.BOX21_C === 1 ? "C" : ""}</td>
            <td id='mk2_row12_2_3'>{mcboxes?.BOX22_M === 1 ? "M/C" : ""}</td>
            <td id='mk2_row12_2_4'>{mcboxes?.BOX22_C === 1 ? "C" : ""}</td>
            <td id='mk2_row12_2_5'>{mcboxes?.BOX23_M === 1 ? "M/C" : ""}</td>
            <td id='mk2_row12_2_6'>{mcboxes?.BOX23_C === 1 ? "C" : ""}</td>
            <td id='mk2_row12_2_7'>{mcboxes?.BOX24_M === 1 ? "M/C" : ""}</td>
            <td id='mk2_row12_2_8'>{mcboxes?.BOX24_C === 1 ? "C" : ""}</td>
            <td id='mk2_row12_2_9'>{mcboxes?.BOX25_M === 1 ? "M/C" : ""}</td>
            <td id='mk2_row12_2_10'>{mcboxes?.BOX25_C === 1 ? "C" : ""}</td>
            <td id='mk2_row12_2_11'>{mcboxes?.BOX26_M === 1 ? "M/C" : ""}</td>
            <td id='mk2_row12_2_12'>{mcboxes?.BOX26_C === 1 ? "C" : ""}</td>
            <td id='mk2_row12_2_13'>{mcboxes?.BOX27_M === 1 ? "M/C" : ""}</td>
            <td id='mk2_row12_2_14'>{mcboxes?.BOX27_C === 1 ? "C" : ""}</td>
            <td id='mk2_row12_2_15'>{mcboxes?.BOX28_M === 1 ? "M/C" : ""}</td>
            <td id='mk2_row12_2_16'>{mcboxes?.BOX28_C === 1 ? "C" : ""}</td>
            <td id='mk2_row12_2_17'>{mcboxes?.BOX29_M === 1 ? "M/C" : ""}</td>
            <td id='mk2_row12_2_18'>{mcboxes?.BOX29_C === 1 ? "C" : ""}</td>
            <td id='mk2_row12_2_19'>{mcboxes?.BOX30_M === 1 ? "M/C" : ""}</td>
            <td id='mk2_row12_2_20'>{mcboxes?.BOX30_C === 1 ? "C" : ""}</td>
            
          </tr>
          <tr id='mk2_row13'>
            <td  id='mk2_4_1_1' colSpan={2} {...getCellProps(boxes.box27_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box27_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box27_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("mk2_4_1_1");

    setSelectMC(mcboxes.BOX21_M === 1);
    setSelectC(mcboxes.BOX21_C === 1);

    setLoginOverlayVisible(true);
  }}>
  {boxes.box27_name || ""}</td>
            <td  id='mk2_4_1_2' colSpan={2} {...getCellProps(boxes.box28_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box28_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box28_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("mk2_4_1_2");

    setSelectMC(mcboxes.BOX22_M === 1);
    setSelectC(mcboxes.BOX22_C === 1);

    setLoginOverlayVisible(true);
  }}>
  {boxes.box28_name || ""}</td>
            <td  id='mk2_4_1_3' colSpan={2} {...getCellProps(boxes.box29_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box29_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box29_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("mk2_4_1_3");

    setSelectMC(mcboxes.BOX23_M === 1);
    setSelectC(mcboxes.BOX23_C === 1);

    setLoginOverlayVisible(true);
  }}>
  {boxes.box29_name || ""}</td>
            <td  id='mk2_4_1_4' rowSpan={3} colSpan={2} {...getCellProps(boxes.box30_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box30_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box30_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("mk2_4_1_4");

    setSelectMC(mcboxes.BOX24_M === 1);
    setSelectC(mcboxes.BOX24_C === 1);

    setLoginOverlayVisible(true);
  }}>
  {boxes.box30_name || ""}</td>
            <td  id='mk2_4_1_5' rowSpan={3} colSpan={2} {...getCellProps(boxes.box31_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box31_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box31_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("mk2_4_1_5");

    setSelectMC(mcboxes.BOX25_M === 1);
    setSelectC(mcboxes.BOX25_C === 1);

    setLoginOverlayVisible(true);
  }}>
  {boxes.box31_name || ""}</td>
            <td  id='mk2_4_1_6' rowSpan={3} colSpan={2} {...getCellProps(boxes.box32_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box32_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box32_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("mk2_4_1_6");

    setSelectMC(mcboxes.BOX26_M === 1);
    setSelectC(mcboxes.BOX26_C === 1);

    setLoginOverlayVisible(true);
  }}>
  {boxes.box32_name || ""}</td>
           <td
  id="mk2_4_1_7"
  colSpan={2}
  {...getCellProps(boxes.box33_color?.toString())}
  style={{
    backgroundColor: getBackgroundColor(boxes.box33_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box33_color?.toString())),
    whiteSpace: "pre-line", // ✅ ensures \n is rendered as a new line
  }}
>
  {typeof boxes.box33_name === "string"
    ? boxes.box33_name.startsWith("MAIN3")
      ? boxes.box33_name.replace("MAIN3", "MAIN3\n")
      : boxes.box33_name
    : ""}
</td>
            <td  id='mk2_4_1_8' colSpan={2} {...getCellProps(boxes.box34_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box34_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box34_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("mk2_4_1_8");

    setSelectMC(mcboxes.BOX27_M === 1);
    setSelectC(mcboxes.BOX27_C === 1);

    setLoginOverlayVisible(true);
  }}>
  {boxes.box34_name || ""}</td>
            <td  id='mk2_4_1_9' colSpan={2} {...getCellProps(boxes.box35_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box35_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box35_color?.toString())),
  }} onClick={() => {
    setCurrentCellId("mk2_4_1_9");

    setSelectMC(mcboxes.BOX28_M === 1);
    setSelectC(mcboxes.BOX28_C === 1);

    setLoginOverlayVisible(true);
  }}>
  {boxes.box35_name || ""}</td>
         <td
  id="mk2_4_1_10"
  colSpan={2}
  {...getCellProps(boxes.box36_color?.toString())}
  style={{
    backgroundColor: getBackgroundColor(boxes.box36_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box36_color?.toString())),
    whiteSpace: "pre-line", // ✅ renders \n as a new line
  }}
>
  {typeof boxes.box36_name === "string"
    ? boxes.box36_name.startsWith("MAIN3")
      ? boxes.box36_name.replace("MAIN3", "MAIN3\n")
      : boxes.box36_name
    : ""}
</td>
          </tr>
          <tr id='mk2_row14'>
            <td id='mk2_14_1' colSpan={2}></td>
            <td id='mk2_14_2' colSpan={2}></td>
            <td id='mk2_14_3' colSpan={2}></td>
            <td id='mk2_14_4' colSpan={2}></td>
            <td id='mk2_14_5' colSpan={2}></td>
            <td id='mk2_14_6' colSpan={2}></td>
            <td id='mk2_14_7' colSpan={2}></td>
          </tr>
          <tr id='mk2_row14_1'>
            <td id='mk2_row14_1_1' style={getCellStyle(redCounts.box27_red_count, "red")}>{redCounts.box27_red_count ?? ""}</td>
            <td id='mk2_row14_1_2' style={getCellStyle(yellowCounts.box27_yellow_count, "yellow")}>{yellowCounts.box27_yellow_count ?? ""}</td>
            <td id='mk2_row14_1_3' style={getCellStyle(redCounts.box28_red_count, "red")}>{redCounts.box28_red_count ?? ""}</td>
            <td id='mk2_row14_1_4' style={getCellStyle(yellowCounts.box28_yellow_count, "yellow")}>{yellowCounts.box28_yellow_count ?? ""}</td>
            <td id='mk2_row14_1_5' style={getCellStyle(redCounts.box29_red_count, "red")}>{redCounts.box29_red_count ?? ""}</td>
            <td id='mk2_row14_1_6' style={getCellStyle(yellowCounts.box29_yellow_count, "yellow")}>{yellowCounts.box29_yellow_count ?? ""}</td>
            <td id='mk2_row14_1_7' style={getCellStyle(redCounts.box33_red_count, "red")}>{redCounts.box33_red_count ?? ""}</td>
            <td id='mk2_row14_1_8' style={getCellStyle(yellowCounts.box33_yellow_count, "yellow")}>{yellowCounts.box33_yellow_count ?? ""}</td>
            <td id='mk2_row14_1_9' style={getCellStyle(redCounts.box34_red_count, "red")}>{redCounts.box34_red_count ?? ""}</td>
            <td id='mk2_row14_1_10' style={getCellStyle(yellowCounts.box34_yellow_count, "yellow")}>{yellowCounts.box34_yellow_count ?? ""}</td>
            <td id='mk2_row14_1_11' style={getCellStyle(redCounts.box35_red_count, "red")}>{redCounts.box35_red_count ?? ""}</td>
            <td id='mk2_row14_1_12' style={getCellStyle(yellowCounts.box35_yellow_count, "yellow")}>{yellowCounts.box35_yellow_count ?? ""}</td>
            <td id='mk2_row14_1_13' style={getCellStyle(redCounts.box36_red_count, "red")}>{redCounts.box36_red_count ?? ""}</td>
            <td id='mk2_row14_1_14' style={getCellStyle(yellowCounts.box36_yellow_count, "yellow")}>{yellowCounts.box36_yellow_count ?? ""}</td>
           
          </tr>
           <tr id='mk2_row15'>
           <td
  id="mk2_6_1_1"
  colSpan={2}
  rowSpan={3}
  {...getCellProps(boxes.box37_color?.toString())}
  style={{
    backgroundColor: getBackgroundColor(boxes.box37_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box37_color?.toString())),
    whiteSpace: "pre-line", // ✅ ensures \n renders as a new line
  }}
>
  {typeof boxes.box37_name === "string"
    ? boxes.box37_name.startsWith("MAIN3")
      ? boxes.box37_name.replace("MAIN3", "MAIN3\n")
      : boxes.box37_name
    : ""}
</td>
            <td id='mk2_6_1_2'  colSpan={2}  {...getCellProps(boxes.box38_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box38_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box38_color?.toString())),
  }}>
  {boxes.box38_name || ""}</td>
            <td id='mk2_6_1_3' colSpan={2}  {...getCellProps(boxes.box39_color?.toString())} style={{
    backgroundColor: getBackgroundColor(boxes.box39_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box39_color?.toString())),
  }}>
  {boxes.box39_name || ""}</td>
           <td
  id="mk2_6_1_4"
  colSpan={2}
  rowSpan={3}
  {...getCellProps(boxes.box41_color?.toString())}
  style={{
    backgroundColor: getBackgroundColor(boxes.box41_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box41_color?.toString())),
    whiteSpace: "pre-line", // ✅ allows \n to render as new line
  }}
>
  {typeof boxes.box41_name === "string"
    ? boxes.box41_name.startsWith("MK1")
      ? boxes.box41_name.replace("MK1", "MK1\n")
      : boxes.box41_name
    : ""}
</td>

<td
  id="mk2_6_1_5"
  colSpan={2}
  rowSpan={3}
  {...getCellProps(boxes.box42_color?.toString())}
  style={{
    backgroundColor: getBackgroundColor(boxes.box42_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box42_color?.toString())),
    whiteSpace: "pre-line", // ✅ allows \n to render as new line
  }}
>
  {typeof boxes.box42_name === "string"
    ? boxes.box42_name.startsWith("MK3")
      ? boxes.box42_name.replace("MK3", "MK3\n")
      : boxes.box42_name
    : ""}
</td>
            <td id='mk2_6_1_6' colSpan={2} {...getCellProps(boxes.box43_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box43_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box43_color?.toString())),
  }}>
  {boxes.box43_name || ""}</td>
            <td id='mk2_6_1_7' colSpan={2} {...getCellProps(boxes.box44_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box44_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box44_color?.toString())),
  }}>
  {boxes.box44_name || ""}</td>
            <td
  id="mk2_6_1_8"
  colSpan={2}
  rowSpan={3}
  {...getCellProps(boxes.box46_color?.toString())}
  style={{
    backgroundColor: getBackgroundColor(boxes.box46_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box46_color?.toString())),
    whiteSpace: "pre-line", // ✅ allows \n to render as new line
  }}
>
  {typeof boxes.box46_name === "string"
    ? boxes.box46_name.startsWith("MK2 MK3")
      ? boxes.box46_name.replace("MK2 MK3", "MK2 MK3\n")
      : boxes.box46_name
    : ""}
</td>
            <td id='mk2_6_1_9' colSpan={2} rowSpan={3}  {...getCellProps(boxes.box47_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box47_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box47_color?.toString())),
  }}>
  {boxes.box47_name || ""}</td>
           <td
  id="mk2_6_1_10"
  colSpan={2}
  rowSpan={1}
  {...getCellProps(boxes.box48_color?.toString())}
  style={{
    backgroundColor: getBackgroundColor(boxes.box48_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box48_color?.toString())),
    whiteSpace: "pre-line", // ✅ allows \n to render as new line
  }}
>
  {typeof boxes.box48_name === "string"
    ? boxes.box48_name.startsWith("MK3")
      ? boxes.box48_name.replace("MK3", "MK3\n")
      : boxes.box48_name
    : ""}
</td>
          </tr>
          <tr id='mk2_row16'>
            <td colSpan={2} id='mk2_row16_1'></td>
            <td colSpan={2} rowSpan={2} id='mk2_row16_2'  {...getCellProps(boxes.box40_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box40_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box40_color?.toString())),
  }}>
  {boxes.box40_name || ""}</td>
            <td colSpan={2} id='mk2_row16_3'></td>
            <td colSpan={2} rowSpan={2} id='mk2_row16_4'  {...getCellProps(boxes.box45_color?.toString())}  style={{
    backgroundColor: getBackgroundColor(boxes.box45_color?.toString()),
    color: getTextColor(getBackgroundColor(boxes.box45_color?.toString())),
  }}>
  {boxes.box45_name || ""}</td>
   <td colSpan={2} id='mk2_row16_5'></td>
          </tr>
          <tr id='mk2_row19'>
            <td id='mk2_row19_1' style={getCellStyle(redCounts.box38_red_count, "red")}>{redCounts.box38_red_count ?? ""}</td>
            <td id='mk2_row19_2' style={getCellStyle(yellowCounts.box38_yellow_count, "yellow")}>{yellowCounts.box38_yellow_count ?? ""}</td>
            <td id='mk2_row19_3' style={getCellStyle(redCounts.box43_red_count, "red")}>{redCounts.box43_red_count ?? ""}</td>
            <td id='mk2_row19_4' style={getCellStyle(yellowCounts.box43_yellow_count, "yellow")}>{yellowCounts.box43_yellow_count ?? ""}</td>
            <td id='mk2_row19_5' style={getCellStyle(redCounts.box48_red_count, "red")}>{redCounts.box48_red_count ?? ""}</td>
            <td id='mk2_row19_6' style={getCellStyle(yellowCounts.box48_yellow_count, "yellow")}>{yellowCounts.box48_yellow_count ?? ""}</td>
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