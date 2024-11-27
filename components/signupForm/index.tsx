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

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const signInResponse = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        console.log(response);

        if (signInResponse?.error) {
          setError(signInResponse.error);
        } else {
          router.push("/dashboard"); // Redirect to dashboard after successful signup and login
        }
      } else {
        setError(data.message || "Signup failed.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.contain}>
      <form className={styles.formContain} onSubmit={handleSignup}>
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

          <div className={styles.formInput2}>
            <div className={styles.lock}>
              <Lock />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.loginBtn} disabled={loading}>
          {loading ? "Creating Account..." : "Sign Up"}
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
        Already have an account?{" "}
        <span onClick={() => router.push("/login")}>Sign In</span>
      </p>
    </div>
  );
};

export default SignupForm;
