import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar: React.FC = () => (
  <nav className={styles.navbar}>
    <ul className={styles.menuList}>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/input">Input</Link></li>
      <li><Link to="/map">Map</Link></li>
      <li><Link to="/forecast">Forecast</Link></li>
    </ul>
  </nav>
);

export default NavBar;
