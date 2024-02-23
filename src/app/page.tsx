import { css } from "@/styled-system/css";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

export default function Home() {
	return (
		<div
			className={css({
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "dvh",
			})}
		>
			<Button>
				<Link href="/team-check">Team Check</Link>
			</Button>
		</div>
	);
}
