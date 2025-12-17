import { z } from "zod";

const bugClassifySchema = z.object({
  classification: z.string().min(1, "Classification is required"),
});

export default bugClassifySchema;