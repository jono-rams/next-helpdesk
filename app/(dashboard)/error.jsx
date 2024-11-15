"use client"

export default function Error({ error, reset }) {
  return (
    <main className="text-center">
      <h2 className="text-4xl">Oh No!</h2>
      <p>{error.message}</p>
      <button onClick={reset} className="mx-auto my-4 btn-primary">
        Maybe try again?
      </button>
    </main>
  )
}