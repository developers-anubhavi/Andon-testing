import '../MK1/menu.css';

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
    window.open("/Login", "_blank");
    setShowSettings(true);
  };

  return (
    <div
      className="mk1_menu_overlay"
      role="presentation"
  tabIndex={-1}
      onMouseEnter={() => setShowMenu(true)}    
      onMouseLeave={() => setShowMenu(false)}  
       
    >
      <div id="mk1_menu_modal" className={showSettings ? "blur" : ""}>

        <div className="mk1_menu_content">
          <ul>
            <li id='mk1_menu1' role="presentation" tabIndex={-1}onClick={() => navigate("/")}>MK1</li>
            <li id='mk1_menu2' role="presentation" tabIndex={-1} onClick={() => navigate("/mk2_app")}>MK2</li>
            <li id='mk1_menu3' role="presentation" tabIndex={-1} onClick={() => navigate("/et_app")}>ET</li>
            <li id='mk1_menu4' role="presentation" tabIndex={-1} onClick={() => navigate("/bs_app")}>BS</li>
            <li id='mk1_menu5' role="presentation" tabIndex={-1} onClick={() => navigate("/hs_app")}>HS</li>
<li className="theme-toggle-item" onClick={toggleTheme}>
  <div className={`theme-toggle ${theme}`}>
    <span className="theme-toggle-text">
      {theme === "dark" ? "DARK" : "LIGHT"}
    </span>
    <div className={`toggle-knob ${theme}`} />
  </div>
</li>
<li>
<div id="mk1menu_tiei3" role="presentation"
  tabIndex={-1} onClick={handleGearClick}>SETTINGS</div>
</li>




          </ul>
        </div>

      </div>
    </div>
  );
};

export default Menu;