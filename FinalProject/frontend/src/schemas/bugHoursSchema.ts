import { z } from "zod";

const bugHoursSchema = z.object({
  hours: z.number().positive("Hours must be a positive number"),
});

export default bugHoursSchema;