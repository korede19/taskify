"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import styles from "./styles.module.css";
import Google from "@/svg/google";

const GoogleSignInButton = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await signIn("google", {
        redirect: false,
        callbackUrl: "/dashboard",
      });

      if (result?.error) {
        switch (result.error) {
          case "AccessDenied":
            setError("Access was denied. Please try again.");
            break;
          case "Configuration":
            setError("Authentication configuration error.");
            break;
          default:
            setError(result.error || "Google sign-in failed");
        }
        console.error("Google Sign-In Error:", result.error);
      } else if (result?.ok) {
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.error("Google Sign-In Catch Error:", error);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleGoogleSignIn}
        className={styles.loginBtn}
        disabled={loading}
      >
        <Google /> {loading ? "Signing in..." : "Sign in with Google"}
      </button>
      {error && <p className={styles.error}>{error}</p>}
    </>
  );
};

export default GoogleSignInButton;
