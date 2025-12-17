import { z } from "zod";

const bugCommentSchema = z.object({
  text: z.string().min(1, "Text is required"),
});

export default bugCommentSchema;