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
      message: "password must be at least 10 combinations",
    })
    .max(30, { message: "password must be 20 combinations or less" }),
  firstName: z
    .string({
      required_error: "first name must be supplied",
    })
    .trim()
    .min(1, {
      message: "first name must be supplied",
    })
    .max(30, {
      message: "first name must 20 charcters  or less",
    }),
  lastName: z
    .string({
      required_error: "lastname must be supplied",
    })
    .trim()
    .min(1, {
      message: "lastname must be supplied",
    })
    .max(30, {
      message: "lastname must 20 charcters long or less",
    }),
    username: z
    .string({
      required_error: "username must be supplied",
    })
    .trim()
    .min(1, {
      message: "username must be supplied",
    })
    .max(30, {
      message: "username must less than 30 characters",
    }),
})

export type SignUpType = z.infer<typeof signupSchema> 
