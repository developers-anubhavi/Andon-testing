import '../BS/menu.css';

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
    window.open("/bs_Login", "_blank");
    setShowSettings(true);
  };

  return (
    <div
      id="bs_menu_overlay" className={showSettings ? "blur" : ""}
      role="presentation"
  tabIndex={-1}
      onMouseEnter={() => setShowMenu(true)}    
      onMouseLeave={() => setShowMenu(false)}   
    >
      <div className="bs_menu_modal">

        {/* HEADER */}
       {/* <div className="bs_menu_header">
          <span id="bs_menu_hf">Head Firewall</span>
           <span id="bs_menu_title">Menu</span>
        </div>  */}

        {/* CONTENT AREA */}
        <div className="bs_menu_content">
          <ul>
            <li id='bs_menu1' onClick={() => navigate("/")}>MK1</li>
            <li id='bs_menu2' onClick={() => navigate("/mk2_app")}>MK2</li>
            <li id='bs_menu3' onClick={() => navigate("/et_app")}>ET</li>
            <li id='bs_menu4' onClick={() => navigate("/bs_app")}>BS</li>
            <li id='bs_menu5' onClick={() => navigate("/hs_app")}>HS</li>
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