import { strict_output } from "@/lib/gpt";
import { answerFormSchema } from "@/schema/answerform";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { content, questionType } = answerFormSchema.parse(body);
    let answers: any;
    if (questionType === "translate" || "basic") {
      answers = await strict_output(
        "You are a helpful AI that is able to translate the given Japanese text into English, and can generate answers that has Easy-level answer, and Intermediate-level answer, and Advanced-level answer.And store answers in a JSON array",
        `please generate answers that translate ${content} into English`,
        {
          easy: "Easy-level answer",
          normal: "Intermediate-level answer",
          hard: "Advanced-level answer",
        }
      );
    }

    return NextResponse.json(
      {
        answers: answers,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues },
        {
          status: 400,
        }
      );
    } else {
      console.error("gpt error", error);
      return NextResponse.json(
        { error: "An unexpected error occurred." },
        {
          status: 500,
        }
      );
    }
  }
}
