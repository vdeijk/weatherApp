
import React from "react";
import { observer } from "mobx-react-lite";
import NavLink from "../NavLink/NavLink";
import styles from "./NavBar.module.css";
import { FaHome, FaMapMarkerAlt, FaCalendarAlt, FaMap, FaCloudSun } from "react-icons/fa";


const NavBar: React.FC = observer(() => (
  <nav className={styles.navbar} aria-label="Main navigation">
    <ul className={styles.menuList}>
  <NavLink to="/" aria-label="Home"><FaHome size={24} /></NavLink>
      <NavLink to="/input" aria-label="Location & Date"><FaCalendarAlt size={24} /></NavLink>
      <NavLink to="/map" aria-label="Map"><FaMapMarkerAlt size={24} /></NavLink>
      <NavLink to="/events" aria-label="Upcoming Events"><FaMap size={24} /></NavLink>
      <NavLink to="/forecast" aria-label="Forecast"><FaCloudSun size={24} /></NavLink>
    </ul>
  </nav>
));

export default NavBar;
