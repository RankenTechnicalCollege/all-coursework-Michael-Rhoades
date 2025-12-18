import { z } from "zod";

const bugTestSchema = z.object({
  title: z.string().min(1, "Title is required"),
  result: z.string().min(1, "Result is required"),
});

export default bugTestSchema;