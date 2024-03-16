import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { db } from "@/db";
import { feedbacks } from "@/db/schema";

async function getFeedbacks() {
	return db.select().from(feedbacks);
}

export default async function Page() {
	const feedbackLists = await getFeedbacks();

	return (
		<Table>
			<TableCaption>收到的回饋清單</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">用戶ID</TableHead>
					<TableHead>回饋內容</TableHead>
					<TableHead>建立時間</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{feedbackLists.length > 0
					? feedbackLists.map((feedback) => (
							<TableRow key={feedback.id}>
								<TableCell className="font-medium">{feedback.user}</TableCell>
								<TableCell>{feedback.context}</TableCell>
								<TableCell>{feedback.createdAt.toLocaleDateString()}</TableCell>
							</TableRow>
					  ))
					: "目前無資料"}
			</TableBody>
		</Table>
	);
}
