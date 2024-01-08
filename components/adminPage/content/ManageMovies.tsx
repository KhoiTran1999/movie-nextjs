"use client";

import Axios from "@/utils/axios";
import { Button, Table, Tag, Modal, Result } from "antd";
import { useEffect, useState } from "react";

import { categoryItems } from "@/constant/categories";
import CreateMovieModal from "./CreateMovieModal";
import { useSelector } from "react-redux";
import { statisticSelector } from "@/utils/redux/selector";

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
  const statistics = useSelector(statisticSelector);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: statistics.Upcoming + statistics.Release + statistics.Pending,
    showSizeChanger: false,
  });

  useEffect(() => {
    const fetchApi = async () => {
      try {
        setLoading(true);
        const res = await Axios("/Movies", {
          params: {
            page: pagination.current,
            eachPage: pagination.pageSize,
          },
        });

        const filteredData = res.data.map((val: ApiType) => {
          const feature = val.feature.name;
          const categories = val.categories.map(
            (val: categoryType) => val.name
          );
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
          };
          return newObj;
        });
        setData(filteredData);
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
              render={(time, _, idx) => <span key={idx}>{time} minutes</span>}
            />
            <Column
              title="Mark"
              dataIndex="mark"
              key="mark"
              render={(mark, _, idx) => <span key={idx}>{mark}/10</span>}
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
              dataIndex="operation"
              key="operation"
              render={(val, _, idx) => (
                <div className="flex items-center" key={idx}>
                  <Button className="mr-3">Update</Button>
                  <Button type="primary" danger>
                    Delete
                  </Button>
                </div>
              )}
            />
          </Table>
          <Modal
            title="Create Movie"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            centered
            footer={[
              <Button key="back" type="text" onClick={handleCancel}>
                Cancel
              </Button>,
              <Button
                key="submit"
                htmlType="submit"
                loading={saveLoading}
                onClick={handleOk}
              >
                Save
              </Button>,
            ]}
          >
            <CreateMovieModal />
          </Modal>
        </div>
      )}
    </>
  );
};

export default ManageMovies;
