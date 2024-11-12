import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs/dist";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";


export async function POST(request) {
  const ticket = await request.json();

  // Get Supabase instance
  const supabase = createRouteHandlerClient({ cookies });

  // Get the currrent user session
  const { data: { session } } = await supabase.auth.getSession();

  // Insert the data
  const { data, error } = await supabase.from("tickets")
    .insert({
      ...ticket,
      user_email: session.user.email
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  } 

  return NextResponse.json({ data }, { status: 200 });
};
