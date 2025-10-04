import React from "react";
import { observer } from "mobx-react-lite";
import NavLink from "../NavLink/NavLink";
import styles from "./NavBar.module.css";

const NavBar: React.FC = observer(() => (
  <nav className={styles.navbar}>
    <ul className={styles.menuList}>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/input">Input</NavLink>
      <NavLink to="/map">Map</NavLink>
      <NavLink to="/forecast">Forecast</NavLink>
    </ul>
  </nav>
));

export default NavBar;
