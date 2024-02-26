// Basic Practice問題一覧

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Laptop } from "lucide-react";
import { BasicQuestion, getList } from "@/lib/microcms";
import Link from "next/link";

type Props = {};

const BasicPracticeList = async () => {
  const { basicQList } = await getList();

  return (
    <>
      <main className="flex w-full flex-col py-8">
        {/* タイトルコンテンツ--------------------------------------------------------------------------- */}
        <div className="flex justify-between">
          <div>
            {/* ページタイトル--------------------------------- */}
            <h2 className="mr-2 border-b-4 pb-1 text-4xl font-bold tracking-tight">
              Basic Practice
            </h2>
            {/* ページ概要------------------------------------- */}
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              英会話において、いきなり０の状態から英語を話すことはとても難しいです。
              <br />
              まずは基本的な質問に対する英語の解答を準備することから始めましょう。
              <br />
              自身の周りのことがらを伝えられるようになることがはじめの一歩です。
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
        <div className="mt-6 grid grid-cols-3 gap-8">
          {basicQList.map((basicQ: BasicQuestion) => {
            return (
              <Link href={`/basicpractice/${basicQ.id}`}>
                <Card className="relative h-52 cursor-default px-2 pb-2">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 px-2 pb-2">
                    <CardTitle className="text-2xl font-bold">{basicQ.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-2">
                    <div>
                      <p className="text-base leading-8 text-muted-foreground">{basicQ.overview}</p>
                    </div>
                  </CardContent>
                  <div className="absolute bottom-4 right-4">
                    <Button
                      variant="outline"
                      className="border-2 font-bold hover:cursor-pointer hover:opacity-75"
                    >
                      問題にすすむ
                    </Button>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default BasicPracticeList;
