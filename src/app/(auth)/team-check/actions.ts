"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { checkResultSchema } from "./selectedContainer";

export const checkResultAction = ({
	paste,
}: z.infer<typeof checkResultSchema>) => {
	console.log(paste);
	return redirect("./team-check/result");
};
