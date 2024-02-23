import { css } from "@/styled-system/css";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
	return (
		<div
			className={css({
				display: "flex",
				justifyContent: "center",
				paddingTop: "24",
			})}
		>
			<SignIn />
		</div>
	);
}
