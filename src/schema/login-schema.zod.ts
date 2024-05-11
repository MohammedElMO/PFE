import { z } from "zod"

export const loginSchema = z.object({
  password: z
    .string({
      required_error: "le mot de passe ne doit pas être vide",
    })
    .trim()
    .min(1, {
      message: "le mot de passe doit être fourni",
    }),
  username: z
    .string({
      required_error: "le nom d'utilisateur doit être fourni",
    })
    .trim()
    .min(1, {
      message: "le nom d'utilisateur doit être fourni",
    }),
})


export type LoginT = z.infer<typeof loginSchema>
