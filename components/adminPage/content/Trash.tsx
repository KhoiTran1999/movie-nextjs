"use client";

import { Button, Table, Tag, Popconfirm, message, Tooltip } from "antd";
import { useEffect, useState } from "react";

import { categoryItems } from "@/constant/categories";
import { useDispatch } from "react-redux";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MovieAntdTableType } from "@/types";
import { restoreMovieAction, revalidatePathAction } from "@/components/actions";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Axios from "@/utils/axios";

interface IProps {
  movieList: MovieAntdTableType[] | [];
  meta: {
    current: number;
    pageSize: number;
    total: number;
  };
}

const { Column } = Table;

const Trash = (props: IProps) => {
  const { movieList, meta } = props;

  const dispatch = useDispatch();

  const [messageApi, contextHolder] = message.useMessage();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [isLoading, setisLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    if (movieList) {
      setIsFetching(false);
    }
  }, [movieList]);

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

  const handleRestore = async (value: any) => {
    setisLoading(true);
    const res = await restoreMovieAction(value);
    setisLoading(false);
    if (res) {
      await revalidatePathAction("admin/manageMovies");
      return message.success("Movie restored successfully!");
    }
    message.error("Failed to restored movie!");
  };

  const handleClearAll = async () => {
    try {
      setisLoading(true);
      const res = await Axios.delete(`Movies`, {
        params: { status: "Deleted" },
      });
      await revalidatePathAction("admin/trash");
      message.success("All Movies are deleted successfully!");
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      message.error("Failed to clear all movie!");
    }
  };

  return (
    <div>
      {contextHolder}
      <div className="mb-8 flex justify-end">
        <button
          onClick={handleClearAll}
          disabled={isLoading}
          className={`${isLoading && "cursor-not-allowed text-gray-600"} group relative inline-flex items-center justify-start overflow-hidden rounded-2xl px-5 py-3 font-bold transition-all active:scale-95`}
        >
          <span className="absolute left-0 top-0 h-32 w-32 -translate-y-2 translate-x-12 rotate-45 bg-white opacity-[3%]"></span>
          <span className="absolute left-0 top-0 -mt-1 h-48 w-48 -translate-x-56 -translate-y-24 rotate-45 bg-white opacity-100 transition-all duration-500 ease-in-out group-hover:-translate-x-8"></span>
          <span className="relative w-full text-left text-base tracking-wide text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">
            {isLoading && (
              <i className="fa-duotone fa-spinner-third mr-2 animate-spin text-white"></i>
            )}
            <span>Clear All</span>
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
              <Popconfirm
                title="Restore movie"
                description="Are you sure to store this movie?"
                onConfirm={() => handleRestore(val)}
              >
                <Tooltip title="Restore" placement="bottom">
                  <Button type="text" disabled={isLoading}>
                    <i className="fa-solid fa-trash-undo text-[22px]"></i>
                  </Button>
                </Tooltip>
              </Popconfirm>
            </div>
          )}
        />
      </Table>
    </div>
  );
};

export default Trash;
