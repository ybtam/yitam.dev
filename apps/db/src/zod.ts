import {z} from "zod";
import {createInsertSchema} from "drizzle-zod";
import {users} from "./schemas";

export const insertUserSchema = createInsertSchema(users, {

})

export type InsertIntoUsersInput = z.infer<typeof insertUserSchema>
