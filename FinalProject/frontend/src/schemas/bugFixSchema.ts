import { z } from "zod";

const bugFixSchema = z.object({
  fixInVersion: z.string().min(1, "fixInVersion is required"),
  fixedOnDate: z.string().min(1, "fixedOnDate is required"),
});

export default bugFixSchema;