"use client";

import HeaderAdmin from "@/components/adminPage/header/HeaderAdmin";
import SiderAdmin from "@/components/adminPage/sider/SiderAdmin";
import { Button, Layout, Result } from "antd";
import { useEffect, useState } from "react";
import { Introduction } from "@/components/introduction/Introduction";
import { useDispatch } from "react-redux";
import { setStatistics } from "@/utils/redux/slices/data/statisticSlice";
import Axios from "@/utils/axios";

const layoutStyle = {
  with: "100svh",
  height: "100svh",
};

export default function layout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  const [firstLoading, setFirstLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setFirstLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await Axios("Admin/Statistics");
        dispatch(setStatistics(res.data));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setIsError(true);
      }
    };
    fetchApi();
  }, []);

  return (
    <>
      {firstLoading ? (
        <Introduction />
      ) : (
        <div>
          <Layout style={layoutStyle}>
            <SiderAdmin />
            <Layout>
              <HeaderAdmin />
              <div className="p-8 bg-[#001529] w-full h-full overflow-y-auto">
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
                  children
                )}
              </div>
            </Layout>
          </Layout>
        </div>
      )}
    </>
  );
}
