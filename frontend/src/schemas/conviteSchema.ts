import type z from "zod";
import { EmailSchema } from "./commonSchemas";

export const ConviteSchema = EmailSchema;

export type ConviteFormData = z.infer<typeof ConviteSchema>;