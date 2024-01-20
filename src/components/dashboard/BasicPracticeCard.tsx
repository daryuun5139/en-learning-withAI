"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

type Props = {};

const BasicPracticeCard = (props: Props) => {
  return (
    <Card className="pb-2 hover:cursor-pointer hover:opacity-75">
      <Link href="/basicpractice">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Basic Practice</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col py-0">
          <p className="text-lg leading-8 text-muted-foreground">
            基本の練習問題です。
            <br />
            自己紹介、自分の好きなことなど。
            <br />
            まずは自身に関することを英語で説明できるようになることから始めましょう。
          </p>
        </CardContent>
        <div className="flex justify-end pr-10">
          <Image src="/dashboard/basicPractice.svg" alt="basicPractice" width={280} height={280} />
        </div>
      </Link>
    </Card>
  );
};

export default BasicPracticeCard;
