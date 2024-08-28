import { z } from "zod";

export const ticketSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255),
  description: z.string().min(1, "Description is required.").max(65535),
});

export const patchTicketSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255).optional(),
  description: z
    .string()
    .min(1, "Description is required.")
    .max(65535)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "AssignedToUserId is required")
    .max(255)
    .optional()
    .nullable(),
});

export const patchUserSchema = z.object({
  name: z.string().min(1, "Name is required.").max(8),
  email: z.string().min(1, "Username is required.").max(8),
  accountVerified: z.boolean(),
});
