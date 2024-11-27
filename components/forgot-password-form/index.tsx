"use client";

import { useState } from "react";
// import { useRouter } from "next/navigation";
import { toast } from "sonner";
import styles from "./styles.module.css";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  //   const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Password reset link sent to your email");
        // router.push("/login");
      } else {
        toast.error(data.message || "Failed to send reset link");
      }
    } catch {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.pgContain}>
      <div className={styles.Container}>
        <h2>Forgot Password</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className={styles.formContain}>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={styles.formInput}
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={styles.Btnform}
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
