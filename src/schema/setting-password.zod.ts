import { z } from "zod"

export const settingPassSchema = z.object({
  currentPassword: z
    .string({
      required_error: "le mot de passe ne doit pas être vide",
    })
    .trim()
    .min(1, {
      message: "le mot de passe doit être fourni",
    }),
  confirmePassword: z
    .string({
      required_error: "le mot de passe de confirmation ne doit pas être vide",
    })
    .trim()
    .min(1, {
      message: "le mot de passe de confirmation doit être fourni",
    }),
  nouveauMotDePasse: z
    .string({
      required_error: "le mot de passe ne doit pas être vide",
    })
    .trim()
    .min(10, {
      message: "le nouveau mot de passe doit comporter au moins 10 caractères",
    })
    .max(50, {
      message: "le nouveau mot de passe doit comporter moins de 50 caractères",
    }),
})

export type SettingPassT = z.infer<typeof settingPassSchema>
