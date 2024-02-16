import { SignIn } from "@clerk/nextjs";
import { css } from "../../../../styled-system/css";

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
