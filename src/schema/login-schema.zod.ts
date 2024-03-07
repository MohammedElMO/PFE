import { z } from "zod"

export const loginSchema = z.object({
  password: z
    .string({
      required_error: "password should not be empty",
    })
    .min(9, {
      message: "password should be greater than 9 characters ",
    })
    .max(18, {
      message: "password should be less than 18 characters ",
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
