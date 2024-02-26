import { createClient } from "microcms-js-sdk";
import type { MicroCMSImage, MicroCMSQueries } from "microcms-js-sdk";

export type TranslateQuestion = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: string;
};

export type ImageQuestion = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  image: MicroCMSImage;
};

export type BasicQuestion = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  overview: string;
  contents: content[];
};

type content = {
  [key: string]: string;
};

export const client = createClient({
  serviceDomain: "dcnf9ghklh",
  apiKey: process.env.API_KEY || "",
});

// 問題のリストを取得
export const getList = async (queries?: MicroCMSQueries) => {
  const [translateQList, imageQList, basicQList] = await Promise.all([
    client.getList<TranslateQuestion>({
      customRequestInit: {
        cache: "no-store",
      },
      endpoint: "translatequestions",
      queries,
    }),
    client.getList<ImageQuestion>({
      customRequestInit: {
        cache: "no-store",
      },
      endpoint: "imagequestions",
      queries,
    }),
    client.getList<BasicQuestion>({
      customRequestInit: {
        cache: "no-store",
      },
      endpoint: "basicpractice",
      queries,
    }),
  ]);
  return {
    translateQList: translateQList.contents,
    imageQList: imageQList.contents,
    basicQList: basicQList.contents,
  };
};

// 個々の問題を取得(LetterQuestion)
export const getDetail_translate = async (contentId: string, queries?: MicroCMSQueries) => {
  const translateQDetail = await client.getListDetail<TranslateQuestion>({
    customRequestInit: {
      cache: "no-store",
    },
    endpoint: "translatequestions",
    contentId,
    queries,
  });
  return translateQDetail;
};

// 個々の問題を取得(ImageQuestion)
export const getDetail_image = async (contentId: string, queries?: MicroCMSQueries) => {
  const imageQDetail = await client.getListDetail<ImageQuestion>({
    customRequestInit: {
      cache: "no-store",
    },
    endpoint: "imagequestions",
    contentId,
    queries,
  });
  return imageQDetail;
};

// 個々の問題を取得(BasicQuestion)
export const getDetail_basic = async (contentId: string, queries?: MicroCMSQueries) => {
  const basicQDetail = await client.getListDetail<BasicQuestion>({
    customRequestInit: {
      cache: "no-store",
    },
    endpoint: "basicpractice",
    contentId,
    queries,
  });
  return basicQDetail;
};
