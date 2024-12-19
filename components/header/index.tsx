import Search from "@/svg/search";
import User from "@/svg/user";
import React from "react";
import styles from "./styles.module.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import LogoutButton from "@/components/logoutBtn";
import { redirect } from "next/navigation";

export default async function DashboardHead() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className={styles.headContain}>
      <h2>Dashboard</h2>
      <div className={styles.formContain}>
        <input type="text" placeholder="search" /> <Search />
      </div>
      <div className={styles.User}>
        <div className={styles.userName}>
          <User />
        </div>
        <div className={styles.userTexts}>
          <h3>Welcome</h3>
          <p>{session.user?.email}</p>
        </div>
        <LogoutButton />
      </div>
    </div>
  );
}
