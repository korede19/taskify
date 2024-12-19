import React from "react";
import styles from "./styles.module.css";
import SideBar from "@/components/sideBar";
import DashboardHead from "@/components/header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.pgContain}>
      <div className={styles.colOne}>
        <SideBar />
      </div>
      <div className={styles.colTwo}>
        <DashboardHead />
        {children}
      </div>
    </div>
  );
};

export default Layout;
