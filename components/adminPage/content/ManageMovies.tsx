"use client";

import Axios from "@/utils/axios";
import { Button, Table, Tag, Modal, Result, Popconfirm, message } from "antd";
import { useEffect, useState } from "react";

import { categoryItems } from "@/constant/categories";
import CreateMovieModal from "./CreateMovieModal";
import { useDispatch, useSelector } from "react-redux";
import { movieListSelector, statisticSelector } from "@/utils/redux/selector";
import { setmovieList } from "@/utils/redux/slices/data/movieListSlice";
import { setStatistics } from "@/utils/redux/slices/data/statisticSlice";
import UpdateMovieModal from "./UpdateMovieModal";
import { setMovieId } from "@/utils/redux/slices/data/movieIdSlice";

const { Column, ColumnGroup } = Table;

interface featureType {
  featureId: number;
  name: string;
}

interface categoryType {
  categoryId: number;
  name: string;
}

interface ApiType {
  categories: categoryType[];
  dateCreated: string;
  englishName: string;
  feature: featureType;
  mark: number;
  movieId: string;
  status: string;
  thumbnail: string;
  time: number;
  totalEpisodes: number;
  totalSeasons: number;
  vietnamName: string;
}

interface DataType {
  movieId: React.Key;
  thumbnail: string;
  englishName: string;
  time: number;
  mark: number;
  status: string;
  feature: string;
  categories: string[];
  dateCreated: string;
}

const ManageMovies = () => {
  const dispatch = useDispatch();

  const statistics = useSelector(statisticSelector);
  const data = useSelector(movieListSelector);

  const [messageApi, contextHolder] = message.useMessage();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteLoadingState, setDeleteLoadingState] = useState<
    Record<string, boolean>
  >({});
  const [isError, setIsError] = useState<boolean>(false);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: statistics.Upcoming + statistics.Release + statistics.Pending,
    showSizeChanger: false,
  });

  const filterData = (arr: []) => {
    const filteredData = arr.map((val: ApiType) => {
      const feature = val.feature.name;
      const categories = val.categories.map((val: categoryType) => val.name);
      const newObj = {
        movieId: val.movieId,
        thumbnail: val.thumbnail,
        englishName: val.englishName,
        time: val.time,
        mark: val.mark,
        status: val.status,
        feature,
        categories,
        dateCreated: val.dateCreated,
        deletedButton: val.movieId,
      };
      return newObj;
    });
    return filteredData;
  };

  useEffect(() => {
    const fetchApi = async () => {
      try {
        // setLoading(true);
        const res = await Axios("Movies", {
          params: {
            page: pagination.current,
            eachPage: pagination.pageSize,
          },
        });

        dispatch(setmovieList(filterData(res.data)));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setIsError(true);
      }
    };
    fetchApi();
  }, [pagination.current, pagination.pageSize]);

  const handleTableChange = (pagination: any) => {
    setPagination(pagination);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOkUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const handleCancelUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  //Message when created movie
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Deleted successfully!",
    });
  };

  const errorRes = (error: any) => {
    messageApi.open({
      type: "error",
      content: error,
    });
  };

  const handleDelete = async (val: any) => {
    try {
      setDeleteLoadingState((prev) => ({ ...prev, [val]: true }));
      await Axios.delete(`Movie/${val}`);

      const res = await Axios("/Movies", {
        params: {
          page: 1,
          eachPage: 5,
        },
      });
      dispatch(setmovieList(filterData(res.data)));
      setPagination({
        current: 1,
        pageSize: 5,
        total: statistics.Upcoming + statistics.Release + statistics.Pending,
        showSizeChanger: false,
      });
      setDeleteLoadingState((prev) => ({ ...prev, [val]: false }));
      success();

      try {
        const res = await Axios("Admin/Statistics");
        dispatch(setStatistics(res.data));
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
      errorRes("Failed to delete the movie");
      setDeleteLoadingState((prev) => ({ ...prev, [val]: false }));
    }
  };

  const handleUpdateModalOpen = async (movieId: any) => {
    dispatch(setMovieId(movieId));
    setIsUpdateModalOpen(true);
  };

  return (
    <>
      {loading ? (
        <>
          {isError ? (
            <Result
              status="500"
              title="Sorry, something went wrong"
              extra={
                <Button type="primary" href="/">
                  Back Home
                </Button>
              }
            />
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <i className="fa-solid fa-spinner-scale text-6xl animate-spin text-[red]"></i>
            </div>
          )}
        </>
      ) : (
        <div>
          {contextHolder}
          <div className="flex justify-end mb-8">
            <button
              onClick={showModal}
              className="relative inline-flex active:scale-95 items-center justify-start px-5 py-3 overflow-hidden font-bold rounded-2xl group transition-all"
            >
              <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
              <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
              <span className="relative w-full text-left tracking-wide text-base text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">
                <i className="fa-regular fa-plus mr-2"></i> New Movie
              </span>
              <span className="absolute inset-0 border-2 border-white rounded-2xl"></span>
            </button>
          </div>
          <Table
            dataSource={data}
            pagination={pagination}
            onChange={handleTableChange}
          >
            <Column
              title="Video"
              dataIndex="thumbnail"
              key="thumbnail"
              render={(image: string, _, idx) => (
                <img
                  src={image}
                  alt="thumbnail"
                  className="w-[100px] h-[160px] object-contain"
                  key={idx}
                />
              )}
            />
            <Column
              title="Name"
              dataIndex="englishName"
              key="englishName"
              render={(name, _, idx) => (
                <p className="font-bold" key={idx}>
                  {name}
                </p>
              )}
            />
            <Column
              title="Time"
              dataIndex="time"
              key="time"
              render={(time, _, idx) => (
                <span key={idx}>
                  {time ? `${time} minutes` : "no duration"}
                </span>
              )}
            />
            <Column
              title="Mark"
              dataIndex="mark"
              key="mark"
              render={(mark, _, idx) => (
                <span key={idx}>{mark ? `${mark}/10` : "unrated"}</span>
              )}
            />
            <Column title="Status" dataIndex="status" key="status" />
            <Column title="Feature" dataIndex="feature" key="feature" />
            <Column
              title="Categories"
              dataIndex="categories"
              key="categories"
              render={(tags: string[], _, idx) => (
                <div key={idx}>
                  {tags.map((tag, idx) => {
                    let color = "blue";
                    categoryItems.some((val) => {
                      if (tag === val.name) {
                        color = val.color;
                        return true;
                      }
                      return false;
                    });
                    return (
                      <Tag style={{ marginTop: "5px" }} color={color} key={idx}>
                        {tag}
                      </Tag>
                    );
                  })}
                </div>
              )}
            />
            <Column
              title="Operation"
              dataIndex="deletedButton"
              key="deletedButton"
              render={(val, _, idx) => (
                <div className="flex items-center" key={idx}>
                  <Button
                    className="mr-3"
                    onClick={() => handleUpdateModalOpen(val)}
                  >
                    Update
                  </Button>
                  <Popconfirm
                    title="Delete movie"
                    description="Are you sure to delete this movie?"
                    onConfirm={() => handleDelete(val)}
                  >
                    <Button
                      type="primary"
                      danger
                      loading={deleteLoadingState[val]}
                    >
                      Delete
                    </Button>
                  </Popconfirm>
                </div>
              )}
            />
          </Table>
          <UpdateMovieModal
            isUpdateModalOpen={isUpdateModalOpen}
            handleOkUpdateModal={handleOkUpdateModal}
            handleCancelUpdateModal={handleCancelUpdateModal}
          />
          <CreateMovieModal
            isModalOpen={isModalOpen}
            handleOk={handleOk}
            handleCancel={handleCancel}
          />
        </div>
      )}
    </>
  );
};

export default ManageMovies;
