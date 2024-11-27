"use client";
import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import SignupForm from "../signupForm";

const SignupComp = () => {
  return (
    <div className={styles.pgContain}>
      <div className={styles.colOne}>
        <div className={styles.section}>
          <h1>Sign up to your account</h1>
          <p>Enter your email address and password to Sign Up</p>
          <SignupForm />
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

export default SignupComp;
