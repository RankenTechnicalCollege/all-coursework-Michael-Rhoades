import { z } from "zod";

const bugAssignSchema = z.object({
  assignedToUserId: z.string().min(1, "Assigned to user is required"),
});

export default bugAssignSchema;