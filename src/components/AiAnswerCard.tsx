import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnswerAI } from "@prisma/client";

type Props = {
  easy: string;
  normal: string;
  hard: string;
};

const AiAnswerCard = ({ easy, normal, hard }: Props) => {
  return (
    <>
      <Tabs defaultValue="easy">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="easy">Easy</TabsTrigger>
          <TabsTrigger value="normal">Normal</TabsTrigger>
          <TabsTrigger value="hard">Hard</TabsTrigger>
        </TabsList>
        {/* Easyタブ */}
        <TabsContent value="easy">
          <Card className="min-h-[500px]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold">Easy Expression</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-xl font-light leading-8">{easy}</p>
            </CardContent>
          </Card>
        </TabsContent>
        {/* Normalタブ */}
        <TabsContent value="normal">
          <Card className="min-h-[500px]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold">Normal Expression</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-xl font-light leading-8">{normal}</p>
            </CardContent>
          </Card>
        </TabsContent>
        {/* Hardタブ */}
        <TabsContent value="hard">
          <Card className="min-h-[500px]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold">Hard Expression</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-xl font-light leading-8">{hard}</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default AiAnswerCard;
