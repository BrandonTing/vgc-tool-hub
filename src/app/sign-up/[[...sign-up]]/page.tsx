import { css } from "@/styled-system/css";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
	return (
		<div
			className={css({
				display: "flex",
				justifyContent: "center",
				paddingTop: "24",
			})}
		>
			<SignUp />
		</div>
	);
}
