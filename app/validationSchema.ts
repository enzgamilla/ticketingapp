import { z } from "zod";

export const ticketSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255),
  description: z.string().min(1, "Description is required.").max(65535),
  assignedToUserId: z.string().min(1, "User not found").max(100).optional(),
});

export const userSchema = z.object({
  name: z.string().min(1, "Name is required").max(20),
  username: z
    .string()
    .min(1, "Username is required")
    .max(8, "Username must be 8 characters or fewer."),
  password: z.string().min(1, "Password is required").max(100),
});

export const siteSchema = z.object({
  siteCode: z.string().min(1, "Code is required").max(4).toUpperCase(),
  siteName: z.string().min(1, "Site name is required").max(40),
  location: z.string().min(1, "Location is required").max(50),
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
  name: z.string().min(1, "Name is required.").max(20),
  username: z
    .string()
    .min(1, "Username is required")
    .max(8, "Username must be 8 characters or fewer."),
  verification: z.boolean(),
});

export const patchSiteSchema = z.object({
  siteName: z.string().min(1, "Site name is required.").max(50),
  location: z.string().min(1, "Location is required").max(200),
  active: z.boolean(),
});
