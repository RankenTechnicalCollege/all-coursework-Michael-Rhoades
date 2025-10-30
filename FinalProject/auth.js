import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { getClient, connectToDatabase } from "./database.js";

const client = await getClient();
const db = await connectToDatabase();

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3012",
    trustedOrigins: ["http://localhost:5173", "http://localhost:8080","http://localhost:3012", "http://localhost:3000", "https://issuetracker-base-348399308686.us-central1.run.app"],
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
        fullName: {
          type: "string",
          required: true,
        },
        givenName: {
          type: "string",
          required: true,
        },
        familyName: {
          type: "string",
          required: true,
        },
        role: {
          type: "object",
          required: true,
        },
      }
    }
})