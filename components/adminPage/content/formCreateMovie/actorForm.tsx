import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Space,
  Table,
  Tooltip,
  message,
} from "antd";
import type { InputRef } from "antd";
import Column from "antd/es/table/Column";
import { FilterDropdownProps } from "antd/es/table/interface";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { useDispatch, useSelector } from "react-redux";
import {
  isCancelButtonModalSelector,
  movieIdSelector,
  personListSelector,
} from "@/utils/redux/selector";
import CreatePersonModal from "./createPersonModal";
import { setPersonList } from "@/utils/redux/slices/data/personListSlice";
import { setMovieId } from "@/utils/redux/slices/data/movieIdSlice";
import Axios from "@/utils/axios";

interface DataType {
  key: React.Key;
  image: string;
  namePerson: string;
  nationName: string;
  role: string;
  doB: string;
}

interface PersonType {
  personId: string;
  image: string;
  namePerson: string;
  nationId: string;
  nationName: string;
  role: string;
  doB: string;
}

interface VideoFormType {
  setCurrent: Function;
  current: number;
  setIsLoadingNextButton: Function;
  isLoadingNextButton: boolean;
}

type DataIndex = keyof DataType;

const ActorForm = ({
  setCurrent,
  current,
  setIsLoadingNextButton,
  isLoadingNextButton,
}: VideoFormType) => {
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState<string>("");
  const [searchedColumn, setSearchedColumn] = useState<string>("");
  const searchInput = useRef<InputRef>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [reloading, setReloading] = useState<boolean>(false);
  const [isOpenCreatePersonModal, setIsOpenCreatePersonModal] =
    useState<boolean>(false);

  const movieId = useSelector(movieIdSelector);
  const personList = useSelector(personListSelector);
  const isCancelButtonModal = useSelector(isCancelButtonModalSelector);

  const [form] = Form.useForm();

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const fetchApi = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.API_URL}/Persons?sortBy=CreatedDate&page=0`
        );
        const data = await res.json();
        dispatch(
          setPersonList(
            data.map((val: PersonType, idx: number) => ({
              ...val,
              key: idx,
            }))
          )
        );
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchApi();
  }, []);

  //Row Selection -------------------
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  //Search person -----------------------------
  const start = () => {
    setReloading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setReloading(false);
    }, 1000);
  };
  const hasSelected = selectedRowKeys.length > 0;

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  //-----------------------------------------

  const handleOnFinish = async (values: any) => {
    if (selectedRowKeys.length === 0) {
      message.success("Finish!");
      return;
    }

    const selectedPersons = personList.reduce(
      (acc: any, val: PersonType, idx: number) => {
        if (!selectedRowKeys.includes(idx)) return acc;

        const person = {
          personId: val.personId,
          characterName: val.namePerson,
        };
        return [...acc, person];
      },
      []
    );

    try {
      setIsLoadingNextButton(true);
      await Axios.post(`Cast/${movieId}`, selectedPersons);

      message.success("Add actors successfully!");
      setTimeout(() => {
        setIsLoadingNextButton(false);
        form.resetFields();
        setSearchText("");
        setSearchedColumn("");
        setSelectedRowKeys([]);
      }, 2000);
    } catch (error) {
      console.log(error);
      message.error("Failed to add actors!");
      setIsLoadingNextButton(false);
    }
  };

  useEffect(() => {
    form.resetFields();
    setSearchText("");
    setSearchedColumn("");
    setSelectedRowKeys([]);
  }, [isCancelButtonModal]);

  return (
    <>
      {loading ? (
        <div className="w-full h-[70svh] flex justify-center items-center">
          <i className="fa-solid fa-spinner-scale text-6xl animate-spin text-[red]"></i>
        </div>
      ) : (
        <div>
          {contextHolder}
          <div
            className="flex justify-between items-center"
            style={{ marginBottom: 16 }}
          >
            <div>
              <Button
                onClick={start}
                disabled={!hasSelected || isLoadingNextButton}
                loading={reloading}
              >
                Reset
              </Button>
              <span style={{ marginLeft: 8 }}>
                {hasSelected
                  ? `Selected ${selectedRowKeys.length} persons`
                  : ""}
              </span>
            </div>
            {searchedColumn !== "" ? (
              <Button
                disabled={isLoadingNextButton}
                onClick={() => setIsOpenCreatePersonModal(true)}
              >
                <i className="fa-regular fa-plus mr-2"></i> Add Person
              </Button>
            ) : (
              <Tooltip title="To add new person, you must Search or use Filter first!">
                <Button disabled className="tracking-wide font-medium text-sm">
                  <i className="fa-regular fa-plus mr-2"></i> Add Person
                </Button>
              </Tooltip>
            )}
          </div>
          <Form id="createMovie" onFinish={handleOnFinish}>
            <Form.Item name={""}>
              <Table
                className="w-[642px]"
                rowSelection={rowSelection}
                dataSource={personList}
              >
                <Column
                  title="Image"
                  dataIndex="thumbnail"
                  key="thumbnail"
                  render={(image: string, _, idx) => (
                    <div className="w-fit h-[160px] overflow-hidden rounded-lg">
                      <img
                        src={image}
                        alt="thumbnail"
                        className="h-full object-contain"
                        key={idx}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/errorAvatar.jpg";
                        }}
                      />
                    </div>
                  )}
                />
                <Column
                  title="Name"
                  dataIndex="namePerson"
                  key="namePerson"
                  filterIcon={
                    <i className="fa-regular fa-magnifying-glass text-gray-400"></i>
                  }
                  filterDropdown={({
                    setSelectedKeys,
                    selectedKeys,
                    confirm,
                    clearFilters,
                    close,
                  }) => (
                    <div
                      style={{ padding: 8, backgroundColor: "#2d2c2d" }}
                      onKeyDown={(e) => e.stopPropagation()}
                    >
                      <Input
                        className="inputCustom"
                        ref={searchInput}
                        placeholder={`Search name`}
                        value={selectedKeys[0]}
                        onChange={(e) =>
                          setSelectedKeys(
                            e.target.value ? [e.target.value] : []
                          )
                        }
                        style={{
                          marginBottom: 8,
                          display: "block",
                        }}
                      />
                      <Space>
                        <Button
                          onClick={() =>
                            handleSearch(
                              selectedKeys as string[],
                              confirm,
                              "namePerson"
                            )
                          }
                          icon={<SearchOutlined />}
                          size="small"
                          style={{ width: 90 }}
                        >
                          Search
                        </Button>
                        <Button
                          onClick={() =>
                            clearFilters && handleReset(clearFilters)
                          }
                          size="small"
                          type="dashed"
                          style={{ width: 90 }}
                        >
                          Reset
                        </Button>
                        <Button
                          type="text"
                          size="small"
                          onClick={() => {
                            close();
                          }}
                        >
                          close
                        </Button>
                      </Space>
                    </div>
                  )}
                  onFilter={(value, record: any) =>
                    record["namePerson"]
                      .toString()
                      .toLowerCase()
                      .includes((value as string).toLowerCase())
                  }
                  onFilterDropdownOpenChange={(visible) => {
                    if (visible) {
                      setTimeout(() => searchInput.current?.select(), 100);
                    }
                  }}
                  render={(text) =>
                    searchedColumn === "namePerson" ? (
                      <Highlighter
                        highlightStyle={{
                          backgroundColor: "#ffc069",
                          padding: 0,
                        }}
                        searchWords={[searchText]}
                        autoEscape
                        textToHighlight={text ? text.toString() : ""}
                      />
                    ) : (
                      text
                    )
                  }
                />
                <Column
                  title="Nation"
                  dataIndex="nationName"
                  key="nationName"
                  filters={[
                    { text: "China", value: "China" },
                    { text: "Japan", value: "Japan" },
                    { text: "Korea", value: "Korea" },
                    { text: "America", value: "America" },
                    { text: "VietNam", value: "VietNam" },
                  ]}
                  filterIcon={
                    <i className="fa-sharp fa-solid fa-filter-list text-gray-400 "></i>
                  }
                  onFilter={(value: any, record: DataType) => {
                    setSearchedColumn("nationName");
                    return record.nationName.includes(value);
                  }}
                />
                <Column
                  title="Role"
                  dataIndex="role"
                  key="role"
                  filters={[
                    { text: "Actor", value: "Actor" },
                    { text: "Producer", value: "Producer" },
                  ]}
                  filterIcon={
                    <i className="fa-sharp fa-solid fa-filter-list text-gray-400 "></i>
                  }
                  onFilter={(value: any, record: DataType) => {
                    setSearchedColumn("role");
                    return record.role.includes(value);
                  }}
                />
                <Column title="Birthday" dataIndex="doB" key="doB" />
              </Table>
            </Form.Item>
          </Form>
          <CreatePersonModal
            isOpenCreatePersonModal={isOpenCreatePersonModal}
            setIsOpenCreatePersonModal={setIsOpenCreatePersonModal}
          />
        </div>
      )}
    </>
  );
};

export default ActorForm;
