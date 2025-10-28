"use client";

import { Button, Table, Popconfirm, message, Modal, Form, Input } from "antd";
import { useState } from "react";
import { revalidatePathAction } from "@/components/actions";
import Axios from "@/utils/axios";

interface IProps {
  geminiKeyList: [];
}
type FieldType = {
  apiKey: string;
};

interface ValueFormType {
  apiKey: string;
}

const { Column } = Table;

const ManageGeminiKey = (props: IProps) => {
  const { geminiKeyList } = props;

  const [messageApi, contextHolder] = message.useMessage();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [deleteLoadingState, setDeleteLoadingState] = useState<boolean>(false);

  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleDelete = async (value: any) => {
    try {
      setDeleteLoadingState(true);
      await Axios.delete("DeleteGeminiKey", { params: { key: value } });
      message.success("GeminiKey deleted successfully!");
      await revalidatePathAction("admin/manageGeminiKey");
      setDeleteLoadingState(false);
    } catch (error) {
      console.log(error);
      setDeleteLoadingState(false);
      message.error("Failed to delete movie!");
    }
  };

  const handleOnFinish = async (values: ValueFormType) => {
    try {
      setIsLoading(true);
      await Axios.post("AddGeminiKey", values.apiKey);
      message.success("Add Gemini Key successfully!");
      await revalidatePathAction("admin/manageGeminiKey");
      setIsModalOpen(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      message.error("Add Gemini Key Failed!");
      form.getFieldError("apiKey");
      setIsLoading(false);
    }
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
            <i className="fa-regular fa-plus mr-2"></i> Add Api Key
          </span>
          <span className="absolute inset-0 rounded-2xl border-2 border-white"></span>
        </button>
      </div>
      <Table
        dataSource={geminiKeyList}
        pagination={{ pageSize: 6, total: geminiKeyList.length }}
      >
        <Column
          title="Api Key"
          dataIndex="apiKey"
          key="apiKey"
          render={(val, _, idx) => (
            <p key={idx} className="select-text px-2">
              {val}
            </p>
          )}
        />
        <Column
          title="Date Created"
          dataIndex="dateCreated"
          key="dateCreated"
        />
        <Column
          title="Delete"
          dataIndex="apiKey"
          key="deletedButton"
          render={(val, _, idx) => (
            <div className="flex items-center" key={idx}>
              <Popconfirm
                title="Delete Api Key"
                description="Are you sure to delete this Api Key?"
                onConfirm={() => handleDelete(val)}
              >
                <Button type="text" disabled={deleteLoadingState}>
                  <i className="fa-solid fa-trash text-[22px]"></i>
                </Button>
              </Popconfirm>
            </div>
          )}
        />
      </Table>
      <Modal
        title={"Create Api Key"}
        open={isModalOpen}
        centered
        closeIcon={false}
        footer={[
          <Button onClick={handleCancel} disabled={isLoading} key="Cancel">
            Cancel
          </Button>,
          <Button
            form="apiKeyId"
            htmlType="submit"
            disabled={isLoading}
            key="Create"
            loading={isLoading}
          >
            Create
          </Button>,
        ]}
      >
        <Form id="apiKeyId" form={form} onFinish={handleOnFinish}>
          <Form.Item<FieldType>
            validateDebounce={1000}
            label="apiKey"
            name="apiKey"
            rules={[
              {
                required: true,
                message: "This field is required.",
              },
            ]}
          >
            <Input className="inputCustom" disabled={isLoading} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageGeminiKey;
