import { PrismaClient } from "@prisma/client";
import "server-only"; // Client Components でインポートした場合に、ビルドエラーを吐かせる

//グローバル変数を追加する
declare global {
  // eslint-disable-next-line no-var, no-unused-vars
  var cachedPrisma: PrismaClient;
}

export let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
  //本番環境の場合
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  prisma = global.cachedPrisma;
}
