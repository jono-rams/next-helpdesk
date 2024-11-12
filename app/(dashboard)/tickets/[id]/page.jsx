import { notFound } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs/dist";
import { cookies } from "next/headers";

// Components
import DeleteButton from "./DeleteButton";

export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const supabase = createServerComponentClient({ cookies });

  const { data: ticket } = await supabase.from("tickets")
    .select()
    .eq("id", id)
    .single();
      
  return {
    title: `Jono's Helpdesk | ${ticket?.title || 'Ticket not found'}`
  }
}

async function getTicketById(id) {
  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase.from("tickets")
    .select()
    .eq("id", id)
    .single();
  
  if (!data) {
    notFound();
  }
  
  return data;
}

export default async function TicketDetails({ params }) {
  const resolvedParams = await params;
  const ticket = await getTicketById(resolvedParams.id);

  const supabase = createServerComponentClient({ cookies });
  
  const { data } = await supabase.auth.getSession();

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
        <div className="ml-auto">
          {data.session.user.email === ticket.user_email && (
            <DeleteButton id={ticket.id} />
          )}
        </div>
      </nav>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>{ticket.priority} priority</div>
      </div>
    </main>
  )
}