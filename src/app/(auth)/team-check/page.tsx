import { Suspense, lazy } from "react";
import RulesContainer from "./rulesContainer";
const Result = lazy(() => import("./result"));
export default function Page({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined };
}) {
	return (
		<div className="flex gap-2 w-full flex-col">
			<RulesContainer />
			{/* Result View */}
			{searchParams.pasteID ? (
				<Suspense fallback="loading...">
					<Result pasteID={searchParams.pasteID} />
				</Suspense>
			) : null}
		</div>
	);
}
