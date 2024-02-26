//Translate Practice個別ページ

import { getDetail_translate, getList } from "@/lib/microcms";
import { TranslateQuestion } from "@/lib/microcms";
import Link from "next/link";
import { Laptop } from "lucide-react";
import { Undo2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AnswerForm from "@/components/forms/AnswerForm";

type paramsType = {
  id: string;
};

//generateStaticParams：ビルド時にreturnの内容に基づいて静的ルートを生成する。
export async function generateStaticParams(): Promise<paramsType[]> {
  const { translateQList } = await getList();
  const paths = translateQList.map((translateQ: TranslateQuestion) => {
    return {
      id: translateQ.id,
    };
  });

  return [...paths];
}

const TranslatePractice = async ({ params: { id } }: { params: { id: string } }) => {
  const translateQDetail = await getDetail_translate(id);

  return (
    <>
      <main className="flex w-full flex-col py-8">
        {/*  タイトル＆TOPページに戻る---------------------------------------------------- */}
        <div className="flex justify-between">
          <h2 className="mr-2 text-3xl font-bold tracking-tight">{translateQDetail.title}</h2>
          <div className="flex gap-4">
            <Link
              href="/translatepractice"
              className="flex items-end gap-1 text-sm font-bold tracking-tight underline hover:cursor-pointer hover:opacity-50"
            >
              <Undo2 size={25} strokeWidth={2.5} />
              問題リストにもどる
            </Link>
            <Link
              href="/"
              className="flex items-end gap-1 text-sm font-bold tracking-tight underline hover:cursor-pointer hover:opacity-50"
            >
              <Laptop size={28} strokeWidth={2.5} />
              TOPページにもどる
            </Link>
          </div>
        </div>
        {/* Translate Practice概要---------------------------------------------------------------------- */}
        <Card className="mt-4 items-center">
          <CardContent className="p-3">
            <div>
              <p className="font-light leading-8">
                問題文の日本語を翻訳して入力欄に入力しましょう。
                <br />
                入力が完了しましたら入力完了ボタンを押してください。問題文の日本語をAIが英文に変換します。
              </p>
            </div>
          </CardContent>
        </Card>
        {/* メインコンテンツ---------------------------------------------------------------------------- */}
        <div className="mt-10 grid min-h-[600px] grid-cols-2 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold">{translateQDetail.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <p className="text-lg font-light leading-9">{translateQDetail.content}</p>
              </div>
            </CardContent>
          </Card>
          <AnswerForm
            title={translateQDetail.title}
            content={translateQDetail.content}
            questionType={"translate"}
          />
        </div>
      </main>
    </>
  );
};

export default TranslatePractice;
