import {  useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [ isMenuOpen, setIsMenuOpen ] = useState(false);
  const token = window.localStorage.access_token;
  console.log(token);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="header-master">
      <div className={`menu-icon ${isMenuOpen ? "open" : ""}`} onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <ul className={`nav-list ${isMenuOpen ? "open" : ""}`}>
        <img
          className="logo"
          src={require("../../../assets/logo-musify.png")}
          alt="logo-musify"
        />
      {!token && (
        <>
        <li className="pages">
          <Link to="/login">Login</Link>
        </li>
        </>
      )}
      {token && (
        <>
        <div className="li-list">
          <li className="pages">
            <img
              src={require("../../../assets/home-icon.png")}
              alt="icon-home"
            />
            <Link to="/">Home</Link>
          </li>

          <li className="pages">
            <img
              src={require("../../../assets/artist-icon.png")}
              alt="icon-artists"
            />
            <Link to="/artists">Artists</Link>
          </li>

          <li className="pages">
            <img
              src={require("../../../assets/playlist-icon.png")}
              alt="icon-playlists"
            />
            <Link to="/playlists">Playlists</Link>
          </li>
          <li className="pages">
            <Link to="/logout" className="pages" onClick={handleLogout}>
              Logout
            </Link>
          </li>

        </div>
        </>
      )}
        
      

      </ul>
    </div>

  );
};

export default Header;
