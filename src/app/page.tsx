import { Button } from "@radix-ui/themes";
import { css } from "../../styled-system/css";

export default function Home() {
	return (
		<div className={css({ fontSize: "2xl", fontWeight: "bold" })}>
			Hello 🐼!
			<Button>Let's go</Button>
		</div>
	);
}
