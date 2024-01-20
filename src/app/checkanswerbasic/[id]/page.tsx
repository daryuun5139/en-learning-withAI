//BasicPractice答え合わせページ（BasicPracticeの入力完了をクリック後に当該ページにとぶ）

import { prisma } from "@/lib/db";
import { Memo, Question } from "@prisma/client";
import { Laptop } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthSession } from "@/lib/nextauth";
import AiAnswerCard from "@/components/AiAnswerCard";
import AddMemoSheet from "@/components/AddMemoSheet";

type paramsType = {
  id: string;
};

//generateStaticParams：ビルド時にreturnの内容に基づいて静的ルートを生成する。
export async function generateStaticParams(): Promise<paramsType[]> {
  const qaSetList = await prisma.question.findMany({
    where: {
      questionType: "basic",
    },
  });
  const paths = qaSetList.map((qaSet: Question) => {
    return {
      id: qaSet.id,
    };
  });

  return [...paths];
}

const CheckAnswerBasic = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getAuthSession();

  // 問題をDBから取得
  const question = await prisma.question.findUnique({
    where: {
      id: id,
      questionType: "basic",
    },
  });

  // AIの解答をDBから取得
  const aiAnswer = await prisma.answerAI.findUnique({
    where: {
      questionId: id,
    },
  });

  // メモをDBから取得
  const memos = await prisma.memo.findMany({
    where: {
      questionId: id,
      userId: session?.user.id,
    },
  });

  return (
    <>
      <main className="mx-auto max-w-7xl p-8">
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
        <div className="mt-10 grid  gap-4 md:grid-cols-2">
          {/* Your answerカード */}
          <Card className="min-h-[550px]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold">{question && question.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-light leading-8">{question && question.content}</p>
            </CardContent>
          </Card>
          {/* AI answer */}
          <AiAnswerCard
            easy={aiAnswer!.answerAiEasy}
            normal={aiAnswer!.answerAiNormal}
            hard={aiAnswer!.answerAiHard}
          />
        </div>
        <div className="mt-5 w-full">
          <AddMemoSheet questionId={id} />
        </div>
        {/* Memoカード */}
        {memos &&
          memos.map((memo: Memo) => {
            return (
              <Card className="mt-4">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-2xl font-bold">{memo.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-light leading-8">{memo.content}</p>
                </CardContent>
              </Card>
            );
          })}
      </main>
    </>
  );
};

export default CheckAnswerBasic;
