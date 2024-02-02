import NavigationMovie from "@/components/homePage/navigationMovie/NavigationMovie";

export default function Loading() {
  return (
    <div className="m-auto mt-14 w-full max-w-[700px]">
      <NavigationMovie />
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
