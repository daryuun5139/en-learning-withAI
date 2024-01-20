import { z } from "zod";

export const memoFormSchema = z.object({
  title: z.string(),
  content: z.string(),
  category: z.enum(["word", "phrase", "grammar", "other"]),
  favorite: z.boolean(),
  questionId: z.string(),
});
