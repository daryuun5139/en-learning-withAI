import { prisma } from "@/lib/db";
import { Laptop } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Question } from "@prisma/client";

type Props = {};

const HistoryList = async (props: Props) => {
  const histories = await prisma.question.findMany({
    take: 20,
    where: {
      userId: "0000",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <main className="flex w-full flex-col py-8">
        <div className="flex justify-between">
          <h2 className="mr-2 flex items-end text-4xl font-bold tracking-tight">Histroy</h2>
          <Link
            href="/"
            className="flex items-end gap-1 font-bold tracking-tight hover:cursor-pointer hover:opacity-50"
          >
            <Laptop size={28} strokeWidth={2.5} />
            TOPページにもどる
          </Link>
        </div>
        <div className="mt-3 flex flex-col gap-1">
          {histories.map((history: Question) => {
            return (
              <>
                {history.questionType === "translate" ? (
                  <Link href={`/checkanswertranslate/${history.id}`} className="py-2">
                    <Card className="max-h-60 hover:cursor-pointer hover:opacity-75">
                      <CardHeader className="flex flex-row items-end justify-between space-y-0 pb-0">
                        <CardTitle className="text-xl font-bold">{history.title}</CardTitle>
                        <p className="pr-2">{new Date(history.createdAt ?? 0).toLocaleString()}</p>
                      </CardHeader>
                      <CardContent>
                        <div>
                          <p className="text-sm leading-6 text-muted-foreground">
                            {history.content}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ) : (
                  <Link href={`/checkanswerbasic/${history.id}`} className="py-2">
                    <Card className="max-h-60 hover:cursor-pointer hover:opacity-75">
                      <CardHeader className="flex flex-row items-end justify-between space-y-0 pb-0">
                        <CardTitle className="text-xl font-bold">{history.title}</CardTitle>
                        <p className="pr-2">{new Date(history.createdAt ?? 0).toLocaleString()}</p>
                      </CardHeader>
                      <CardContent>
                        <div>
                          <p className="text-sm leading-6 text-muted-foreground">
                            {history.content}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )}
              </>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default HistoryList;
