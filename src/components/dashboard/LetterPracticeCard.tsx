import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

type Props = {};

const LetterPracticeCard = (props: Props) => {
  return (
    <Card className="hover:cursor-pointer hover:opacity-75">
      <Link href="/letterpractice">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex  flex-row items-end gap-2">
            <CardTitle className="text-2xl font-bold">Medium Practice</CardTitle>
            <p className="text-sm text-muted-foreground">-文章翻訳問題</p>
          </div>
          <div className="flex justify-end pr-10">
            <Image src="/dashboard/mediumLetter.svg" alt="mediumLetter" width={140} height={140} />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-lg leading-8 text-muted-foreground">
            様々なシチュエーションの日本語文を英語に翻訳していきます。
            <br />
            AIが生成する解答例も参考にして英語表現を増やしていきます。
          </p>
        </CardContent>
      </Link>
    </Card>
  );
};

export default LetterPracticeCard;
