import { z } from "zod";

const bugCloseSchema = z.object({
  closed: z.boolean("closed is required"),
});

export default bugCloseSchema;