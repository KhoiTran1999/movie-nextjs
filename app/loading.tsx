export default function Loading() {
  return (
    <div className="px-12 h-[80svh] flex flex-col justify-center">
      <div className="w-[50%] h-8 animate-pulse bg-[#ffffff3f] rounded-md mb-2"></div>
      <div className="w-[30%] h-4 animate-pulse bg-[#ffffff3f] rounded-md mb-2"></div>
      <div className="w-[15%] h-4 animate-pulse bg-[#ffffff3f] rounded-md mb-2"></div>
      <div className="w-[20%] h-4 animate-pulse bg-[#ffffff3f] rounded-md mb-4"></div>
      <div className="flex mt-16">
        <div className="w-[240px] h-[150px] animate-pulse bg-[#ffffff3f] rounded-md mr-3"></div>
        <div className="w-[240px] h-[150px] animate-pulse bg-[#ffffff3f] rounded-md mr-3"></div>
        <div className="w-[240px] h-[150px] animate-pulse bg-[#ffffff3f] rounded-md"></div>
      </div>
    </div>
  );
}
