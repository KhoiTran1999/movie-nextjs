import Dashboard from "@/components/adminPage/content/Dashboard/Dashboard";
import { Rocket } from "@/public/rocket";
import { LoadingIcon } from "@/public/loading";
import { Stars } from "@/public/stars";
import { Trash } from "@/public/trash";
import { Movie } from "@/public/movie";
import { GroupUser } from "@/public/groupUser";
import { Spin } from "antd";

export default function Loading() {
  return (
    <div className="flex flex-wrap items-center">
      <div className="relative mb-5 mr-5 w-60 rounded-md bg-gradient-to-r from-[#DBCC95] to-[#cd8d7a] p-5 text-center shadow-[0_0_10px_5px_#cd8d7a9f]">
        <h3 className="text-lg font-semibold text-white">Upcoming</h3>
        <div className="mt-2">
          <Spin spinning={true} size="large" />
        </div>
        <Rocket width={24} height={24} className="absolute right-3 top-3" />
      </div>
      <div className="relative mb-5 mr-5 w-60 rounded-md bg-gradient-to-r from-[#AC87C5] to-[#756ab6] p-5 text-center shadow-[0_0_10px_5px_#756ab69f]">
        <h3 className="text-lg font-semibold text-white">Pending</h3>
        <div className="mt-2">
          <Spin spinning={true} size="large" />
        </div>
        <LoadingIcon
          width={24}
          height={24}
          fill="#AC87C5"
          className="absolute right-3 top-3"
        />
      </div>
      <div className="relative mb-5 mr-5 w-60 rounded-md bg-gradient-to-r from-[#AFC8AD] to-[#88AB8E] p-5 text-center shadow-[0_0_10px_5px_#88AB8E9f]">
        <h3 className="text-lg font-semibold text-white">Released</h3>
        <div className="mt-2">
          <Spin spinning={true} size="large" />
        </div>
        <Stars
          width={24}
          height={24}
          fill="#AFC8AD"
          className="absolute right-3 top-3"
        />
      </div>
      <div className="relative mb-5 mr-5 w-60 rounded-md bg-gradient-to-r from-[#FFC0D9] to-[#FF90BC] p-5 text-center shadow-[0_0_10px_5px_#FF90BC9f]">
        <h3 className="text-lg font-semibold text-white">Deleted</h3>
        <div className="mt-2">
          <Spin spinning={true} size="large" />
        </div>
        <Trash
          width={24}
          height={24}
          fill="#FFC0D9"
          className="absolute right-3 top-3"
        />
      </div>
      <div className="relative mb-5 mr-5 w-60 rounded-md bg-gradient-to-r from-[#EDDBC7] to-[#A7727D] p-5 text-center shadow-[0_0_10px_5px_#a7727da5]">
        <h3 className="text-lg font-semibold text-white">Total Movie</h3>
        <div className="mt-2">
          <Spin spinning={true} size="large" />
        </div>
        <Movie
          width={24}
          height={24}
          fill="#EDDBC7"
          className="absolute right-3 top-3"
        />
      </div>
      <div className="relative mb-5 mr-5 w-60 rounded-md bg-gradient-to-r from-[#9F8772] to-[#665A48] p-5 text-center shadow-[0_0_10px_5px_#665A489f]">
        <h3 className="text-lg font-semibold text-white">Total Account</h3>
        <div className="mt-2">
          <Spin spinning={true} size="large" />
        </div>
        <GroupUser
          width={24}
          height={24}
          fill="#9F8772"
          className="absolute right-3 top-3"
        />
      </div>
    </div>
  );
}
