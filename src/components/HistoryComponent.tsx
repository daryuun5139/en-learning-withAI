import { prisma } from "@/lib/db";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  limit: number;
  userId: string;
};

const HistoryComponent = async ({ limit, userId }: Props) => {
  const questions = await prisma.question.findMany({
    take: limit,
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <>
      {questions.map((question) => {
        return (
          <Card key={question.id} className="mt-2 flex items-center shadow-none hover:opacity-75">
            {question.questionType === "letter" ? (
              <Link href={`/checkanswer/${question.id}`}>
                <CardContent className="flex items-center px-2 py-3">
                  <p className="w-[150px]">
                    {new Date(question.createdAt ?? 0).toLocaleDateString()}
                  </p>
                  <p className="w-[200px]">{question.title}</p>
                  <p className="text-sm text-muted-foreground">{question.content}</p>
                </CardContent>
              </Link>
            ) : (
              <Link href={`/checkanswerbasic/${question.id}`}>
                <CardContent className="flex items-center px-2 py-3">
                  <p className="w-[150px]">
                    {new Date(question.createdAt ?? 0).toLocaleDateString()}
                  </p>
                  <p className="w-[200px]">{question.title}</p>
                  <p className="text-sm text-muted-foreground">{question.content}</p>
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
