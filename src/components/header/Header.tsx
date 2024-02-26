import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Header = async () => {
  return (
    <div className="fixed inset-x-0 top-0 z-[10] mx-auto h-fit w-[1000px] bg-white px-10 py-2">
      <div className="mx-auto flex h-full items-center justify-between border-b border-zinc-300 pb-2">
        {/* ロゴ----------------------------------------------- */}
        <Link href={"/"} className="flex items-center gap-2">
          <p className="rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] dark:border-white md:block">
            Deeepin
          </p>
        </Link>
        {/* メニュートグル---------------------------------- */}
        <div className="flex w-fit items-center gap-2 pr-5">
          <Avatar>
            <AvatarImage src="/other/user.png" alt="avatarImg" />
            <AvatarFallback>G</AvatarFallback>
          </Avatar>
          <p className="text-lg font-semibold text-muted-foreground">Guest User</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
