"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    setLoading(true);
    setError("");

    try {
      const supabase = createClient();

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log("LOGIN RESULT", data, error);

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Unexpected Error");
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: 360,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <h2>ProyekHub Login</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: 10,
            border: "1px solid #ccc",
            borderRadius: 6,
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: 10,
            border: "1px solid #ccc",
            borderRadius: 6,
          }}
        />

        {error && (
          <div style={{ color: "red" }}>
            {error}
          </div>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            padding: 12,
            background: "#2563eb",
            color: "white",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </div>
    </div>
  );
}