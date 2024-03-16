"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createFeedback } from "./actions";
import { FormSchema, formSchema } from "./schema";

export function FeedBackForm({ userID }: { userID: string }) {
	const { toast } = useToast();

	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			user: userID,
			context: "",
		},
	});

	// 2. Define a submit handler.
	async function onSubmit(values: FormSchema) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		try {
			await createFeedback(values);
			toast({
				title: "回饋已收到！",
			});
			form.reset();
		} catch (err) {
			// handle error
			toast({
				title: "送出失敗，請稍後重試或聯繫友亮",
			});
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="user"
					render={({ field }) => (
						<FormItem hidden>
							<FormControl>
								<Input {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="context"
					render={({ field }) => (
						<FormItem>
							<FormLabel>回饋內容</FormLabel>
							<FormControl>
								<Textarea placeholder="請輸入您的回饋" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex justify-end">
					<Button type="submit">送出</Button>
				</div>
			</form>
		</Form>
	);
}
