"use client";
import React from "react";
import styles from "./styles.module.css";
import { meunItems } from "@/utils/data";
import { usePathname } from "next/navigation";
import Link from "next/link";

const SideBar = () => {
  const pathname = usePathname();
  return (
    <div className={styles.container}>
      <h2>TASKIFY</h2>
      <div className={styles.Menus}>
        {meunItems?.map((item, index) => {
          return (
            <Link
              href={item.link}
              key={index}
              className={pathname === item.link ? styles.active : ""}
            >
              {item.icon}

              <p>{item.title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;
