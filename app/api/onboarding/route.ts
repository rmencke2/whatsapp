import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { customers, faqs, services, hours, agentConfigs } from "@/db/schema";
import { supabaseServerClient } from "@/lib/supabaseClient";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const {
    businessName,
    industry,
    phoneNumber,
    whatsappNumber,
    plan,
    language,
    city,
    faqItems,
    serviceItems,
    hourItems,
    specialInstructions,
    voiceStyle,
    bookingLink,
    menuUrl,
  } = body;

  const supabase = supabaseServerClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [customer] = await db
    .insert(customers)
    .values({
      userId: user.id,
      businessName,
      industry,
      phoneNumber,
      whatsappNumber,
      plan,
      language,
      city,
    })
    .returning();

  if (faqItems?.length) {
    await db.insert(faqs).values(
      faqItems.map((f: any) => ({
        customerId: customer.id,
        question: f.question,
        answer: f.answer,
      }))
    );
  }

  if (serviceItems?.length) {
    await db.insert(services).values(
      serviceItems.map((s: any) => ({
        customerId: customer.id,
        name: s.name,
        price: s.price,
        description: s.description,
      }))
    );
  }

  if (hourItems?.length) {
    await db.insert(hours).values(
      hourItems.map((h: any) => ({
        customerId: customer.id,
        dayOfWeek: h.dayOfWeek,
        openTime: h.openTime,
        closeTime: h.closeTime,
        closed: h.closed ?? false,
      }))
    );
  }

  await db.insert(agentConfigs).values({
    customerId: customer.id,
    systemPrompt: "", // optional precompiled, or leave empty and build on the fly
    voiceStyle: voiceStyle ?? "friendly",
    bookingLink: bookingLink ?? null,
    menuUrl: menuUrl ?? null,
    specialInstructions: specialInstructions ?? "",
  });

  return NextResponse.json({ ok: true, customerId: customer.id });
}
