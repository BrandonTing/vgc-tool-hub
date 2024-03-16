import { z } from "zod";

export const formSchema = z.object({
	user: z.string(),
	context: z.string().min(1, {
		message: "請輸入你的回饋",
	}),
});

export type FormSchema = z.infer<typeof formSchema>;
