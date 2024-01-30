export default function Loading() {
  return (
    <div className="m-auto mt-14 w-full max-w-[700px] px-3">
      <div className="flex">
        <div className="mr-3 h-[150px] w-[240px] animate-pulse rounded-md bg-[#ffffff3f]"></div>
        <div className="mr-3 h-[150px] w-[240px] animate-pulse rounded-md bg-[#ffffff3f]"></div>
        <div className="h-[150px] w-[240px] animate-pulse rounded-md bg-[#ffffff3f]"></div>
      </div>
    </div>
  );
}
