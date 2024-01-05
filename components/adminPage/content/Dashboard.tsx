"use client";

import Axios from "@/utils/axios";
import { statisticSelector } from "@/utils/redux/selector";
import { setStatistics } from "@/utils/redux/slices/data/statisticSlice";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useDispatch, useSelector } from "react-redux";

interface statisticType {
  Upcoming: number;
  Pending: number;
  Release: number;
  Deleted: number;
  Account: number;
}

const Dashboard = () => {
  const dispatch = useDispatch();
  const statistics = useSelector(statisticSelector);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true);
      const res = await Axios("Admin/Statistics");
      dispatch(setStatistics(res.data));
      setLoading(false);
    };
    fetchApi();
  }, []);

  return (
    <>
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <i className="fa-solid fa-spinner-scale text-6xl animate-spin text-[red]"></i>
        </div>
      ) : (
        <div className="flex items-center flex-wrap">
          <div className="p-5 mr-5 mb-5 shadow-[0_0_10px_5px_#cd8d7a9f] bg-gradient-to-r from-[#DBCC95] to-[#cd8d7a] w-60 rounded-md text-center relative">
            <h3 className="text-lg font-semibold text-white">Upcoming</h3>
            <p className="text-4xl font-bold text-white mt-2">
              <CountUp
                className="account-balance"
                start={0}
                end={statistics.Upcoming}
                duration={2}
                useEasing={true}
                separator=","
              />
            </p>
            <i className="fa-solid fa-rocket-launch text-2xl text-[#DBCC95] absolute right-3 top-3"></i>
          </div>
          <div className="p-5 mr-5 mb-5 shadow-[0_0_10px_5px_#756ab69f] bg-gradient-to-r from-[#AC87C5] to-[#756ab6] w-60 rounded-md text-center relative">
            <h3 className="text-lg font-semibold text-white">Pending</h3>
            <p className="text-4xl font-bold text-white mt-2">
              <CountUp
                className="account-balance"
                start={0}
                end={statistics.Pending}
                duration={2}
                useEasing={true}
                separator=","
              />
            </p>
            <i className="fa-solid fa-loader text-2xl text-[#AC87C5] absolute right-3 top-3"></i>
          </div>
          <div className="p-5 mr-5 mb-5 shadow-[0_0_10px_5px_#88AB8E9f] bg-gradient-to-r from-[#AFC8AD] to-[#88AB8E] w-60 rounded-md text-center relative">
            <h3 className="text-lg font-semibold text-white">Released</h3>
            <p className="text-4xl font-bold text-white mt-2">
              <CountUp
                className="account-balance"
                start={statistics.Release}
                end={40}
                duration={2}
                useEasing={true}
                separator=","
              />
            </p>
            <i className="fa-solid fa-sparkles text-2xl text-[#AFC8AD] absolute right-3 top-3"></i>
          </div>
          <div className="p-5 mr-5 mb-5 shadow-[0_0_10px_5px_#FF90BC9f] bg-gradient-to-r from-[#FFC0D9] to-[#FF90BC] w-60 rounded-md text-center relative">
            <h3 className="text-lg font-semibold text-white">Deleted</h3>
            <p className="text-4xl font-bold text-white mt-2">
              <CountUp
                className="account-balance"
                start={0}
                end={statistics.Deleted}
                duration={2}
                useEasing={true}
                separator=","
              />
            </p>
            <i className="fa-solid fa-trash text-2xl text-[#FFC0D9] absolute right-3 top-3"></i>
          </div>
          <div className="p-5 mr-5 mb-5 shadow-[0_0_10px_5px_#a7727da5] bg-gradient-to-r from-[#EDDBC7] to-[#A7727D] w-60 rounded-md text-center relative">
            <h3 className="text-lg font-semibold text-white">Total Movie</h3>
            <p className="text-4xl font-bold text-white mt-2">
              <CountUp
                className="account-balance"
                start={0}
                end={
                  statistics.Upcoming + statistics.Release + statistics.Pending
                }
                duration={2}
                useEasing={true}
                separator=","
              />
            </p>
            <i className="fa-solid fa-clapperboard-play text-2xl text-[#EDDBC7] absolute right-3 top-3"></i>
          </div>
          <div className="p-5 mr-5 mb-5 shadow-[0_0_10px_5px_#665A489f] bg-gradient-to-r from-[#9F8772] to-[#665A48] w-60 rounded-md text-center relative">
            <h3 className="text-lg font-semibold text-white">Total Account</h3>
            <p className="text-4xl font-bold text-white mt-2">
              <CountUp
                className="account-balance"
                start={0}
                end={statistics.Account}
                duration={2}
                useEasing={true}
                separator=","
              />
            </p>
            <i className="fa-solid fa-users text-2xl text-[#9F8772] absolute right-3 top-3"></i>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
