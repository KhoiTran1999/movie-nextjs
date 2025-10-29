import { SignIn } from '@clerk/nextjs';
import Image from 'next/image';

export default function Page() {
  return (
    <div className="relative">
      <div className="absolute left-0 top-0 h-full w-full brightness-[0.3]">
        <Image
          src={'/login-background.jpg'}
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
        <div className="px-2">
          <p className="mt-3 animate-pulse break-words rounded-md bg-[#ffffffdc] p-2 text-sm font-bold tracking-wide text-[red]">
            Login with Microsoft Account to have a better watching experience
          </p>
        </div>
      </div>
    </div>
  );
}
