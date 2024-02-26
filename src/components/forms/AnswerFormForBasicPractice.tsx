//BasicPracticeの解答フォーム
"use client";

// レイアウト系インポート
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "../ui/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
// use系インポート
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
// その他インポート
import { z } from "zod";
import { answerFormSchema } from "@/schema/answerform";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";

type Props = {
  title: string;
  questionType: string;
};
type answerform = z.infer<typeof answerFormSchema>;

const AnswerFormForBasicPractice = ({ title, questionType }: Props) => {
  const router = useRouter();
  const [showLoader, setShowLoader] = useState(false);
  const [finishedLoading, setFinishedLoading] = useState(false);
  const { toast } = useToast();
  const { mutate: getQuestions, isLoading } = useMutation({
    mutationFn: async ({ title, content, questionType }: answerform) => {
      const response = await axios.post("/api/basicqaset", { title, content, questionType });
      return response.data;
    },
  });

  const form = useForm<answerform>({
    resolver: zodResolver(answerFormSchema), //Integrates with zod schema
    defaultValues: {
      title: title,
      content: "",
      questionType: "basic",
    },
  });

  const onSubmit = async (data: answerform) => {
    setShowLoader(true);
    getQuestions(data, {
      onError: (error) => {
        setShowLoader(false);
        if (error instanceof AxiosError) {
          if (error.response?.status === 500) {
            toast({
              title: "Error",
              description: "Something went wrong. Please try again later.",
              variant: "destructive",
            });
          }
        }
      },
      onSuccess: ({ questionId }: { questionId: string }) => {
        setFinishedLoading(true);
        setTimeout(() => {
          router.push(`/checkanswerbasic/${questionId}`);
        }, 2000);
      },
    });
    // console.log(form.watch());
  };
  form.watch();

  return (
    <Card>
      <CardContent className="h-full pt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="h-full space-y-4">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="h-[90%]">
                  <FormControl>
                    <Textarea
                      placeholder="日本語文を入力してください"
                      {...field}
                      className="h-full resize-none text-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit">入力完了</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AnswerFormForBasicPractice;
