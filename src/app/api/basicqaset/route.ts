//Create Basic-QA-set Endpoint

import { prisma } from "@/lib/db";
import { answerFormSchema } from "@/schema/answerform";
import { NextResponse } from "next/server";
import { z } from "zod";
import axios from "axios";

//Route handlerのPOSTメソッド（POST以外でのリクエストであると、エラー）
//https://medium.com/@brandonlostboy/build-it-better-next-js-api-handler-75070dd1826f
//①生成したquestionセットをDBに格納する
export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    //answerFormSchemaに合致するとparseする。
    const { title, content, questionType } = answerFormSchema.parse(body);
    //DBに新規のquestionデータを作成する
    const question = await prisma.question.create({
      data: {
        //dataはprisma.createでrequired option.
        createdAt: new Date(),
        title: title,
        content: content,
        questionType: questionType,
        userId: "0000",
      },
    });
    //axiosでapi/questionsにPOST＝questionsが生成される。第２引数がHTTPリクエストボディに追加される。
    //axiosとfetchの違い：https://zenn.dev/syu/articles/9840082d1a6633
    const { data } = await axios.post(`${process.env.API_URL as string}/api/answer`, {
      title,
      content,
      questionType,
    });

    await prisma.answerAI.create({
      data: {
        answerAiEasy: data.answers.easy,
        answerAiNormal: data.answers.normal,
        answerAiHard: data.answers.hard,
        questionId: question.id,
      },
    });
    return NextResponse.json({ questionId: question.id }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues },
        {
          status: 400,
        }
      );
    } else {
      return NextResponse.json(
        { error: "An unexpected error occurred." },
        {
          status: 500,
        }
      );
    }
  }
}
