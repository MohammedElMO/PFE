import { z } from "zod"

export const signupSchema = z.object({
  email: z
    .string()
    .email({
      message: "Le champ doit être une adresse e-mail valide",
    })
    .max(50, {
      message: "L'adresse e-mail doit comporter moins de 50 caractères",
    }),
  password: z
    .string({
      required_error: "Le mot de passe ne doit pas être vide",
    })
    .trim()
    .min(10, {
      message: "Le mot de passe doit comporter au moins 10 caractères",
    })
    .max(50, {
      message: "Le mot de passe doit comporter moins de 50 caractères",
    }),
  firstName: z
    .string({
      required_error: "Le prénom doit être fourni",
    })
    .trim()
    .min(1, {
      message: "Le prénom doit être fourni",
    })
    .max(25, {
      message: "Le prénom doit comporter 25 caractères ou moins",
    }),
  lastName: z
    .string({
      required_error: "Le nom de famille doit être fourni",
    })
    .trim()
    .min(1, {
      message: "Le nom de famille doit être fourni",
    })
    .max(25, {
      message: "Le nom de famille doit comporter 25 caractères ou moins",
    }),
  username: z
    .string({
      required_error: "Le nom d'utilisateur doit être fourni",
    })
    .trim()
    .min(1, {
      message: "Le nom d'utilisateur doit être fourni",
    })
    .max(100, {
      message: "Le nom d'utilisateur doit comporter moins de 100 caractères",
    }),
})

export type SignUpType = z.infer<typeof signupSchema>
