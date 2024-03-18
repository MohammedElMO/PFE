import { z } from "zod"

export const signupSchema = z.object({
  email: z.string().email({
    message: "field must be a valid email",
  }),
  password: z
    .string({
      required_error: "password should not be empty",
    })
    .trim()
    .min(10, {
      message: "password must be at least 10 combination",
    })
    .max(20, { message: "password must be 20 combinations or less" }),
  firstName: z
    .string({
      required_error: "first name must be supplied",
    })
    .trim()
    .min(1, {
      message: "first name must be supplied",
    })
    .max(20, {
      message: "first name must 20 charcters  or less",
    }),
  lastName: z
    .string({
      required_error: "last name must be supplied",
    })
    .trim()
    .min(1, {
      message: "last name must be supplied",
    })
    .max(20, {
      message: "last name must 20 charcters long or less",
    }),
})

export type SignUp = z.infer<typeof signupSchema>
