import NavigationMovie from "@/components/homePage/navigationMovie/NavigationMovie";

export default function Loading() {
  return (
    <div className="m-auto mt-14 w-full max-w-[700px]">
      <NavigationMovie />
      <div className="my-20 flex items-center justify-center ">
        <div className="flex w-[240px] flex-col justify-center">
          <div className="mb-2 h-8 w-[100%] animate-pulse rounded-md bg-[#ffffff3f]"></div>
          <div className="mb-2 h-4 w-[60%] animate-pulse rounded-md bg-[#ffffff3f]"></div>
          <div className="mb-2 h-4 w-[30%] animate-pulse rounded-md bg-[#ffffff3f]"></div>
          <div className="h-4 w-[40%] animate-pulse rounded-md bg-[#ffffff3f]"></div>
        </div>
        <div className="mx-5 h-[200px] w-[150px] animate-pulse rounded-md bg-[#ffffff3f]"></div>
      </div>
      <div className="mx-5 mb-5 max-w-[700px] border-t border-[#ffffff3f] px-3"></div>
      <div className="m-auto mt-14 w-full max-w-[700px] px-3">
        <div className="flex items-center justify-center">
          <div className="mr-3 h-[200px] w-[150px] animate-pulse rounded-md bg-[#ffffff3f]"></div>
          <div className="mr-3 h-[200px] w-[150px] animate-pulse rounded-md bg-[#ffffff3f]"></div>
          <div className="h-[200px] w-[150px] animate-pulse rounded-md bg-[#ffffff3f]"></div>
        </div>
      </div>
    </div>
  );
}
