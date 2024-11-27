"use client";
import { signOut } from "next-auth/react";
import styles from "./styles.module.css";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className={styles.btn}
    >
      Logout
    </button>
  );
}
