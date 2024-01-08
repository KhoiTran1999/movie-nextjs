import {
  Form,
  Input,
  InputNumber,
  DatePicker,
  message,
  Upload,
  Select,
  Button,
  Divider,
} from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import {
  LoadingOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { useEffect, useState } from "react";
import Axios from "@/utils/axios";
const { TextArea } = Input;

type FieldType = {
  Mark?: number;
  Duration?: number;
  Viewer?: number;
  Description?: string;
  EnglishName?: string;
  VietnamName?: string;
  Trailer?: string;
  DateCreated?: string;
  Thumbnail?: string;
  Feature?: number;
  Category?: number;
  Nation?: number;
  LinkVideo?: [];
};

interface FeatureType {
  featureId: number;
  name: string;
}

interface CategoryType {
  categoryId: number;
  name: string;
}

interface NationType {
  nationId: number;
  name: string;
}

const formItemLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 14,
  },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    span: 14,
    offset: 7,
  },
};

const CreateMovieModal = () => {
  const [loadingThumnail, setLoadingThumnail] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [featureOption, setFeatureOption] = useState<FeatureType[]>();
  const [categoryOption, setCategoryOption] = useState<CategoryType[]>();
  const [nationOption, setNationOption] = useState<[]>([]);

  //Turn of the day of the future when choose Produced Date
  const disabledDate = (current: any) => {
    // Disable dates before today
    return current && current > moment().endOf("day");
  };

  //Call Api Feature, Category-----------------------
  useEffect(() => {
    const fetchApi = async () => {
      const res = await Promise.all([Axios("Features"), Axios("Categories")]);
      const newFeatureOption = res[0].data.map((val: FeatureType) => ({
        value: val.featureId,
        label: val.name,
      }));
      const newCategoryOption = res[1].data.map((val: CategoryType) => ({
        value: val.categoryId,
        label: val.name,
      }));
      setFeatureOption(newFeatureOption);
      setCategoryOption(newCategoryOption);
    };
    fetchApi();
  }, []);

  //Upload Thumbnail----------------------
  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoadingThumnail(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoadingThumnail(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loadingThumnail ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
  };

  return (
    <div className="max-h-[70svh] overflow-auto">
      <Form
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
      >
        <Form.Item<FieldType>
          label="Mark"
          name="Mark"
          wrapperCol={{ span: 6 }}
          rules={[
            {
              message: "From 1 to 10 only",
            },
            {
              type: "number",
              min: 1,
            },
          ]}
        >
          <InputNumber
            min={1}
            max={10}
            defaultValue={5}
            addonAfter={<i className="fa-solid fa-star text-yellow-400"></i>}
            className="inputCustom"
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Duration"
          name="Duration"
          wrapperCol={{ span: 8 }}
        >
          <InputNumber
            min={20}
            max={240}
            placeholder="120"
            addonAfter="Minutes"
            className="inputCustom"
          />
        </Form.Item>

        <Form.Item<FieldType> label="Produced Date" name="DateCreated">
          <DatePicker
            placeholder="Pick a date"
            disabledDate={disabledDate}
            className="inputCustom"
          />
        </Form.Item>

        <Form.Item<FieldType> label="Viewer" name="Viewer">
          <InputNumber placeholder="Viewer" min={0} className="inputCustom" />
        </Form.Item>

        <Form.Item<FieldType> label="Description" name="Description">
          <TextArea
            rows={4}
            placeholder="Descript the movie"
            className="inputCustom"
          />
        </Form.Item>

        <Form.Item<FieldType> label="English Name" name="EnglishName">
          <Input placeholder="Movie English Name" className="inputCustom" />
        </Form.Item>

        <Form.Item<FieldType> label="Vietnamese Name" name="VietnamName">
          <Input placeholder="Movie Vietnamese Name" className="inputCustom" />
        </Form.Item>

        <Form.Item<FieldType> label="Link Trailer" name="Trailer">
          <Input placeholder="Link Trailer" className="inputCustom" />
        </Form.Item>

        <Form.Item<FieldType> label="Thumbnail" name="Thumbnail">
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>

        <Form.Item<FieldType>
          label="Feature"
          name="Feature"
          rules={[{ required: true }]}
        >
          <Select options={featureOption} className="inputCustom" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Category"
          name="Category"
          rules={[{ required: true }]}
        >
          <Select options={categoryOption} className="inputCustom" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Nation"
          name="Nation"
          rules={[{ required: true }]}
        >
          <Select
            options={[
              { value: 1, label: "VietNam" },
              { value: 2, label: "Korea" },
              { value: 3, label: "America" },
            ]}
            className="inputCustom"
          />
        </Form.Item>
        <Divider style={{ backgroundColor: "#5d5d5d" }} />
        <Form.List name="videoList">
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0
                    ? formItemLayout
                    : formItemLayoutWithOutLabel)}
                  label={index === 0 ? "Link Video" : ""}
                  required={false}
                  key={field.key}
                >
                  <div className="flex items-center">
                    <Form.Item
                      {...field}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message:
                            "Please input Link Video or delete this field.",
                        },
                      ]}
                      noStyle
                    >
                      <Input
                        className="bg-transparent placeholder:text-[#5d5d5d]"
                        placeholder="Link Movie"
                      />
                    </Form.Item>
                    {fields.length > 0 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button ml-3 hover:text-[red] transition-colors"
                        onClick={() => remove(field.name)}
                      />
                    ) : null}
                  </div>
                </Form.Item>
              ))}
              <Form.Item wrapperCol={{ offset: 7 }}>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                >
                  Add Link Video
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button htmlType="submit">Save</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateMovieModal;
