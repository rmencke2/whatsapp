import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { customers, faqs, services, hours, agentConfigs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { generateReply } from "@/lib/openai";

/**
 * NOTE:
 * Adjust parsing depending on Twilio/360dialog payload structure.
 */
export async function POST(req: NextRequest) {
  const body = await req.json();

  const fromNumber = body.from || body.From || body.sender; // normalize
  const incomingMessage = body.text || body.Body;

  if (!fromNumber || !incomingMessage) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  // 1. Find customer by whatsappNumber
  const [customer] = await db
    .select()
    .from(customers)
    .where(eq(customers.whatsappNumber, fromNumber));

  if (!customer) {
    // If unknown, you could ignore or send default response
    return NextResponse.json({ ok: true });
  }

  // 2. Load config
  const [config] = await db
    .select()
    .from(agentConfigs)
    .where(eq(agentConfigs.customerId, customer.id));

  // 3. Load FAQs, services, hours
  const [faqList, serviceList, hoursList] = await Promise.all([
    db.select().from(faqs).where(eq(faqs.customerId, customer.id)),
    db.select().from(services).where(eq(services.customerId, customer.id)),
    db.select().from(hours).where(eq(hours.customerId, customer.id)),
  ]);

  // 4. Build context strings
  const faqString = faqList
    .map((f) => `Q: ${f.question}\nA: ${f.answer}`)
    .join("\n\n");

  const servicesString = serviceList
    .map((s) => `${s.name} - ${s.price ?? ""} ${s.description ?? ""}`)
    .join("\n");

  const hoursString = hoursList
    .map((h) => `Day ${h.dayOfWeek}: ${h.closed ? "Closed" : `${h.openTime} - ${h.closeTime}`}`)
    .join("\n");

  const systemPrompt = `
You are the WhatsApp assistant for ${customer.businessName} in ${customer.city ?? "their city"}.
Language: ${customer.language}.
Tone: ${config?.voiceStyle ?? "friendly"}.

Business Hours:
${hoursString}

Services/Menu:
${servicesString}

FAQs:
${faqString}

Special Instructions:
${config?.specialInstructions ?? ""}

When answering:
- Be short, clear, and helpful.
- Ask clarifying questions when needed.
- If you cannot answer, say you'll pass the question to a human.
  `.trim();

  const aiReply = await generateReply({
    systemPrompt,
    userMessage: incomingMessage,
  });

  // 5. Send response via WhatsApp provider API
  // TODO: call Twilio/360dialog here with aiReply

  return NextResponse.json({ ok: true });
}
