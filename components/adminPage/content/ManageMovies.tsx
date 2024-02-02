"use client";

import { Button, Table, Tag, Popconfirm, message, Tooltip } from "antd";
import { useEffect, useState } from "react";

import { categoryItems } from "@/constant/categories";
import CreateMovieModal from "./CreateMovieModal";
import { useDispatch } from "react-redux";
import UpdateMovieModal from "./UpdateMovieModal";
import { setMovieId } from "@/utils/redux/slices/data/movieIdSlice";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MovieAntdTableType } from "@/types";
import { deleteMovieAction, revalidatePathAction } from "@/components/actions";
import { LazyLoadImage } from "react-lazy-load-image-component";

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

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [deleteLoadingState, setDeleteLoadingState] = useState<boolean>(false);
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

  const handleUpdateModalOpen = async (movieId: any) => {
    dispatch(setMovieId(movieId));
    setIsUpdateModalOpen(true);
  };

  const handleTableChange = (
    pagination: any,
    filter: any,
    sorter: any,
    extra: any,
  ) => {
    if (pagination && pagination.current) {
      const params = new URLSearchParams(searchParams);
      params.set("page", pagination.current);
      replace(`${pathname}?${params.toString()}`);
      setIsFetching(true);
    }
  };

  const handleDelete = async (value: any) => {
    setDeleteLoadingState(true);
    const res = await deleteMovieAction(value);
    await revalidatePathAction("admin/manageMovies");
    setDeleteLoadingState(false);
    if (res) return message.success("Movie deleted successfully!");
    message.error("Failed to delete movie!");
  };

  return (
    <div>
      {contextHolder}
      <div className="mb-8 flex justify-end">
        <button
          onClick={showModal}
          className="group relative inline-flex items-center justify-start overflow-hidden rounded-2xl px-5 py-3 font-bold transition-all active:scale-95"
        >
          <span className="absolute left-0 top-0 h-32 w-32 -translate-y-2 translate-x-12 rotate-45 bg-white opacity-[3%]"></span>
          <span className="absolute left-0 top-0 -mt-1 h-48 w-48 -translate-x-56 -translate-y-24 rotate-45 bg-white opacity-100 transition-all duration-500 ease-in-out group-hover:-translate-x-8"></span>
          <span className="relative w-full text-left text-base tracking-wide text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">
            <i className="fa-regular fa-plus mr-2"></i> Add Movie
          </span>
          <span className="absolute inset-0 rounded-2xl border-2 border-white"></span>
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
            <LazyLoadImage
              key={idx}
              alt="Thumbnail"
              src={image}
              effect="blur"
              loading="lazy"
              className="h-[160px] rounded-md object-contain"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/errorThumbnail.jpg";
              }}
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
          title="Action"
          dataIndex="deletedButton"
          key="deletedButton"
          render={(val, _, idx) => (
            <div className="flex items-center" key={idx}>
              <Tooltip title="Update" placement="bottom">
                <Button
                  type="text"
                  disabled={deleteLoadingState}
                  onClick={() => handleUpdateModalOpen(val)}
                >
                  <i className="fa-solid fa-pen-to-square text-2xl"></i>
                </Button>
              </Tooltip>
              <Popconfirm
                title="Delete movie"
                description="Are you sure to delete this movie?"
                onConfirm={() => handleDelete(val)}
              >
                <Tooltip title="Delete" placement="bottom">
                  <Button type="text" disabled={deleteLoadingState}>
                    <i className="fa-solid fa-trash text-[22px]"></i>
                  </Button>
                </Tooltip>
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
