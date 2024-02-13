import NavigationMovie from "@/components/homePage/navigationMovie/NavigationMovie";

export default function Loading() {
  return (
    <div className="m-auto mt-14 w-full max-w-[700px]">
      <NavigationMovie />

      <div className="flex justify-center">
        <div className="mt-20 h-8 w-[200px] animate-pulse rounded-md bg-[#ffffff3f]"></div>
      </div>
    </div>
  );
}
