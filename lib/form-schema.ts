import { z } from "zod";
export const schema = z.object({
  name: z.string().trim().min(2, "Name is required").max(120),
  email: z.string().trim().email("Valid email is required").max(200),
  contact: z.string().trim().min(5, "Contact channel is required").max(200),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  type: z
    .enum([
      "Logo",
      "Visual Identity",
      "Arabic / Latin Calligraphy",
      "Rebrand",
      "Digital Brand Experience",
      "Other",
    ])
    .or(z.string().trim().max(80)),
  budget: z
    .enum(["Not sure yet", "$300–$600", "$600–$1,500", "$1,500+"])
    .optional()
    .or(z.literal("")),
  msg: z.string().trim().min(10, "Please describe the project").max(4000),
});
