import { z } from "zod"

export const loginSchema = z.object({
  password: z
    .string({
      required_error: "password should not be empty",
    })
    .trim()
    .min(1, {
      message: "password must be supplied",
    }),
  username: z
    .string({
      required_error: "username must be supplied",
    })
    .trim()
    .min(1, {
      message: "username must be supplied",
    }),
})

export type LoginT = z.infer<typeof loginSchema>
