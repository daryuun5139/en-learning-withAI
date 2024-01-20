import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { Laptop } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Question } from "@prisma/client";
import Image from "next/image";

type Props = {};

const HistoryList = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }

  const histories = await prisma.question.findMany({
    take: 20,
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <main className="mx-auto max-w-7xl p-8">
        <div className="flex justify-between">
          <h2 className="mr-2 flex items-end text-3xl font-bold tracking-tight">Histroy</h2>
          <Link
            href="/"
            className="flex items-end gap-1 font-bold tracking-tight hover:cursor-pointer hover:opacity-50"
          >
            <Laptop size={28} strokeWidth={2.5} />
            TOPページにもどる
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          {histories.map((history: Question) => {
            return (
              <Link href={`/checkanswer/${history.id}`} className="py-3">
                <Card className="max-h-60 hover:cursor-pointer hover:opacity-75">
                  <CardHeader className="flex flex-row items-end justify-between space-y-0 pb-2">
                    <CardTitle className="text-xl font-bold">{history.title}</CardTitle>
                    <p className="pr-2">{new Date(history.createdAt ?? 0).toLocaleString()}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="pt-3 text-sm leading-6 text-muted-foreground">
                      {history.content}
                    </p>
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

export default HistoryList;
