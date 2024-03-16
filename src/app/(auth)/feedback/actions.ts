"use server";
import { db } from "@/db";
import { feedbacks } from "@/db/schema";
import { FormSchema } from "./schema";

export async function createFeedback(value: FormSchema) {
	await db.insert(feedbacks).values(value);
}
