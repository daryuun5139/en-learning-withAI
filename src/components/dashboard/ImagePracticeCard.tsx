import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

type Props = {};

const ImagePracticeCard = (props: Props) => {
  return (
    <Card className="bg-slate-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex  flex-row items-end gap-2">
          <CardTitle className="text-2xl font-bold">Medium Practice</CardTitle>
          <p className="text-sm text-muted-foreground">-画像描写問題</p>
        </div>
        <div className="flex justify-end pr-10">
          <Image
            src="/dashboardImg/mediumImage.svg"
            alt="mediumImage"
            width={0}
            height={0}
            className="h-auto w-[300px]"
            priority={true}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <p className="text-lg text-muted-foreground">
            只今準備中です。もうしばらくお待ちください。
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImagePracticeCard;
