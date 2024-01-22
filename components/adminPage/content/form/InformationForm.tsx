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
  Tooltip,
  Steps,
} from "antd";
import type { RcFile } from "antd/es/upload/interface";
import {
  LoadingOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import Axios from "@/utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { setmovieList } from "@/utils/redux/slices/data/movieListSlice";
import { setStatistics } from "@/utils/redux/slices/data/statisticSlice";
import dayjs from "dayjs";
import { setIsLoadingAIButton } from "@/utils/redux/slices/toggle/IsLoadingAIButtonSlice";
import {
  isCancelButtonModalSelector,
  isLoadingAIButtonSelector,
} from "@/utils/redux/selector";
import { setMovieId } from "@/utils/redux/slices/data/movieIdSlice";
const { TextArea } = Input;

type FieldType = {
  Mark?: number;
  Duration?: number;
  Viewer?: number;
  Description?: string;
  EnglishName?: string;
  VietnamName?: string;
  Trailer?: string;
  ProducedDate?: string;
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
interface InformationFormType {
  clickAIButton: number;
  setCurrent: Function;
  handleOk: Function;
  handleCancel: Function;
  setIsLoadingNextButton: Function;
  isLoadingNextButton: boolean;
}

interface ValueFormType {
  Category: [];
  ProducedDate: Date;
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
  producedDate: string;
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

const InformationForm = ({
  clickAIButton,
  setCurrent,
  handleOk,
  handleCancel,
  setIsLoadingNextButton,
  isLoadingNextButton,
}: InformationFormType) => {
  const movieNameRef = useRef<InputRef>(null);

  const dispatch = useDispatch();

  const isLoadingAIButton = useSelector(isLoadingAIButtonSelector);
  const isCancelButtonModal = useSelector(isCancelButtonModalSelector);

  const [loadingThumnail, setLoadingThumnail] = useState(false);
  const [imageUrl, setImageUrl] = useState<any>();
  const [featureOption, setFeatureOption] = useState<FeatureType[]>();
  const [categoryOption, setCategoryOption] = useState<CategoryType[]>();
  const [nationOption, setNationOption] = useState<[]>([]);

  const [form] = Form.useForm();

  const [messageApi, contextHolder] = message.useMessage();

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
        producedDate: val.producedDate,
        deletedButton: val.movieId,
      };
      return newObj;
    });
    return filteredData;
  };

  const onFinish = async (values: ValueFormType) => {
    const postMovie = async () => {
      const data = {
        Categories: values.Category,
        ProducedDate: values.ProducedDate,
        Description: values.Description,
        Time: values.Duration,
        EnglishName: values.EnglishName,
        VietnamName: values.VietnamName,
        FeatureId: values.Feature,
        Mark: values.Mark,
        NationId: values.Nation,
        Thumbnail: values.Thumbnail?.file,
        Trailer: values.Trailer,
        Viewer: values.Viewer,
      };
      try {
        setIsLoadingNextButton(true);
        const movieId = await Axios.post("Movie", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        dispatch(setMovieId(movieId));

        const movieList = await Axios("Movies", {
          params: { page: 1, eachPage: 5 },
        });

        try {
          const res = await Axios("Admin/Statistics");
          dispatch(setStatistics(res.data));
        } catch (error) {
          console.log(error);
        }

        success("Movie have been created successfully!");
        setTimeout(() => {
          form.resetFields();
          dispatch(setmovieList(filterData(movieList.data)));
          setImageUrl(null);
          setIsLoadingNextButton(false);
          setCurrent((prev: number) => prev + 1);
        }, 2000);
      } catch (error) {
        console.log(error);
        errorRes("Movie already exists!");
        movieNameRef.current?.focus();
        setIsLoadingNextButton(false);
      }
    };
    postMovie();
  };

  //AI Create Information --------------------------------
  useEffect(() => {
    if (clickAIButton > 0) {
      //AI create Movie ----------------------------
      const handleAICreateMovie = async () => {
        const englishName = form.getFieldValue("EnglishName");
        if (!englishName) {
          movieNameRef.current?.focus();
          return errorRes("Required input English Name");
        }

        if (englishName.length < 2) {
          return movieNameRef.current?.focus();
        }

        const nation = form.getFieldValue("Nation");

        try {
          dispatch(setIsLoadingAIButton(true));
          const res = await Axios("Chat", {
            params: { content: englishName, nation },
          });

          form.setFieldsValue({
            Category: res.data.Categories,
            ProducedDate: dayjs(res.data.ProducedDate, "YYYY/MM/DD"),
            Description: res.data.Description,
            Feature: res.data.FeatureId > 4 ? null : res.data.FeatureId,
            Mark: res.data.Mark,
            Nation: res.data.NationId,
            Duration: res.data.Time,
            Viewer: res.data.Viewer,
          });
          dispatch(setIsLoadingAIButton(false));
          success(
            `AI have created the movie information, Click button "AI Create" again if you have unexpected result`
          );
        } catch (error) {
          console.log(error);
          errorRes(`${englishName} Not Found`);
          dispatch(setIsLoadingAIButton(false));
          movieNameRef.current?.focus();
        }
      };
      handleAICreateMovie();
    }
  }, [clickAIButton]);

  //Reset Form ------------------------------
  useEffect(() => {
    form.resetFields();
    setImageUrl(null);
  }, [isCancelButtonModal]);

  return (
    <div className="w-[1000px]">
      {contextHolder}
      <Form
        form={form}
        labelCol={{ span: 8, flex: "110px" }}
        labelAlign="right"
        labelWrap
        // wrapperCol={{ span: 14 }}
        layout="horizontal"
        // style={{ width: "70%" }}
        onFinish={onFinish}
        onFinishFailed={(e) =>
          form.scrollToField(e.errorFields[0].name, {
            behavior: "smooth",
          })
        }
        id="createMovie"
      >
        <Form.Item<FieldType>
          validateDebounce={1000}
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
            disabled={isLoadingNextButton || isLoadingAIButton}
          />
        </Form.Item>

        <Form.Item<FieldType>
          validateDebounce={1000}
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
            disabled={isLoadingNextButton || isLoadingAIButton}
          />
        </Form.Item>

        <Form.Item<FieldType>
          validateDebounce={1000}
          label="Feature"
          name="Feature"
          rules={[{ required: true }]}
        >
          <Select
            options={featureOption}
            className="inputCustom"
            disabled={isLoadingNextButton || isLoadingAIButton}
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
            disabled={isLoadingNextButton || isLoadingAIButton}
          />
        </Form.Item>

        <Form.Item<FieldType>
          validateDebounce={1000}
          label="Mark"
          name="Mark"
          // wrapperCol={{ span: 9 }}
        >
          <InputNumber
            min={1}
            max={10}
            placeholder="from 1-10"
            addonAfter={<i className="fa-solid fa-star text-yellow-400"></i>}
            className="inputCustom"
            disabled={isLoadingNextButton || isLoadingAIButton}
          />
        </Form.Item>

        <Form.Item<FieldType>
          validateDebounce={1000}
          label="Duration"
          name="Duration"
          // wrapperCol={{ span: 9 }}
        >
          <InputNumber
            min={20}
            max={240}
            placeholder="from 20-240"
            addonAfter="Minutes"
            className="inputCustom"
            disabled={isLoadingNextButton || isLoadingAIButton}
          />
        </Form.Item>

        <Form.Item<FieldType>
          validateDebounce={1000}
          label="Produced Date"
          name="ProducedDate"
          rules={[{ required: true }]}
        >
          <DatePicker
            format={"YYYY/MM/DD"}
            placeholder="Pick a date"
            disabledDate={disabledDate}
            className="inputCustom"
            disabled={isLoadingNextButton || isLoadingAIButton}
          />
        </Form.Item>

        <Form.Item<FieldType>
          validateDebounce={1000}
          label="Viewer"
          name="Viewer"
        >
          <InputNumber
            placeholder="Viewer"
            min={0}
            className="inputCustom"
            disabled={isLoadingNextButton || isLoadingAIButton}
          />
        </Form.Item>

        <Form.Item<FieldType>
          validateDebounce={1000}
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
            disabled={isLoadingNextButton || isLoadingAIButton}
          />
        </Form.Item>

        <Form.Item<FieldType>
          validateDebounce={1000}
          label="Thumbnail"
          name="Thumbnail"
          rules={[{ required: true }]}
        >
          <Upload
            name="upload"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
            disabled={isLoadingNextButton || isLoadingAIButton}
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
              max: 10000,
              message: "Maximum 10000 letters",
            },
          ]}
        >
          <TextArea
            rows={6}
            minLength={20}
            maxLength={9999}
            placeholder="Descript the movie"
            className="inputCustom"
            style={{ resize: "none" }}
            disabled={isLoadingNextButton || isLoadingAIButton}
          />
        </Form.Item>

        <Form.Item<FieldType>
          validateDebounce={1000}
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
            disabled={isLoadingNextButton || isLoadingAIButton}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default InformationForm;
