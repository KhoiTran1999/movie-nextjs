import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="relative">
      <div className="absolute left-0 top-0 h-full w-full brightness-[0.3]">
        <Image
          src={"/login-background.jpg"}
          alt="Thumbnail"
          fill
          priority
          className="rounded object-cover"
          quality={100}
          sizes="100vw"
        />
      </div>
      <div className="relative flex h-[100svh] w-[100svw] flex-col items-center justify-center">
        <SignIn />
        <p className="mt-3 break-words rounded-md bg-[#ffffffdc] p-2 text-sm font-extrabold text-[black]">
          You're gonna have a fantastic Watching Experience when Login with
          Microsoft account
        </p>
      </div>
    </div>
  );
}
