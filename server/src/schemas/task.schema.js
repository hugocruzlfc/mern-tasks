import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Name must be a string",
  }),
  description: z.string({
    required_error: "Description is required",
    invalid_type_error: "Name must be a string",
  }),
  done: z
    .boolean({
      invalid_type_error: "isActive must be a boolean",
    })
    .optional(),
});
