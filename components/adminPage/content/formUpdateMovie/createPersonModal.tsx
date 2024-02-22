import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Upload,
  message,
} from "antd";
import type { RcFile } from "antd/es/upload/interface";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { setPersonList } from "@/utils/redux/slices/data/personListSlice";

interface CreatePersonModalType {
  isOpenCreatePersonModal: boolean;
  setIsOpenCreatePersonModal: Function;
}

type FieldType = {
  Thumbnail?: any;
  NamePerson?: string;
  Nation?: string;
  Role?: string;
  DoB?: string;
};

interface NationType {
  nationId: number;
  name: string;
}

const CreatePersonModal = ({
  isOpenCreatePersonModal,
  setIsOpenCreatePersonModal,
}: CreatePersonModalType) => {
  const dispatch = useDispatch();

  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const [loadingThumnail, setLoadingThumnail] = useState(false);
  const [imageUrl, setImageUrl] = useState<any>();
  const [isLoadingCreateButton, setIsLoadingCreateButton] =
    useState<boolean>(false);
  const [nationOption, setNationOption] = useState<[]>([]);

  //Call Api Feature, Category-----------------------
  useEffect(() => {
    const fetchApi = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}nations?page=0`,
      );
      const data = await res.json();
      const newNationOption = data.map((val: NationType) => ({
        value: val.nationId,
        label: val.name,
      }));
      setNationOption(newNationOption);
    };
    fetchApi();
  }, []);

  //Message when created movie
  const success = (text: any) => {
    messageApi.open({
      type: "success",
      content: text,
    });
  };

  const errorRes = (error: any) => {
    messageApi.open({
      type: "error",
      content: error,
    });
  };

  //Upload Thumbnail----------------------

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
      setLoadingThumnail(true);
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
      setLoadingThumnail(true);
    }

    return false;
  };

  const handleChange = (info: any) => {
    if (!loadingThumnail) {
      setImageUrl(URL.createObjectURL(info.file));
      info.fileList = [{ ...info.file }];
    }
    setLoadingThumnail(false);
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  //-------------------------------------------------

  //Turn of the day of the future when choose Produced Date
  const disabledDate = (current: any) => {
    // Disable dates before today
    return current && current > moment().endOf("day");
  };

  const onFinish = async (values: FieldType) => {
    const data = {
      Thumbnail: values.Thumbnail?.file,
      NamePerson: values.NamePerson,
      NationId: values.Nation,
      Role: values.Role,
      DoB: values.DoB,
    };

    try {
      setIsLoadingCreateButton(true);

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Person`, {
        method: "POST",
        headers: { "Content-Type": "multipart/form-data" },
        body: JSON.stringify(data),
      });

      try {
        //update personList
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/Persons?sortBy=CreatedDate&page=0`,
        );
        const data = await res.json();
        dispatch(
          setPersonList(
            data.map((val: any, idx: number) => ({
              ...val,
              key: idx,
            })),
          ),
        );
      } catch (error) {
        console.log(error);
        errorRes("Failed to get personList!");
      }

      success("Create Person successfully!");
      setTimeout(() => {
        setIsLoadingCreateButton(false);
        setIsOpenCreatePersonModal(false);
        form.resetFields();
        setImageUrl(null);
      }, 2000);
    } catch (error) {
      setIsLoadingCreateButton(false);
      console.log(error);
      errorRes("Failed to create person!");
    }
  };

  return (
    <div>
      {contextHolder}
      <Modal
        title={
          <div className="flex items-center">
            <i className="fa-regular fa-user-plus mb-1 mr-3 text-red-600"></i>
            <span>Add Person</span>
          </div>
        }
        closeIcon={false}
        open={isOpenCreatePersonModal}
        footer={[
          <Popconfirm
            key={"Cancel"}
            title="Cancel create movie"
            description="Are you sure to cancel Add Person? All this data will be lost"
            onConfirm={() => {
              setIsOpenCreatePersonModal(false);
              form.resetFields();
              setImageUrl(null);
            }}
          >
            <Button disabled={isLoadingCreateButton} key="Cancel" type="text">
              Cancel
            </Button>
          </Popconfirm>,
          <Button
            key="Submit"
            htmlType="submit"
            form="createPerson"
            loading={isLoadingCreateButton}
          >
            Create
          </Button>,
        ]}
      >
        <Form
          form={form}
          labelCol={{ span: 8, flex: "110px" }}
          labelAlign="right"
          labelWrap
          // wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ marginTop: "20px" }}
          onFinish={onFinish}
          onFinishFailed={(e) =>
            form.scrollToField(e.errorFields[0].name, {
              behavior: "smooth",
            })
          }
          id="createPerson"
        >
          <Form.Item<FieldType>
            validateDebounce={1000}
            label="Name"
            name="NamePerson"
            rules={[
              {
                required: true,
                message: "This field is required.",
              },
              {
                min: 2,
                message: "At least 2 letters",
              },
              {
                max: 99,
                message: "Maximum 100 letters",
              },
            ]}
          >
            <Input
              minLength={2}
              maxLength={100}
              placeholder="Name"
              className="inputCustom"
              disabled={isLoadingCreateButton}
            />
          </Form.Item>

          <Form.Item<FieldType>
            validateDebounce={1000}
            label="Nation"
            name="Nation"
            rules={[{ required: true }]}
          >
            <Select
              options={nationOption}
              className="inputCustom"
              disabled={isLoadingCreateButton}
              placeholder="Nation"
            />
          </Form.Item>

          <Form.Item<FieldType>
            validateDebounce={1000}
            label="Role"
            name="Role"
            rules={[{ required: true, message: "Please enter Role" }]}
            initialValue={"ACTOR"}
          >
            <Select
              options={[
                {
                  value: "ACTOR",
                  label: "Actor",
                },
                {
                  value: "PRODUCER",
                  label: "Producer",
                },
              ]}
              className="inputCustom"
              disabled={isLoadingCreateButton}
              placeholder="Role"
            />
          </Form.Item>

          <Form.Item<FieldType>
            validateDebounce={1000}
            label="Thumbnail"
            name="Thumbnail"
          >
            <Upload
              name="upload"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChange}
              disabled={isLoadingCreateButton}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>

          <Form.Item<FieldType>
            validateDebounce={1000}
            label="Birthday"
            name="DoB"
          >
            <DatePicker
              format={"YYYY/MM/DD"}
              placeholder="Pick a date"
              disabledDate={disabledDate}
              className="inputCustom"
              disabled={isLoadingCreateButton}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreatePersonModal;
