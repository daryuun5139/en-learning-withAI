import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LetterQuestion, getList } from "@/lib/microcms";
import Link from "next/link";
import { Laptop } from "lucide-react";

type Props = {};

const LetterPracticeList = async (props: Props) => {
  const { letterQList } = await getList();

  return (
    <>
      <main className="mx-auto max-w-7xl p-8">
        <div className="flex justify-between">
          <h2 className="mr-2 text-3xl font-bold tracking-tight">Letter Practice</h2>
          <Link
            href="/"
            className="flex items-end gap-1 font-bold tracking-tight hover:cursor-pointer hover:opacity-50"
          >
            <Laptop size={28} strokeWidth={2.5} />
            TOPページにもどる
          </Link>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {letterQList.map((letterQ: LetterQuestion) => {
            return (
              <Link href={`/letterpractice/${letterQ.id}`}>
                <Card className="max-h-60 hover:cursor-pointer hover:opacity-75">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-2xl font-bold">{letterQ.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="truncate text-sm text-muted-foreground">{letterQ.content}</p>
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

export default LetterPracticeList;
