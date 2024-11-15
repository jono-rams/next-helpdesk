"use client"

import { useState } from "react";

export default function AuthForm({ handleSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form onSubmit={(e) => handleSubmit(e, email, password)}>
      <label>
        <span>Email:</span>
        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>
        <span>Password:</span>
        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <button className="btn-primary">Submit</button>
    </form>
  )
}
