"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs/dist";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthForm from "../AuthForm";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (e, email, password) => {
    e.preventDefault();
    setError('');
    
    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if(error) {
      console.error(error);
      setError(error.message);
    } else {
      router.push("/");
    }
  }

  return (
    <main>
      <h2 className="text-center">Login</h2>

      <AuthForm handleSubmit={handleSubmit} />
      {error && <div className="error">{error}</div>}
    </main>
  )
}