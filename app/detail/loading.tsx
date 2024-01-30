import NavigationMovie from "@/components/homePage/navigationMovie/NavigationMovie";

export default function Loading() {
  return (
    <div>
      <NavigationMovie />
      <div className="my-20 flex flex-col items-center justify-center px-12">
        <div className="mb-2 h-8 w-[50%] animate-pulse rounded-md bg-[#ffffff3f]"></div>
        <div className="mb-2 h-4 w-[30%] animate-pulse rounded-md bg-[#ffffff3f]"></div>
        <div className="mb-2 h-4 w-[15%] animate-pulse rounded-md bg-[#ffffff3f]"></div>
        <div className="mb-4 h-4 w-[20%] animate-pulse rounded-md bg-[#ffffff3f]"></div>
      </div>
      <div className="m-auto mt-14 w-full max-w-[700px] px-3">
        <div className="flex">
          <div className="mr-3 h-[150px] w-[240px] animate-pulse rounded-md bg-[#ffffff3f]"></div>
          <div className="mr-3 h-[150px] w-[240px] animate-pulse rounded-md bg-[#ffffff3f]"></div>
          <div className="h-[150px] w-[240px] animate-pulse rounded-md bg-[#ffffff3f]"></div>
        </div>
      </div>
    </div>
  );
}
