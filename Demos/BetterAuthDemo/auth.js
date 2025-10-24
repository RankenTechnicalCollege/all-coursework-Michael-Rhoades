import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { getClient, getDatabase } from "./database.js";

const client = await getClient();
const db = await getDatabase();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client
  }),
  emailAndPassword: {
    enabled: true,
  },
  session: {
    enabled: true,
    maxAge: 60 * 60
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
      },
      profile: {
        type: "object",
        required: false,
      },
      createdAt: {
        type: "date",
        required: false,
      },
    }
  }
});

export default auth;