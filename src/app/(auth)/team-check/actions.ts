"use server";

import { redirect } from "next/navigation";

export async function checkResult(data: FormData) {
	console.log(data.get("paste"));
	return redirect("./team-check/result");
}
