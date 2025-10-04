import React from "react";
import NavBar from "../NavBar/NavBar";
import styles from "./Layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className={styles.layoutContainer}>
    <a href="#main-content" className={styles.skipLink}>
      Skip to main content
    </a>
    <NavBar />
    <main id="main-content" className={styles.mainContent} role="main">
      {children}
    </main>
  </div>
);

export default Layout;
