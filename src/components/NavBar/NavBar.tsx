import React from "react";
import { observer } from "mobx-react-lite";
import NavLink from "../NavLink/NavLink";
import styles from "./NavBar.module.css";

const NavBar: React.FC = observer(() => (
  <nav className={styles.navbar}>
    <ul className={styles.menuList}>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/input">Search</NavLink>
      <NavLink to="/map">View Map</NavLink>
      <NavLink to="/events">Events</NavLink>
      <NavLink to="/forecast">Forecast</NavLink>
    </ul>
  </nav>
));

export default NavBar;
