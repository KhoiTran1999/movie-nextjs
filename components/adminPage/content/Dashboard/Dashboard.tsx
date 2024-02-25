"use client";

import { Chart } from "react-google-charts";

import { CategoryType, StatisticType } from "@/types";

interface featureType {
  CinemaFilm: string;
  StandaloneFilm: string;
  TVSeries: string;
}

interface DashboardType {
  statisticsData: StatisticType;
  categoryData: CategoryType;
  featureData: featureType;
}

const Dashboard = async (props: DashboardType) => {
  const { categoryData, statisticsData, featureData } = props;

  const categoryDataChart = [
    ["Element", "Density", { role: "style" }],
    ["Action", categoryData.Action, "#FFC0CB"],
    ["Adventure", categoryData.Adventure, "#FFA07A"],
    ["Anime", categoryData.Anime, "#FFD700"],
    ["Comedy", categoryData.Comedy, "#32CD32"],
    ["Drama", categoryData.Drama, "#00BFFF"],
    ["Fantasy", categoryData.Fantasy, "#87CEEB"],
    ["Horror", categoryData.Horror, "#40E0D0"],
    ["Musical", categoryData.Musical, "#9370DB"],
    ["Mystery", categoryData.Mystery, "#FF8C00"],
    ["Romance", categoryData.Romance, "#FF1493"],
    ["Thriller", categoryData.Thriller, "#7B68EE"],
    ["Historical", categoryData.Historical, "#FFDAB9"],
    ["War", categoryData.War, "#FF6347"],
    ["Violence", categoryData.Violence, "#FF69B4"],
    ["Nudity", categoryData.Nudity, "#20B2AA"],
    ["Science", categoryData.Science, "#00FA9A"],
  ];

  const featureDataChart = [
    ["Task", "Hours per Day"],
    ["Cinema", featureData.CinemaFilm],
    ["Stanalone", featureData.StandaloneFilm],
    ["TV Series", featureData.TVSeries],
  ];

  const optionsBarChart = {
    hAxis: {
      //use style for horizontal axis
      textStyle: { color: "white" },
    },
    vAxis: {
      //use style for horizontal axis
      textStyle: { color: "white" },
    },
    chartArea: {
      width: "90%",
    },
    legend: "none",
    backgroundColor: "transparent",
  };

  const optionsPieChart = {
    backgroundColor: "transparent",
    legend: { textStyle: { color: "white" } },
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
      <div className="mt-7">
        <Chart
          chartType="ColumnChart"
          width="100%"
          height={"400px"}
          data={categoryDataChart}
          options={optionsBarChart}
        />
        <div className="flex justify-around">
          <Chart
            chartType="PieChart"
            width="100%"
            height={"400px"}
            data={featureDataChart}
            options={optionsPieChart}
          />
          <Chart
            chartType="PieChart"
            width="100%"
            height={"400px"}
            data={featureDataChart}
            options={optionsPieChart}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
