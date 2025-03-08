import {z} from "zod";
import {createInsertSchema} from "drizzle-zod";
import {users} from "./schema.ts";

export const insertUserSchema = createInsertSchema(users, {

})

export type InsertIntoUsersInput = z.infer<typeof insertUserSchema>
