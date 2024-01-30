import NavigationMovie from "@/components/homePage/navigationMovie/NavigationMovie";

export default function Loading() {
  return (
    <div>
      <NavigationMovie />
      <div className="mt-10 flex flex-col justify-center">
        <div className="flex h-[60svh] flex-col justify-center px-12 ">
          <div className="mb-2 h-8 w-[50%] animate-pulse rounded-md bg-[#ffffff3f]"></div>
          <div className="mb-2 h-4 w-[30%] animate-pulse rounded-md bg-[#ffffff3f]"></div>
          <div className="mb-2 h-4 w-[15%] animate-pulse rounded-md bg-[#ffffff3f]"></div>
          <div className="mb-4 h-4 w-[20%] animate-pulse rounded-md bg-[#ffffff3f]"></div>
        </div>
        <div className="mx-12 mb-2 h-8 w-[120px] animate-pulse rounded-md bg-[#ffffff3f]"></div>
        <div className="flex px-12">
          <div className="mr-3 h-[150px] w-[120px] animate-pulse rounded-md bg-[#ffffff3f] sm:h-[200px] sm:w-[150px]"></div>
          <div className="mr-3 h-[150px] w-[120px] animate-pulse rounded-md bg-[#ffffff3f] sm:h-[200px] sm:w-[150px]"></div>
          <div className="h-[150px] w-[120px] animate-pulse rounded-md bg-[#ffffff3f] sm:h-[200px] sm:w-[150px]"></div>
        </div>
      </div>
    </div>
  );
}
