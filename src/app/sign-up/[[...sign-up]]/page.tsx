import { SignUp } from "@clerk/nextjs";

export default function Page() {
	return (
		<div className="flex justify-center pt-24">
			<SignUp />
		</div>
	);
}
