import * as z from "zod";

/**
 * Shared between the client form and the API route so validation cannot drift.
 */
export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.email("Please enter a valid email address").max(200),
  company: z.string().trim().max(120).optional(),
  subject: z.string().trim().min(4, "Subject must be at least 4 characters").max(150),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(5000),
  // Honeypot: hidden from humans, irresistible to naive bots. Deliberately
  // permissive — the API route inspects it and returns a normal success
  // response, so a bot can't tell its submission was discarded.
  website: z.string().max(200).optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
