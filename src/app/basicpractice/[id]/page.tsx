//BasicPractice個別ページ

// レイアウト系インポート
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Laptop } from "lucide-react";
// その他インポート
import Link from "next/link";
import { BasicQuestion, getDetail_basic, getList } from "@/lib/microcms";
import AnswerFormForBasicPractice from "@/components/forms/AnswerFormForBasicPractice";

type paramsType = {
  id: string;
};

//generateStaticParams：ビルド時にreturnの内容に基づいて静的ルートを生成する。
export async function generateStaticParams(): Promise<paramsType[]> {
  const { basicQList } = await getList();
  const paths = basicQList.map((basicQ: BasicQuestion) => {
    return {
      id: basicQ.id,
    };
  });

  return [...paths];
}

const BasicPractice = async ({ params: { id } }: { params: { id: string } }) => {
  const basicQDetail = await getDetail_basic(id);

  return (
    <>
      <main className="mx-auto max-w-7xl p-8">
        {/* Basic Practiceタイトル＆TOPページに戻る---------------------------------------------------- */}
        <div className="flex justify-between">
          <h2 className="mr-2 text-3xl font-bold tracking-tight">Basic Practice</h2>
          <Link
            href="/"
            className="flex items-end gap-1 font-bold tracking-tight hover:cursor-pointer hover:opacity-50"
          >
            <Laptop size={28} strokeWidth={2.5} />
            TOPページにもどる
          </Link>
        </div>
        {/* Basic Practice概要---------------------------------------------------------------------- */}
        <Card className="mt-4 items-center">
          <CardContent className="p-3">
            <p className="font-light leading-8">
              チェック項目を参考に日本語文を入力欄に入力しましょう。
              <br />
              入力が完了しましたら入力完了ボタンを押してください。あなたの入力した日本語文をAIが英文に変換します。
            </p>
          </CardContent>
        </Card>
        {/* メインコンテンツ---------------------------------------------------------------------------- */}
        <div className="mt-10 grid min-h-[600px] gap-4 md:grid-cols-2">
          {/* お題カード------------------------------------------------------ */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold">{basicQDetail.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-xl">
              {basicQDetail.contents.map((content) => {
                return (
                  <div className="flex items-center space-x-2 pt-2 text-xl">
                    <Checkbox id={content.content} />
                    <Label htmlFor={content.content} className="text-lg">
                      {content.content}
                    </Label>
                  </div>
                );
              })}
            </CardContent>
          </Card>
          {/* 回答欄---------------------------------------------------------- */}
          <AnswerFormForBasicPractice title={basicQDetail.title} questionType={"basic"} />
        </div>
      </main>
    </>
  );
};

export default BasicPractice;
