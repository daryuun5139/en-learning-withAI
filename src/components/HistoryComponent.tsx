import { prisma } from "@/lib/db";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  limit: number;
};

const HistoryComponent = async ({ limit }: Props) => {
  const questions = await prisma.question.findMany({
    take: limit,
    where: {
      userId: "0000",
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <>
      {questions.map((question) => {
        return (
          <Card
            key={question.id}
            className="flex items-center shadow-none duration-500 hover:opacity-50"
          >
            {question.questionType === "translate" ? (
              <Link href={`/checkanswertranslate/${question.id}`} className="w-full">
                <CardContent className="flex items-center px-3 py-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-semibold">{question.title}</p>
                      <p className="text-sm">
                        {new Date(question.createdAt ?? 0).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="pt-2 text-sm text-muted-foreground">{question.content}</p>
                  </div>
                </CardContent>
              </Link>
            ) : (
              <Link href={`/checkanswerbasic/${question.id}`} className="w-full">
                <CardContent className="flex items-center px-3 py-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-semibold">{question.title}</p>
                      <p className="text-sm">
                        {new Date(question.createdAt ?? 0).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="pt-2 text-sm text-muted-foreground">{question.content}</p>
                  </div>
                </CardContent>
              </Link>
            )}
          </Card>
        );
      })}
    </>
  );
};

export default HistoryComponent;
