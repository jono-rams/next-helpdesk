"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs/dist";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signOut();
    if(error) {
      console.error(error);
    } else {
      router.push("/login");
    }
  };

  return (
    <button className="btn-primary" onClick={handleLogout}>Logout</button>
  )
}
