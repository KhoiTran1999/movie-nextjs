"use client";

import { Button, Table, Tag, Popconfirm, message } from "antd";
import { useEffect, useState } from "react";

import { categoryItems } from "@/constant/categories";
import CreateMovieModal from "./CreateMovieModal";
import { useDispatch } from "react-redux";
import UpdateMovieModal from "./UpdateMovieModal";
import { setMovieId } from "@/utils/redux/slices/data/movieIdSlice";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MovieAntdTableType } from "@/types";

interface IProps {
  movieList: MovieAntdTableType[] | [];
  meta: {
    current: number;
    pageSize: number;
    total: number;
  };
}

const { Column } = Table;

const ManageMovies = (props: IProps) => {
  const { movieList, meta } = props;

  const dispatch = useDispatch();

  const [messageApi, contextHolder] = message.useMessage();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [deleteLoadingState, setDeleteLoadingState] = useState<
    Record<string, boolean>
  >({});
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    if (movieList) {
      setIsFetching(false);
    }
  }, [movieList]);

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

  const handleUpdateModalOpen = async (movieId: any) => {
    dispatch(setMovieId(movieId));
    setIsUpdateModalOpen(true);
  };

  const handleTableChange = (
    pagination: any,
    filter: any,
    sorter: any,
    extra: any
  ) => {
    if (pagination && pagination.current) {
      const params = new URLSearchParams(searchParams);
      params.set("page", pagination.current);
      replace(`${pathname}?${params.toString()}`);
      setIsFetching(true);
    }
  };

  return (
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
            <i className="fa-regular fa-plus mr-2"></i> Add Movie
          </span>
          <span className="absolute inset-0 border-2 border-white rounded-2xl"></span>
        </button>
      </div>
      <Table
        dataSource={movieList}
        pagination={{ ...meta }}
        onChange={handleTableChange}
        loading={isFetching}
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
            <span key={idx}>{time ? `${time} minutes` : "no duration"}</span>
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
                // onConfirm={() => handleDelete(val)}
              >
                <Button type="primary" danger loading={deleteLoadingState[val]}>
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
  );
};

export default ManageMovies;
