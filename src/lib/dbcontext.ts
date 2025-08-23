// app/actions.ts
"use server";
import { neon } from "@neondatabase/serverless";

const connection: string = process.env.NEON_CONNECTION_STRING || "";
export const sql = neon(connection);