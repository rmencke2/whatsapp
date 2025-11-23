import { pgTable, text, varchar, uuid, timestamp, boolean, integer } from "drizzle-orm/pg-core";

export const customers = pgTable("customers", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull(),
  businessName: varchar("business_name", { length: 255 }).notNull(),
  industry: varchar("industry", { length: 100 }).notNull(),
  phoneNumber: varchar("phone_number", { length: 50 }),
  whatsappNumber: varchar("whatsapp_number", { length: 50 }).notNull(),
  plan: varchar("plan", { length: 20 }).notNull().default("starter"), // starter | pro | premium
  language: varchar("language", { length: 10 }).notNull().default("en"),
  city: varchar("city", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const faqs = pgTable("faqs", {
  id: uuid("id").defaultRandom().primaryKey(),
  customerId: uuid("customer_id").notNull().references(() => customers.id),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
});

export const services = pgTable("services", {
  id: uuid("id").defaultRandom().primaryKey(),
  customerId: uuid("customer_id").notNull().references(() => customers.id),
  name: varchar("name", { length: 255 }).notNull(),
  price: varchar("price", { length: 100 }),
  description: text("description"),
});

export const hours = pgTable("hours", {
  id: uuid("id").defaultRandom().primaryKey(),
  customerId: uuid("customer_id").notNull().references(() => customers.id),
  dayOfWeek: integer("day_of_week").notNull(), // 1 = Monday, 7 = Sunday
  openTime: varchar("open_time", { length: 10 }), // "09:00"
  closeTime: varchar("close_time", { length: 10 }), // "18:00"
  closed: boolean("closed").notNull().default(false),
});

export const agentConfigs = pgTable("agent_configs", {
  id: uuid("id").defaultRandom().primaryKey(),
  customerId: uuid("customer_id").notNull().references(() => customers.id),
  systemPrompt: text("system_prompt").notNull(),
  voiceStyle: varchar("voice_style", { length: 50 }).default("friendly"),
  bookingLink: varchar("booking_link", { length: 255 }),
  menuUrl: varchar("menu_url", { length: 255 }),
  specialInstructions: text("special_instructions"),
});
