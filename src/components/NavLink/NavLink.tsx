import React from "react";
import { Link as RouterLink, useLocation, type LinkProps as RouterLinkProps } from "react-router-dom";
import styles from "./NavLink.module.css";

export interface NavLinkProps extends RouterLinkProps {
  className?: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ className, children, to, ...props }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const linkClass =
    (className ? className + " " : "") +
    styles.navLink +
    (isActive ? " " + styles.active : "");
  return (
    <li>
      <RouterLink 
        className={linkClass} 
        to={to} 
        aria-current={isActive ? "page" : undefined}
        {...props}
      >
        {children}
      </RouterLink>
    </li>
  );
};

export default NavLink;
