//translate,image問題答え合わせページ

import { prisma } from "@/lib/db";
import { Question } from "@prisma/client";
import { Laptop } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AiAnswerCard from "@/components/AiAnswerCard";

type paramsType = {
  id: string;
};

//generateStaticParams：ビルド時にreturnの内容に基づいて静的ルートを生成する。
export async function generateStaticParams(): Promise<paramsType[]> {
  const qaSetList = await prisma.question.findMany({
    where: {
      questionType: "translate" || "image",
    },
  });
  const paths = qaSetList.map((qaSet: Question) => {
    return {
      id: qaSet.id,
    };
  });

  return [...paths];
}

const CheckAnswer = async ({ params: { id } }: { params: { id: string } }) => {
  // 問題をDBから取得
  const question = await prisma.question.findUnique({
    where: {
      id: id,
      questionType: "translate" || "image",
    },
    include: {
      answers: true,
    },
  });

  // AIの解答をDBから取得
  const aiAnswer = await prisma.answerAI.findUnique({
    where: {
      questionId: id,
    },
  });

  return (
    <>
      <main className="flex w-full flex-col py-8">
        <div className="flex justify-between">
          <h2 className="mr-2 text-3xl font-bold tracking-tight">Check your answer</h2>
          <Link
            href="/"
            className="flex items-end gap-1 font-bold tracking-tight hover:cursor-pointer hover:opacity-50"
          >
            <Laptop size={28} strokeWidth={2.5} />
            TOPページにもどる
          </Link>
        </div>
        {/* Questionカード */}
        <Card className="mt-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3">
            <CardTitle className="text-2xl font-bold">{question && question.title}</CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <div>
              <p className="text-sm font-light leading-6">{question && question.content}</p>
            </div>
          </CardContent>
        </Card>
        <div className="mt-5 grid grid-cols-2 gap-4">
          {/* Your answerカード */}
          <Card className="min-h-[550px]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold">your answer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-light leading-8">{question && question.answerUser}</p>
            </CardContent>
          </Card>
          {/* AI answer */}
          <AiAnswerCard
            easy={aiAnswer!.answerAiEasy}
            normal={aiAnswer!.answerAiNormal}
            hard={aiAnswer!.answerAiHard}
          />
        </div>
      </main>
    </>
  );
};

export default CheckAnswer;
