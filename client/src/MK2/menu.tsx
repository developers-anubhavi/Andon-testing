import '../MK2/menu.css';

import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

interface MenuProps {
  setShowMenu: (value: boolean) => void;
  toggleTheme: () => void;
  theme: "dark" | "light";
} 

const Menu: React.FC<MenuProps> = ({ setShowMenu, toggleTheme, theme }) => {
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();

  const handleGearClick = () => {
    window.open("/hs_Login", "_blank");
    setShowSettings(true);
  };


  return (
    <div
      id="mk2_menu_overlay"
      role="presentation"
      tabIndex={-1}
      onMouseEnter={() => setShowMenu(true)}    
      onMouseLeave={() => setShowMenu(false)}  
      className={showSettings ? "blur" : ""} 
    >
      <div className="mk2_menu_modal">

 
       {/* <div className="mk2_menu_header">
          <span id="mk2_menu_hf">Head Firewall</span>
           <span id="mk2_menu_title">Menu</span>
        </div>  */}

 
        <div className="mk2_menu_content">
          <ul>
            <li id='mk2_menu1' onClick={() => navigate("/")}>MK1</li>
            <li id='mk2_menu2' onClick={() => navigate("/mk2_app")}>MK2</li>
            <li id='mk2_menu3' onClick={() => navigate("/et_app")}>ET</li>
            <li id='mk2_menu4' onClick={() => navigate("/bs_app")}>BS</li>
            <li id='mk2_menu5' onClick={() => navigate("/hs_app")}>HS</li>
            <li className="theme-toggle-item" onClick={toggleTheme}>
  <div className={`theme-toggle ${theme}`}>
    <span className="theme-toggle-text">
      {theme === "dark" ? "DARK" : "LIGHT"}
    </span>
    <div className={`toggle-knob ${theme}`} />
  </div>
</li>
<li>
<button id="mk2menu_tiei3" onClick={handleGearClick}>
  SETTINGS
</button>
</li>


          </ul>
        </div>

      </div>
    </div>
  );
};

export default Menu;