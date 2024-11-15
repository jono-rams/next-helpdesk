"use client"

import { experimental_useFormStatus as useFormStatus } from "react-dom";

export default function SubmitButton({ submitText, pendingText }) {
  const { pending } = useFormStatus();

  return (
    <button className="btn-primary" disabled={pending}>
      {pending && <span>{pendingText}</span>}
      {!pending && <span>{submitText}</span>}
    </button>
  )
}