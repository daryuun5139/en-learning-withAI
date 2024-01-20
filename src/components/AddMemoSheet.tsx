"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { memoFormSchema } from "@/schema/memoform";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { useToast } from "./ui/use-toast";
import { title } from "process";
import { Textarea } from "./ui/textarea";

type Props = {
  questionId: string;
};
type memoform = z.infer<typeof memoFormSchema>;

const AddMemoSheet = ({ questionId }: Props) => {
  //questionIdの通し方が謎。questionId: stringではなぜダメなのか。
  const router = useRouter();
  const [showLoader, setShowLoader] = useState(false);
  const [finishedLoading, setFinishedLoading] = useState(false);
  const { toast } = useToast();
  const { mutate: getMemo, isLoading } = useMutation({
    mutationFn: async ({ title, content, category, favorite, questionId }: memoform) => {
      const response = await axios.post("/api/memo", {
        title,
        content,
        category,
        favorite,
        questionId,
      });
      return response.data;
    },
  });

  const form = useForm<memoform>({
    resolver: zodResolver(memoFormSchema), //Integrates with zod schema
    defaultValues: {
      title: "",
      content: "",
      favorite: false,
      questionId: questionId,
    },
  });

  const onSubmit = async (data: memoform) => {
    console.log(data);
    setShowLoader(true);
    getMemo(data, {
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
        //response.dataからもってきた。
        setFinishedLoading(true);
        setTimeout(() => {
          router.refresh(); //現在のrouteを再レンダリング。
        }, 2000);
        form.reset();
      },
    });
  };
  form.watch();

  return (
    <>
      <Sheet modal={false}>
        <SheetTrigger asChild>
          <Button variant="outline" className="w-full bg-slate-200 py-4 text-xl font-bold">
            create new memo
          </Button>
        </SheetTrigger>
        <SheetContent side={"bottom"} className="h-[300px] pt-4">
          <SheetHeader className="flex flex-row items-center gap-6">
            <SheetTitle className="text-2xl font-bold">create new memo</SheetTitle>
            <SheetDescription>
              Enter the things you want to memo here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <div className="mb-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="mt-4 flex justify-between">
                  <div className="flex w-[30%] flex-col gap-4">
                    {/* メモタイトル入力 */}
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter a title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* カテゴリー選択（word、phrase、grammar、other） */}
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field: category }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select onValueChange={category.onChange} defaultValue="">
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="word">word</SelectItem>
                              <SelectItem value="phrase">phrase</SelectItem>
                              <SelectItem value="grammar">grammar</SelectItem>
                              <SelectItem value="other">other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <SheetClose asChild>
                      <Button type="submit" className="w-[150px]">
                        Save memo
                      </Button>
                    </SheetClose>
                  </div>
                  <div className="flex w-[65%] flex-col gap-4">
                    {/* メモ本文入力 */}
                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Content</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter a content"
                              className="h-full resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AddMemoSheet;
