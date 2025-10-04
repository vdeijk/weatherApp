import React from "react";
import NavBar from "../NavBar/NavBar";
import styles from "./Layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className={styles.layoutContainer}>
    <NavBar />
    <main className={styles.mainContent}>{children}</main>
  </div>
);

export default Layout;
