import Dashboard from "@/components/adminPage/content/Dashboard";

export default function Loading() {
  return (
    <div className="flex flex-wrap items-center">
      <div className="relative mb-5 mr-5 w-60 rounded-md bg-gradient-to-r from-[#DBCC95] to-[#cd8d7a] p-5 text-center shadow-[0_0_10px_5px_#cd8d7a9f]">
        <h3 className="text-lg font-semibold text-white">Upcoming</h3>
        <i className="fa-duotone fa-spinner-third fa-rotate-right mt-2 animate-spin text-4xl font-bold text-white"></i>
        <i className="fa-solid fa-rocket-launch absolute right-3 top-3 text-2xl text-[#DBCC95]"></i>
      </div>
      <div className="relative mb-5 mr-5 w-60 rounded-md bg-gradient-to-r from-[#AC87C5] to-[#756ab6] p-5 text-center shadow-[0_0_10px_5px_#756ab69f]">
        <h3 className="text-lg font-semibold text-white">Pending</h3>
        <i className="fa-duotone fa-spinner-third fa-rotate-right mt-2 animate-spin text-4xl font-bold text-white"></i>
        <i className="fa-solid fa-loader absolute right-3 top-3 text-2xl text-[#AC87C5]"></i>
      </div>
      <div className="relative mb-5 mr-5 w-60 rounded-md bg-gradient-to-r from-[#AFC8AD] to-[#88AB8E] p-5 text-center shadow-[0_0_10px_5px_#88AB8E9f]">
        <h3 className="text-lg font-semibold text-white">Released</h3>
        <i className="fa-duotone fa-spinner-third fa-rotate-right mt-2 animate-spin text-4xl font-bold text-white"></i>
        <i className="fa-solid fa-sparkles absolute right-3 top-3 text-2xl text-[#AFC8AD]"></i>
      </div>
      <div className="relative mb-5 mr-5 w-60 rounded-md bg-gradient-to-r from-[#FFC0D9] to-[#FF90BC] p-5 text-center shadow-[0_0_10px_5px_#FF90BC9f]">
        <h3 className="text-lg font-semibold text-white">Deleted</h3>
        <i className="fa-duotone fa-spinner-third fa-rotate-right mt-2 animate-spin text-4xl font-bold text-white"></i>
        <i className="fa-solid fa-trash absolute right-3 top-3 text-2xl text-[#FFC0D9]"></i>
      </div>
      <div className="relative mb-5 mr-5 w-60 rounded-md bg-gradient-to-r from-[#EDDBC7] to-[#A7727D] p-5 text-center shadow-[0_0_10px_5px_#a7727da5]">
        <h3 className="text-lg font-semibold text-white">Total Movie</h3>
        <i className="fa-duotone fa-spinner-third fa-rotate-right mt-2 animate-spin text-4xl font-bold text-white"></i>
        <i className="fa-solid fa-clapperboard-play absolute right-3 top-3 text-2xl text-[#EDDBC7]"></i>
      </div>
      <div className="relative mb-5 mr-5 w-60 rounded-md bg-gradient-to-r from-[#9F8772] to-[#665A48] p-5 text-center shadow-[0_0_10px_5px_#665A489f]">
        <h3 className="text-lg font-semibold text-white">Total Account</h3>
        <i className="fa-duotone fa-spinner-third fa-rotate-right mt-2 animate-spin text-4xl font-bold text-white"></i>
        <i className="fa-solid fa-users absolute right-3 top-3 text-2xl text-[#9F8772]"></i>
      </div>
    </div>
  );
}
