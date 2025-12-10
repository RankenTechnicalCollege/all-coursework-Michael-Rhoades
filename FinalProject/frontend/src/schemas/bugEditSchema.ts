import { z } from "zod";

const userEditSchema = z.object({
  title: z.string().email("Title is required"),
  description: z.string().min(1, "Description is required"),
  stepsToReproduce: z.array(z.string()).min(1),
});

export default userEditSchema;