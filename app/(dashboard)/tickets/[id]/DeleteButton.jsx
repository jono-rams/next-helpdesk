"use client";

import { useState, useTransition } from "react";
import { TiDelete } from "react-icons/ti";
import { useRouter } from "next/navigation";
import { deleteTicket } from "../actions";

export default function DeleteButton({ id }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <button 
      className="btn-primary" 
      onClick={() => startTransition(() => deleteTicket(id))} 
      disabled={isPending}
    >
      {isPending ? (
        <>
          <TiDelete />
          Deleting...
        </>
      ) : (
        <>
          <TiDelete />
          Delete Ticket
        </>
      )}
    </button>
  );
}
