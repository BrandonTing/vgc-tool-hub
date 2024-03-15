import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const feedbacks = pgTable("feedback", {
	id: serial("id").primaryKey(),
	user: text("user").notNull(),
	context: text("context").notNull(),
	solved: boolean("solved").notNull().default(false),
	createdAt: timestamp("createdAt").defaultNow().notNull(),
});
