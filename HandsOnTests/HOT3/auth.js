import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { getClient, connectToDatabase } from "./database.js";

const client = await getClient();
const db = await connectToDatabase();

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:2023",
    trustedOrigins: ["http://localhost:5173", "http://localhost:2023", "http://localhost:3000"],
    database: mongodbAdapter(db, {
        client
    }),
    emailAndPassword: {
      enabled: true,
    },
    session: {
      cookieCache: true,
      maxAge: 60 * 60,
    },
    user: {
      additionalFields: {
        role: {
          type: "object",
          required: true,
        },
      }
    }
})