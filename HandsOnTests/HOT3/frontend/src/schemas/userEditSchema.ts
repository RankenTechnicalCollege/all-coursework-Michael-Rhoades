import { z } from "zod";

const userEditSchema = z.object({
  email: z.string().email("Invalid email address"),
  fullName: z.string().min(1, "Name is required"),
  role: z.array(z.enum(["developer", "business analyst", "quality analyst", "product manager", "technical manager", "admin", "no-permissions"])).min(1),
});

export default userEditSchema;