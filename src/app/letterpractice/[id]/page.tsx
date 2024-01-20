//LetterPractice個別ページ

import React from "react";
import { getDetail_letter, getList } from "@/lib/microcms";
import { LetterQuestion } from "@/lib/microcms";
import Link from "next/link";
import { Laptop } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AnswerForm from "@/components/forms/AnswerForm";

type paramsType = {
  id: string;
};

//generateStaticParams：ビルド時にreturnの内容に基づいて静的ルートを生成する。
export async function generateStaticParams(): Promise<paramsType[]> {
  const { letterQList } = await getList();
  const paths = letterQList.map((letterQ: LetterQuestion) => {
    return {
      id: letterQ.id,
    };
  });

  return [...paths];
}

const LetterPractice = async ({ params: { id } }: { params: { id: string } }) => {
  const letterQDetail = await getDetail_letter(id);

  return (
    <>
      <main className="mx-auto max-w-7xl p-8">
        <div className="flex justify-between">
          <h2 className="mr-2 text-3xl font-bold tracking-tight">{letterQDetail.title}</h2>
          <Link
            href="/letterpractice"
            className="flex items-end gap-1 font-bold tracking-tight hover:cursor-pointer hover:opacity-50"
          >
            <Laptop size={28} strokeWidth={2.5} />
            問題一覧にもどる
          </Link>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Card className="h-[550px]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold">{letterQDetail.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-light leading-8">{letterQDetail.content}</p>
            </CardContent>
          </Card>
          <AnswerForm
            title={letterQDetail.title}
            content={letterQDetail.content}
            questionType={"letter"}
          />
        </div>
      </main>
    </>
  );
};

export default LetterPractice;
