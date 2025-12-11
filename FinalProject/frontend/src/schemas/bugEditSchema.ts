import { z } from "zod";

const userEditSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  stepsToReproduce: z.string().min(1, "Steps to reproduce are required"),
});

export default userEditSchema;