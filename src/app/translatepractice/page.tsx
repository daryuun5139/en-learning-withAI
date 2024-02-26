// Translate Practice問題一覧

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TranslateQuestion, getList } from "@/lib/microcms";
import Link from "next/link";
import { Laptop } from "lucide-react";

type Props = {};

const TranslatePracticeList = async (props: Props) => {
  const { translateQList } = await getList();

  return (
    <>
      <main className="flex w-full flex-col py-8">
        {/* タイトルコンテンツ--------------------------------------------------------------------------- */}
        <div className="flex justify-between">
          <div>
            {/* ページタイトル--------------------------------- */}
            <h2 className="mr-2 border-b-4 pb-1 text-4xl font-bold tracking-tight">
              Translate Practice
            </h2>
            {/* ページ概要------------------------------------- */}
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Basic Practiceで自分自身についてを英語で表現できるようになりました。
              <br />
              今度はさらに英語の表現力を伸ばしていきます。
              <br />
              やり方はシンプルです。与えられた日本語文を英文に翻訳していきます。
              <br />
              問題は随時更新します。
            </p>
          </div>
          {/* TOPページにもどるボタン---------------------------- */}
          <Link
            href="/"
            className="flex items-end gap-1 font-bold tracking-tight underline hover:cursor-pointer hover:opacity-50"
          >
            <Laptop size={28} strokeWidth={2.5} />
            TOPページにもどる
          </Link>
        </div>
        {/* メインコンテンツ------------------------------------------------------------------------------- */}
        <div className="mt-6 flex w-full flex-col gap-8">
          {translateQList.map((translateQ: TranslateQuestion) => {
            return (
              <Link href={`/translatepractice/${translateQ.id}`}>
                <Card className="h-[100px] duration-500 hover:cursor-pointer hover:opacity-50">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4">
                    <CardTitle className="text-2xl font-bold">{translateQ.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div>
                      <p className="truncate text-muted-foreground">{translateQ.content}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default TranslatePracticeList;
