import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@/lib/db/schema";

const connectionString = process.env.DATABASE_URL!;
const neonInstance = neon(connectionString);

// The neon() helper returns a function-style client with a `.query` method
// available as a property on the returned value in some versions. Drizzle
// expects an object with a `query` method, so adapt the neon instance to
// always expose `query`.
const clientWrapper = ((): any => {
	if (!neonInstance) return undefined;
	// If neonInstance already has `query`, use it directly.
	if ((neonInstance as any).query) return neonInstance;
	// Otherwise, provide a `query` adapter that forwards to `neonInstance.query` or `neonInstance`'s API.
	return {
		query: (...args: any[]) => (neonInstance as any).query(...args),
		raw: neonInstance,
	};
})();

export const db = drizzle(clientWrapper as any, { schema });