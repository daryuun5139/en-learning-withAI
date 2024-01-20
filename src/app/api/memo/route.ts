//Create Memo Endpoint

import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { NextResponse } from "next/server";
import { z } from "zod";
import axios from "axios";
import { memoFormSchema } from "@/schema/memoform";

//Route handlerのPOSTメソッド（POST以外でのリクエストであると、エラー）
//https://medium.com/@brandonlostboy/build-it-better-next-js-api-handler-75070dd1826f
//①新規のメモをDBに格納する
export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be logged in to create a game." },
        {
          status: 401,
        }
      );
    }
    const body = await req.json();
    //memoFormSchemaに合致するとparseする。
    const { title, content, category, favorite, questionId } = memoFormSchema.parse(body);
    //DBに新規のquestionデータを作成する
    const memo = await prisma.memo.create({
      data: {
        //dataはprisma.createでrequired option.
        createdAt: new Date(),
        title: title,
        content: content,
        category: category,
        favorite: favorite,
        questionId: questionId,
        userId: session.user.id,
      },
    });

    return NextResponse.json({ questionId: questionId }, { status: 200 });
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
