import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input, Space, Table } from "antd";
import type { InputRef, TableColumnType, TableColumnsType } from "antd";
import Column from "antd/es/table/Column";
import { FilterDropdownProps } from "antd/es/table/interface";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import Axios from "@/utils/axios";
import { useSelector } from "react-redux";
import { movieIdSelector } from "@/utils/redux/selector";

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

const data: DataType[] = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    image:
      "https://i.pinimg.com/originals/32/27/d0/3227d0b5ed315b7d255516f18bff26ba.jpg",
    namePerson: `Edward King ${i}`,
    nationName: `Korea`,
    role: "AC",
    doB: "20/02/1983",
  });
}

type DataIndex = keyof DataType;

const ActorForm = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [reloading, setReloading] = useState<boolean>(false);
  const [personList, setPersonList] = useState<[]>([]);

  const movieId = useSelector(movieIdSelector);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        setLoading(true);
        const res = await Axios("Persons");
        setPersonList(
          res.data.map((val: PersonType, idx: number) => ({ ...val, key: idx }))
        );
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchApi();
  }, []);

  //Search person -----------------------------
  const start = () => {
    setReloading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setReloading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
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

  const handleOnFinish = async () => {
    const selectedPersons = personList.reduce(
      (acc: any, val: PersonType, idx: number) => {
        if (!selectedRowKeys.includes(idx)) return acc;

        const person = {
          personId: val.personId,
          image: val.image,
          namePerson: val.namePerson,
          nationId: val.nationId,
          nationName: val.nationName,
          role: val.role,
          doB: val.doB,
        };

        return [...acc, person];
      },
      []
    );
    console.log(selectedPersons);
  };

  return (
    <>
      {loading ? (
        <div className="w-full h-[70svh] flex justify-center items-center">
          <i className="fa-solid fa-spinner-scale text-6xl animate-spin text-[red]"></i>
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: 16 }}>
            <Button onClick={start} disabled={!hasSelected} loading={reloading}>
              Reload
            </Button>
            <span style={{ marginLeft: 8 }}>
              {hasSelected ? `Selected ${selectedRowKeys.length} persons` : ""}
            </span>
          </div>
          <Form id="createMovie" onFinish={handleOnFinish}>
            <Form.Item>
              <Table rowSelection={rowSelection} dataSource={personList}>
                <Column
                  title="Image"
                  dataIndex="image"
                  key="image"
                  render={(image: string, _, idx) => (
                    <img
                      src={image}
                      alt="thumbnail"
                      className="w-[200px] h-[160px] object-contain"
                      key={idx}
                    />
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
                      style={{ padding: 8 }}
                      onKeyDown={(e) => e.stopPropagation()}
                    >
                      <Input
                        ref={searchInput}
                        placeholder={`Search name`}
                        value={selectedKeys[0]}
                        onChange={(e) =>
                          setSelectedKeys(
                            e.target.value ? [e.target.value] : []
                          )
                        }
                        onPressEnter={() =>
                          handleSearch(
                            selectedKeys as string[],
                            confirm,
                            "namePerson"
                          )
                        }
                        style={{
                          marginBottom: 8,
                          display: "block",
                          color: "black",
                        }}
                      />
                      <Space>
                        <Button
                          type="primary"
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
                          style={{ width: 90 }}
                        >
                          Reset
                        </Button>
                        <Button
                          type="link"
                          size="small"
                          onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn("namePerson");
                          }}
                        >
                          Filter
                        </Button>
                        <Button
                          type="link"
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
                    return record.nationName.includes(value);
                  }}
                />
                <Column
                  title="Role"
                  dataIndex="role"
                  key="role"
                  filters={[
                    { text: "Actor", value: "AC" },
                    { text: "Producer", value: "PR" },
                  ]}
                  filterIcon={
                    <i className="fa-sharp fa-solid fa-filter-list text-gray-400 "></i>
                  }
                  onFilter={(value: any, record: DataType) => {
                    return record.role.includes(value);
                  }}
                />
                <Column title="Birthday" dataIndex="doB" key="doB" />
              </Table>
            </Form.Item>
          </Form>
        </div>
      )}
    </>
  );
};

export default ActorForm;
