import { Button } from "@radix-ui/themes";
import Link from "next/link";

export default function Home() {
	return (
		<div className="flex justify-center items-center h-dvh">
			<Button>
				<Link href="/team-check">Team Check</Link>
			</Button>
		</div>
	);
}
