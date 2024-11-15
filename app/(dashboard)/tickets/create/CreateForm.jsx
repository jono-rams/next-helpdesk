"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { addTicket } from "../actions";

export default function CreateForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [priority, setPriority] = useState("low");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const ticket = { title, body, priority };

    const res = await fetch("http://localhost:3000/api/tickets", {
      method: "POST",
      body: JSON.stringify(ticket),
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    const json = await res.json();

    if (json.error) {
      console.error(json.error.message);
    }
    else if (json.data) {
      router.refresh();
      router.push("/tickets");
    }
    
  };

  return (
    <form className="w-1/2" action={addTicket}>
      <label>
        <span>Title:</span>
        <input
          required
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </label>
      <label>
        <span>Body:</span>
        <textarea
          required
          onChange={(e) => setBody(e.target.value)}
          value={body}
        />
      </label>
      <label>
        <span>Priority:</span>
        <select onChange={(e) => setPriority(e.target.value)} value={priority}>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </label>
      <button className="btn-primary" disabled={isLoading}>
        {isLoading && <span>Adding...</span>}
        {!isLoading && <span>Add Ticket</span>}
      </button>
    </form>
  );
}
