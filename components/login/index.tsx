import React from "react";
import styles from "./styles.module.css";
import LoginForm from "../loginForm";
import Image from "next/image";

const LoginComp = () => {
  return (
    <div className={styles.pgContain}>
      <div className={styles.colOne}>
        <div className={styles.section}>
          <h1>Log in to your account</h1>
          <p>Enter your email address and password to log in</p>
          <LoginForm />
        </div>
      </div>
      <div className={styles.colTwo}>
        <Image
          src="/assets/dashboard.png"
          width={630}
          height={480}
          alt="dashboard"
        />
      </div>
    </div>
  );
};

export default LoginComp;
