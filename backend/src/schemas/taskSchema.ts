import { z } from "zod";

const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

const updateTaskSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
});

export { createTaskSchema, updateTaskSchema };
