export default function Loading() {
  return (
    <div className="max-w-[700px] mt-14 w-full m-auto">
      <div className="flex">
        <div className="w-[240px] h-[150px] animate-pulse bg-[#ffffff3f] rounded-md mr-3"></div>
        <div className="w-[240px] h-[150px] animate-pulse bg-[#ffffff3f] rounded-md mr-3"></div>
        <div className="w-[240px] h-[150px] animate-pulse bg-[#ffffff3f] rounded-md"></div>
      </div>
    </div>
  );
}
