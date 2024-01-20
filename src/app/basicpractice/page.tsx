// Basic Practice問題一覧
// "use client";

// レイアウト系インポート
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Laptop } from "lucide-react";

import { BasicQuestion, getList } from "@/lib/microcms";
import Link from "next/link";

type Props = {};

const BasicPracticeList = async (props: Props) => {
  const { basicQList } = await getList();

  return (
    <>
      <main className="mx-auto max-w-7xl p-8">
        {/* タイトルコンテンツ--------------------------------------------------------------------------- */}
        <div className="flex justify-between">
          <div>
            {/* ページタイトル---------------------------------------------------------------------- */}
            <h2 className="mr-2 border-b-4 pb-1 text-3xl font-bold tracking-tight">
              Basic Practice
            </h2>
            {/* ページ概要------------------------------------------------------------------------- */}
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              英会話において、いきなり０の状態から英語を話すことはとても難しいです。
              <br />
              まずは基本的な質問に対する英語の解答を準備することから始めましょう。
              <br />
              自身の周りのことがらを伝えられるようになることがはじめの一歩です。
            </p>
          </div>
          {/* TOPページにもどるボタン----------------------------------------------------------------- */}
          <Link
            href="/"
            className="flex items-end gap-1 font-bold tracking-tight hover:cursor-pointer hover:opacity-50"
          >
            <Laptop size={28} strokeWidth={2.5} />
            TOPページにもどる
          </Link>
        </div>
        {/* メインコンテンツ------------------------------------------------------------------------------- */}
        <div className="mt-6 grid gap-8 lg:grid-cols-3">
          {basicQList.map((basicQ: BasicQuestion) => {
            return (
              <Link href={`/basicpractice/${basicQ.id}`}>
                <Card className="relative cursor-default px-4 pb-4 lg:h-52">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xl font-bold md:text-2xl">{basicQ.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-8 text-muted-foreground md:text-base">
                      {basicQ.overview}
                    </p>
                  </CardContent>
                  <div className="absolute bottom-4 right-4">
                    <Button className="hover:cursor-pointer hover:opacity-75">問題にすすむ</Button>
                  </div>
                  {/* <div className="absolute bottom-4 right-4">
                    <Button className="mx-1 bg-[#E2E8F0] px-2 text-black hover:cursor-pointer hover:opacity-75">
                      過去の解答をみる
                    </Button>
                    <Button className="mx-1 bg-[#E2E8F0] px-2 text-black hover:cursor-pointer hover:opacity-75">
                      再チャレンジ
                    </Button>
                  </div> */}
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
