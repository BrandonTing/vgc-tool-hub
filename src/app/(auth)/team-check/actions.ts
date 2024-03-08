"use server";

import { action } from "@/lib/safe-actions";
import { redirect } from "next/navigation";
import { z } from "zod";
import { zfd } from "zod-form-data";

const schema = zfd.formData({
	paste: z
		.string()
		.url()
		.regex(/https:\/\/pokepast.es\/[a-z0-9]{1,}/),
});

export const checkResultAction = action(schema, ({ paste }) => {
	console.log(paste);
	return redirect("./team-check/result");
});
