async function getTickets() {
  const res = await fetch("http://localhost:4000/tickets", {
    next: {
      revalidate: 0 // use 0 to opt out of using cache
    }
  });
  
  return res.json();
}

export default async function TicketList() {
  const tickets = await getTickets();

  return (
    <>
      {tickets.length > 0 && tickets.map((ticket) => (
        <div key={ticket.id} className="my-5 card">
          <h3>{ticket.title}</h3>
          <p>{ticket.body.slice(0, 200)}</p>
          <div className={`pill ${ticket.priority}`}>{ticket.priority} priority</div>
        </div>
      ))}
      {tickets.length === 0 && (
        <p className="text-center">There are no open tickets, yay!</p>
      )}
    </>
  )
}