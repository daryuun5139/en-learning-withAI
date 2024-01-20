import { strict_output } from "@/lib/gpt";
import { getAuthSession } from "@/lib/nextauth";
import { answerFormSchema } from "@/schema/answerform";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    // if (!session?.user) {
    //   return NextResponse.json(
    //     { error: "You must be logged in to create a game." },
    //     {
    //       status: 401,
    //     }
    //   );
    // }
    const body = await req.json();
    const { content, questionType } = answerFormSchema.parse(body);
    let answers: any;
    if (questionType === "letter" || "basic") {
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
    // else if (type === "mcq") {
    //   questions = await strict_output(
    //     "You are a helpful AI that is able to generate mcq questions and answers, the length of each answer should not be more than 15 words, store all answers and questions and options in a JSON array",
    //     new Array(amount).fill(`You are to generate a random hard mcq question about ${topic}`),
    //     {
    //       question: "question",
    //       answer: "answer with max length of 15 words",
    //       option1: "option1 with max length of 15 words",
    //       option2: "option2 with max length of 15 words",
    //       option3: "option3 with max length of 15 words",
    //     }
    //   );
    // }
    // console.log(JSON.parse(JSON.stringify(answers)));
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
