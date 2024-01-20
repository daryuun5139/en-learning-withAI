import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthSession } from "@/lib/nextauth";
import HistoryComponent from "../HistoryComponent";
import { redirect } from "next/navigation";
import Link from "next/link";

type Props = {};

const HistoryCard = async () => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-end gap-2">
          <CardTitle className="text-2xl font-bold">History</CardTitle>
          <p className="text-sm text-muted-foreground">過去に解答した問題一覧</p>
        </div>
      </CardHeader>
      <CardContent>
        <HistoryComponent limit={5} userId={session.user.id} />
      </CardContent>
      <CardFooter className="relative mx-8">
        <Link
          href="/history"
          className="absolute right-0 text-muted-foreground underline hover:cursor-pointer hover:opacity-75"
        >
          view all histories
        </Link>
      </CardFooter>
    </Card>
  );
};

export default HistoryCard;
