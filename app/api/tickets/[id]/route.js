import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs/dist";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function DELETE(_, { params }) {
  const id = params.id;

  const supabase = createRouteHandlerClient({ cookies });

  const { error } = await supabase.from("tickets")
    .delete()
    .eq("id", id)

  if (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }

  return NextResponse.json({ message: "Ticket deleted" }, { status: 200 });
}