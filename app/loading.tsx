export default function Loading() {
  return (
    <div className="mt-10 flex flex-col justify-center">
      <div className="px-12 h-[60svh] flex flex-col justify-center">
        <div className="w-[50%] h-8 animate-pulse bg-[#ffffff3f] rounded-md mb-2"></div>
        <div className="w-[30%] h-4 animate-pulse bg-[#ffffff3f] rounded-md mb-2"></div>
        <div className="w-[15%] h-4 animate-pulse bg-[#ffffff3f] rounded-md mb-2"></div>
        <div className="w-[20%] h-4 animate-pulse bg-[#ffffff3f] rounded-md mb-4"></div>
      </div>
      <div className="mx-12 w-[120px] h-8 animate-pulse bg-[#ffffff3f] rounded-md mb-2"></div>
      <div className="flex px-12">
        <div className="h-[200px] w-[150px] animate-pulse bg-[#ffffff3f] rounded-md mr-3"></div>
        <div className="h-[200px] w-[150px] animate-pulse bg-[#ffffff3f] rounded-md mr-3"></div>
        <div className="h-[200px] w-[150px] animate-pulse bg-[#ffffff3f] rounded-md"></div>
      </div>
    </div>
  );
}
