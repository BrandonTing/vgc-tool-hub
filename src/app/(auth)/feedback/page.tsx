import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { currentUser } from "@clerk/nextjs";
import { FeedBackForm } from "./form";

export default async function Page() {
	const user = await currentUser();
	if (!user) {
		return null;
	}
	return (
		<Card>
			<CardHeader>
				<CardTitle>意見回饋</CardTitle>
				<CardDescription>
					歡迎留下任何意見，包含既有功能或期待的新功能
				</CardDescription>
			</CardHeader>
			<CardContent>
				<FeedBackForm userID={user?.id} />
			</CardContent>
		</Card>
	);
}
