"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import Mail from "@/svg/mail";
import Lock from "@/svg/lock";
import Show from "@/svg/show";
import Google from "@/svg/google";
import Facebook from "@/svg/facebook";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // Prevent auto redirect for custom handling
    });

    if (result?.ok) {
      router.push("/dashboard");
    } else {
      alert("Invalid login credentials");
    }
  };

  return (
    <div className={styles.contain}>
      <form className={styles.formContain} onSubmit={handleLogin}>
        <div className={styles.formsdiv}>
          <div className={styles.formInput}>
            <Mail />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.formInput2}>
            <div className={styles.lock}>
              <Lock />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div
              onClick={() => setShowPassword(!showPassword)}
              className={styles.showToggle}
            >
              <Show />
            </div>
          </div>
        </div>
        <div
          className={styles.texts}
          onClick={() => router.push("/forgot-password")}
        >
          <p>Forgot Password?</p>
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.loginBtn} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p className={styles.otherText}>OR</p>
      <div className={styles.btnContain}>
        <button onClick={() => signIn("google")}>
          <Google /> Google
        </button>
        <button onClick={() => signIn("facebook")}>
          <Facebook /> Facebook
        </button>
      </div>
      <p className={styles.signUp}>
        Don’t have an account?{" "}
        <span onClick={() => router.push("/signup")}>Sign up</span>
      </p>
    </div>
  );
};

export default LoginForm;
