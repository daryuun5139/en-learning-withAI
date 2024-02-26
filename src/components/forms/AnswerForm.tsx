//Letter, Image Practiceの解答フォーム
"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { answerFormSchema } from "@/schema/answerform";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ImageQuestion, TranslateQuestion } from "@/lib/microcms";
import { MicroCMSImage } from "microcms-js-sdk";
import { useToast } from "../ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  content?: string;
  image?: MicroCMSImage;
  questionType: string;
};
type answerform = z.infer<typeof answerFormSchema>;

const AnswerForm = ({ title, content, questionType }: Props) => {
  const router = useRouter();
  const [showLoader, setShowLoader] = useState(false);
  const [finishedLoading, setFinishedLoading] = useState(false);
  const { toast } = useToast();
  const { mutate: getQuestions, isLoading } = useMutation({
    mutationFn: async ({ title, content, questionType, answer }: answerform) => {
      const response = await axios.post("/api/qaSet", { title, content, questionType, answer });
      return response.data;
    },
  });

  const form = useForm<answerform>({
    resolver: zodResolver(answerFormSchema), //Integrates with zod schema
    defaultValues: {
      title: title,
      content: content,
      questionType: "translate",
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
          router.push(`/checkanswertranslate/${questionId}`);
        }, 2000);
      },
    });
  };
  form.watch();

  return (
    <Card>
      <CardHeader className="pb-0 pt-2">
        <CardTitle className="text-2xl font-bold">type your answer</CardTitle>
      </CardHeader>
      <CardContent className="h-[95%] pt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="h-full space-y-4">
            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem className="h-[90%]">
                  <FormControl>
                    <Textarea
                      placeholder="Type your answer"
                      {...field}
                      className="h-full resize-none text-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AnswerForm;
