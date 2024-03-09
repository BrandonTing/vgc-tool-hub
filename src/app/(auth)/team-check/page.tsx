import { Suspense } from "react";
import { Result } from "./result";
import RulesContainer from "./rulesContainer";

export default function Page() {
	return (
		<div className="flex gap-2 w-full flex-col">
			<RulesContainer />
			{/* Result View */}
			<Suspense fallback="loading...">
				<Result />
			</Suspense>
		</div>
	);
}
