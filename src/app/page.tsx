//dashboardページ

import BasicPracticeCard from "@/components/dashboard/BasicPracticeCard";
import HistoryCard from "@/components/dashboard/HistoryCard";
import ImagePracticeCard from "@/components/dashboard/ImagePracticeCard";
import TranslatePracticeCard from "@/components/dashboard/TranslatePracticeCard";

export const metadata = {
  title: "Dashboard | Deeepin",
  description: "Learn English yourself on anything!",
};

export default function Home() {
  return (
    <>
      <main className="flex w-full flex-col py-8">
        <div className="flex items-center">
          <h2 className="mr-2 text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-8">
          <BasicPracticeCard />
          <div className="flex flex-col justify-between gap-6">
            <TranslatePracticeCard />
            <ImagePracticeCard />
          </div>
        </div>
        <div className="mt-4 grid gap-4">
          <HistoryCard />
        </div>
      </main>
    </>
  );
}
