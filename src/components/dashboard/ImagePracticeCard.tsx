import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

type Props = {};

const ImagePracticeCard = (props: Props) => {
  return (
    <Card className="bg-slate-200">
      {/* <Link href="/imagepractice"> */}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex  flex-row items-end gap-2">
          <CardTitle className="text-2xl font-bold">Medium Practice</CardTitle>
          <p className="text-sm text-muted-foreground">-画像描写問題</p>
        </div>
        <div className="flex justify-end pr-10">
          <Image src="/dashboard/mediumImage.svg" alt="mediumImage" width={140} height={140} />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-lg text-muted-foreground">
          只今準備中です。もうしばらくお待ちください。
        </p>
      </CardContent>
      {/* </Link> */}
    </Card>
  );
};

export default ImagePracticeCard;
