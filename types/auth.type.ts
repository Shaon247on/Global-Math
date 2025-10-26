import { loginSchema } from "@/schema/auth.schema";
import z from "zod";

export type LoginFormValues = z.infer<typeof loginSchema>;