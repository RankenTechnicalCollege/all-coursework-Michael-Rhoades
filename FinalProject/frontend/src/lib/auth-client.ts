import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL 
    ? `${import.meta.env.VITE_API_URL}/auth` 
    : "http://localhost:3012/api/auth"
})