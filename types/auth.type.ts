import { loginSchema } from "@/schema/auth.schema";
import z from "zod";

export type LoginFormValues = z.infer<typeof loginSchema>;

export interface LoginResponse{
    access_token: string;
    refresh_token: string;
    error?:string;
}