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
  Modal,
  Popconfirm,
  InputRef,
} from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import {
  LoadingOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import Axios from "@/utils/axios";
import { useDispatch } from "react-redux";
import { setmovieList } from "@/utils/redux/slices/data/movieListSlice";
import { setStatistics } from "@/utils/redux/slices/data/statisticSlice";
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
interface CreateMovieModalType {
  isModalOpen: boolean;
  handleOk: Function;
  handleCancel: Function;
}

interface ValueFormType {
  Category: [];
  DateCreated: Date;
  Description: string;
  Duration: number;
  EnglishName: string;
  VietnamName: string;
  Feature: number;
  Mark: number;
  Nation: string;
  Thumbnail: any;
  Trailer: string;
  Viewer: number;
  videoList: [];
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

interface categoryType {
  categoryId: number;
  name: string;
}

interface featureType {
  featureId: number;
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

const CreateMovieModal = ({
  isModalOpen,
  handleOk,
  handleCancel,
}: CreateMovieModalType) => {
  const movieNameRef = useRef<InputRef>(null);

  const dispatch = useDispatch();

  const [loadingThumnail, setLoadingThumnail] = useState(false);
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<any>();
  const [featureOption, setFeatureOption] = useState<FeatureType[]>();
  const [categoryOption, setCategoryOption] = useState<CategoryType[]>();
  const [nationOption, setNationOption] = useState<[]>([]);

  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  //Message when created movie
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Movie have been created successfully!",
    });
  };

  const errorRes = (error: any) => {
    messageApi.open({
      type: "error",
      content: error,
    });
  };

  //Turn of the day of the future when choose Produced Date
  const disabledDate = (current: any) => {
    // Disable dates before today
    return current && current > moment().endOf("day");
  };

  //Call Api Feature, Category-----------------------
  useEffect(() => {
    const fetchApi = async () => {
      const res = await Promise.all([
        Axios("Features"),
        Axios("Categories"),
        Axios("nations", { params: { page: 0 } }),
      ]);
      const newFeatureOption = res[0].data.map((val: FeatureType) => ({
        value: val.featureId,
        label: val.name,
      }));
      const newCategoryOption = res[1].data.map((val: CategoryType) => ({
        value: val.categoryId,
        label: val.name,
      }));
      const newNationOption = res[2].data.map((val: NationType) => ({
        value: val.nationId,
        label: val.name,
      }));
      setFeatureOption(newFeatureOption);
      setCategoryOption(newCategoryOption);
      setNationOption(newNationOption);
    };
    fetchApi();
  }, []);

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

  const filterData = (arr: []) => {
    const filteredData = arr.map((val: ApiType) => {
      const feature = val.feature.name;
      const categories = val.categories.map((val: categoryType) => val.name);
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
        deletedButton: val.movieId,
      };
      return newObj;
    });
    return filteredData;
  };

  const onFinish = (values: ValueFormType) => {
    console.log(values);

    const postMovie = async () => {
      const data = {
        Categories: values.Category,
        DateCreated: values.DateCreated,
        Description: values.Description,
        Time: values.Duration,
        EnglishName: values.EnglishName,
        VietnamName: values.VietnamName,
        FeatureId: values.Feature,
        Mark: values.Mark,
        NationId: values.Nation,
        Thumbnail: values.Thumbnail.file,
        Trailer: values.Trailer,
        Viewer: values.Viewer,
      };
      try {
        setSaveLoading(true);
        const movieId = await Axios.post("Movie", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("movieId: ", movieId);

        const movieList = await Axios("Movies", {
          params: { page: 1, eachPage: 5 },
        });

        if (values.videoList) {
          try {
            const seasonId = await Axios.post("Seasons", {
              movieId: movieId.data,
            });
            try {
              const newVideoList = values.videoList.map((val) => ({
                video: val,
              }));
              await Axios.post("episode", newVideoList, {
                params: { seasonId: seasonId.data },
              });
              console.log("created episode successfully");
            } catch (error) {
              console.log(error);
              errorRes("Failed to add Episode");
            }
          } catch (error) {
            console.log(error);
            errorRes("Failed to add Season");
          }
        }

        try {
          const res = await Axios("Admin/Statistics");
          dispatch(setStatistics(res.data));
        } catch (error) {
          console.log(error);
        }

        form.resetFields();
        success();
        handleOk();
        dispatch(setmovieList(filterData(movieList.data)));
        setSaveLoading(false);
        setImageUrl(null);
      } catch (error) {
        console.log(error);
        errorRes("Movie already exists!");
        movieNameRef.current?.focus();
        setSaveLoading(false);
      }
    };
    postMovie();
  };

  return (
    <Modal
      title="Create Movie"
      open={isModalOpen}
      centered
      closeIcon={false}
      footer={[
        <Popconfirm
          title="Cancel create movie"
          description="Are you sure to cancel this movie? All this data will be lost"
          onConfirm={() => {
            form.resetFields();
            handleCancel();
            setImageUrl(null);
          }}
        >
          <Button key="back" type="text">
            Cancel
          </Button>
        </Popconfirm>,
        <Button
          key="submit"
          htmlType="submit"
          loading={saveLoading}
          form="createMovieForm"
        >
          Save
        </Button>,
      ]}
    >
      <div className="max-h-[70svh] overflow-auto">
        {contextHolder}
        <Form
          form={form}
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          id="createMovieForm"
        >
          <Form.Item<FieldType>
            label="English Name"
            name="EnglishName"
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
              ref={movieNameRef}
              minLength={2}
              maxLength={100}
              placeholder="Movie English Name"
              className="inputCustom"
              disabled={saveLoading}
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="Vietnamese Name"
            name="VietnamName"
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
              placeholder="Movie Vietnamese Name"
              className="inputCustom"
              disabled={saveLoading}
            />
          </Form.Item>
          <Form.Item<FieldType>
            label="Feature"
            name="Feature"
            rules={[{ required: true }]}
          >
            <Select
              options={featureOption}
              className="inputCustom"
              disabled={saveLoading}
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="Nation"
            name="Nation"
            rules={[{ required: true }]}
          >
            <Select
              options={nationOption}
              className="inputCustom"
              disabled={saveLoading}
            />
          </Form.Item>
          <Form.Item<FieldType>
            label="Mark"
            name="Mark"
            wrapperCol={{ span: 9 }}
          >
            <InputNumber
              min={1}
              max={10}
              placeholder="from 1-10"
              addonAfter={<i className="fa-solid fa-star text-yellow-400"></i>}
              className="inputCustom"
              disabled={saveLoading}
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="Duration"
            name="Duration"
            wrapperCol={{ span: 9 }}
          >
            <InputNumber
              min={20}
              max={240}
              placeholder="from 20-240"
              addonAfter="Minutes"
              className="inputCustom"
              disabled={saveLoading}
            />
          </Form.Item>

          <Form.Item<FieldType> label="Produced Date" name="DateCreated">
            <DatePicker
              placeholder="Pick a date"
              disabledDate={disabledDate}
              className="inputCustom"
              disabled={saveLoading}
            />
          </Form.Item>

          <Form.Item<FieldType> label="Viewer" name="Viewer">
            <InputNumber
              placeholder="Viewer"
              min={0}
              className="inputCustom"
              disabled={saveLoading}
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="Link Trailer"
            name="Trailer"
            rules={[
              {
                required: true,
                message: "This field is required.",
              },
              {
                type: "url",
                warningOnly: true,
              },
            ]}
          >
            <Input
              placeholder="https://example.com"
              className="inputCustom"
              disabled={saveLoading}
            />
          </Form.Item>

          <Form.Item<FieldType> label="Thumbnail" name="Thumbnail">
            <Upload
              name="upload"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChange}
              disabled={saveLoading}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>

          <Form.Item<FieldType>
            label="Description"
            name="Description"
            rules={[
              {
                required: true,
                message: "This field is required.",
              },
              {
                min: 20,
                message: "At least 20 letters",
              },
              {
                max: 9999,
                message: "Maximum 10000 letters",
              },
            ]}
          >
            <TextArea
              rows={6}
              minLength={20}
              maxLength={10000}
              placeholder="Descript the movie"
              className="inputCustom"
              style={{ resize: "none" }}
              disabled={saveLoading}
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="Category"
            name="Category"
            rules={[
              {
                required: true,
                message: "This field is required.",
              },
            ]}
          >
            <Select
              mode="multiple"
              options={categoryOption}
              className="inputCustom"
              showSearch={false}
              disabled={saveLoading}
            />
          </Form.Item>

          <Divider style={{ backgroundColor: "#5d5d5d" }} />
          <Form.List name="videoList">
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    label={`Episode ` + (index + 1)}
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
                          {
                            type: "url",
                            warningOnly: true,
                          },
                        ]}
                        noStyle
                      >
                        <Input
                          className="bg-transparent placeholder:text-[#5d5d5d]"
                          placeholder="https://example.com"
                          disabled={saveLoading}
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
                <Form.Item wrapperCol={{ offset: 9 }}>
                  {!saveLoading && (
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                    >
                      Add Link Video
                    </Button>
                  )}
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </div>
    </Modal>
  );
};

export default CreateMovieModal;
