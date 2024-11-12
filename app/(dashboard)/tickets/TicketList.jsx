import { createServerComponentClient } from "@supabase/auth-helpers-nextjs/dist";
import { cookies } from "next/headers";
import Link from "next/link";

async function getTickets() {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase.from("tickets")
    .select()
    .order("created_at", { ascending: true });

    if (error) {
      console.error(error.message);
    }

    return data;
}

export default async function TicketList() {
  const tickets = await getTickets();

  return (
    <>
      {tickets.map((ticket) => (
        <div key={ticket.id} className="my-5 card">
          <Link href={`/tickets/${ticket.id}`}>
            <h3>{ticket.title}</h3>
            <p>{ticket.body.slice(0, 200)}</p>
            <div className={`pill ${ticket.priority}`}>
              {ticket.priority} priority
            </div>
          </Link>
        </div>
      ))}
      {tickets.length === 0 && (
        <p className="text-center">There are no open tickets, yay!</p>
      )}
    </>
  );
}
