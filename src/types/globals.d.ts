export {};

declare global {
	interface UseUserReturn {
		user: {
			role?: "admin" | "user";
		};
	}
}
