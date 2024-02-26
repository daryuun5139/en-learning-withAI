import { z } from "zod";

export const answerFormSchema = z.object({
  answer: z.string().optional(),
  title: z.string(),
  content: z.string(),
  questionType: z.enum(["translate", "image", "basic"]),
});
