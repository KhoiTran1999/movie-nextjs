"use client";

import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";
import { CategoryType, StatisticType } from "@/types";

ChartJS.register(ArcElement, Tooltip, Legend, Colors);

interface DashboardType {
  statisticsData: StatisticType;
  categoryData: CategoryType;
}

const Dashboard = async (props: DashboardType) => {
  const { categoryData, statisticsData } = props;

  const data = {
    labels: [
      "Action",
      "Adventure",
      "Anime",
      "Comedy",
      "Drama",
      "Fantasy",
      "Horror",
      "Musical",
      "Mystery",
      "Romance",
      "Thriller",
      "Historical",
      "War",
      "Violence",
      "Nudity",
      "Science",
    ],
    datasets: [
      {
        data: [
          categoryData.Action,
          categoryData.Adventure,
          categoryData.Anime,
          categoryData.Comedy,
          categoryData.Drama,
          categoryData.Fantasy,
          categoryData.Historical,
          categoryData.Horror,
          categoryData.Musical,
          categoryData.Mystery,
          categoryData.Nudity,
          categoryData.Romance,
          categoryData.Science,
          categoryData.Thriller,
          categoryData.Violence,
          categoryData.War,
        ],
        backgroundColor: [
          "#FFC0CB", // Pink
          "#FFA07A", // Light Salmon
          "#FFD700", // Gold
          "#32CD32", // Lime Green
          "#00BFFF", // Deep Sky Blue
          "#87CEEB", // Sky Blue
          "#FF6347", // Tomato
          "#40E0D0", // Turquoise
          "#9370DB", // Medium Purple
          "#FF8C00", // Dark Orange
          "#FF1493", // Deep Pink
          "#7B68EE", // Medium Slate Blue
          "#FFDAB9", // Peach Puff
          "#FF69B4", // Hot Pink
          "#20B2AA", // Light Sea Green
          "#00FA9A", // Medium Spring Green
        ],
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {},
      },
    },
  };

  return (
    <div>
      <div className="flex flex-wrap items-center">
        <div className="relative mb-5 mr-5 w-60 rounded-md bg-gradient-to-r from-[#DBCC95] to-[#cd8d7a] p-5 text-center shadow-[0_0_10px_5px_#cd8d7a9f] transition-transform hover:scale-105">
          <h3 className="text-lg font-semibold text-white">Upcoming</h3>
          <p className="mt-2 text-4xl font-bold text-white">
            {statisticsData.upcoming ?? 0}
          </p>
          <i className="fa-solid fa-rocket-launch absolute right-3 top-3 text-2xl text-[#DBCC95]"></i>
        </div>
        <div className="relative mb-5 mr-5  w-60 rounded-md bg-gradient-to-r from-[#AC87C5] to-[#756ab6] p-5 text-center shadow-[0_0_10px_5px_#756ab69f] transition-transform hover:scale-105">
          <h3 className="text-lg font-semibold text-white">Pending</h3>
          <p className="mt-2 text-4xl font-bold text-white">
            {statisticsData.pending ?? 0}
          </p>
          <i className="fa-solid fa-loader absolute right-3 top-3 text-2xl text-[#AC87C5]"></i>
        </div>
        <div className="relative mb-5 mr-5 w-60 rounded-md bg-gradient-to-r from-[#AFC8AD] to-[#88AB8E] p-5 text-center shadow-[0_0_10px_5px_#88AB8E9f] transition-transform hover:scale-105">
          <h3 className="text-lg font-semibold text-white">Released</h3>
          <p className="mt-2 text-4xl font-bold text-white">
            {statisticsData.released ?? 0}
          </p>
          <i className="fa-solid fa-sparkles absolute right-3 top-3 text-2xl text-[#AFC8AD]"></i>
        </div>
        <div className="relative mb-5 mr-5 w-60 rounded-md bg-gradient-to-r from-[#FFC0D9] to-[#FF90BC] p-5 text-center shadow-[0_0_10px_5px_#FF90BC9f] transition-transform hover:scale-105">
          <h3 className="text-lg font-semibold text-white">Deleted</h3>
          <p className="mt-2 text-4xl font-bold text-white">
            {statisticsData.deleted ?? 0}
          </p>
          <i className="fa-solid fa-trash absolute right-3 top-3 text-2xl text-[#FFC0D9]"></i>
        </div>
        <div className="relative mb-5 mr-5 w-60 rounded-md bg-gradient-to-r from-[#EDDBC7] to-[#A7727D] p-5 text-center shadow-[0_0_10px_5px_#a7727da5] transition-transform hover:scale-105">
          <h3 className="text-lg font-semibold text-white">Total Movie</h3>
          <p className="mt-2 text-4xl font-bold text-white">
            {statisticsData.released
              ? statisticsData.upcoming +
                statisticsData.released +
                statisticsData.pending
              : 0}
          </p>
          <i className="fa-solid fa-clapperboard-play absolute right-3 top-3 text-2xl text-[#EDDBC7]"></i>
        </div>
        <div className="relative mb-5 mr-5 w-60 rounded-md bg-gradient-to-r from-[#9F8772] to-[#665A48] p-5 text-center shadow-[0_0_10px_5px_#665A489f] transition-transform hover:scale-105">
          <h3 className="text-lg font-semibold text-white">Total Account</h3>
          <p className="mt-2 text-4xl font-bold text-white">
            {statisticsData.account ?? 0}
          </p>
          <i className="fa-solid fa-users absolute right-3 top-3 text-2xl text-[#9F8772]"></i>
        </div>
      </div>
      <div>
        <div className="flex justify-center">
          <div className="flex w-1/2 ">
            <Pie data={data} options={options} />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex w-1/2 ">
            <Pie data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
