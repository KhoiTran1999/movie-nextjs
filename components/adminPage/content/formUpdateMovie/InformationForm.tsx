import {
  Form,
  Input,
  InputNumber,
  DatePicker,
  message,
  Upload,
  Select,
  InputRef,
} from "antd";
import type { RcFile } from "antd/es/upload/interface";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import Axios from "@/utils/axios";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { setIsLoadingAIButton } from "@/utils/redux/slices/toggle/IsLoadingAIButtonSlice";
import {
  isCancelButtonModalSelector,
  isLoadingAIButtonSelector,
  movieIdSelector,
} from "@/utils/redux/selector";
import { setMovieId } from "@/utils/redux/slices/data/movieIdSlice";
import { revalidateTagMovieListAction } from "@/components/actions";
import { deepEqual } from "assert";

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
  const movieId = useSelector(movieIdSelector);

  const [loadingThumnail, setLoadingThumnail] = useState(false);
  const [imageUrl, setImageUrl] = useState<any>();
  const [featureOption, setFeatureOption] = useState<FeatureType[]>();
  const [categoryOption, setCategoryOption] = useState<CategoryType[]>();
  const [nationOption, setNationOption] = useState<[]>([]);
  const [oldMovie, setOldMovie] = useState({});

  const [form] = Form.useForm();

  const [messageApi, contextHolder] = message.useMessage();

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

  //Add first render value -----------------------
  useEffect(() => {
    const fetchApi = async () => {
      try {
        setIsLoadingNextButton(true);
        const res = await Axios(`Movie/${movieId}`);
        const movie = res.data;

        //Add value into form
        const filterCategories = movie.categories.map(
          (val: any) => val.categoryId
        );

        const filterdData = {
          Mark: movie.mark,
          Duration: movie.time,
          Viewer: movie.viewer,
          Description: movie.description,
          EnglishName: movie.englishName,
          VietnamName: movie.vietnamName,
          Trailer: movie.trailer,
          ProducedDate: dayjs(movie.producedDate, "YYYY/MM/DD"),
          Nation: movie.nation.nationId,
          Feature: movie.feature.featureId,
          Category: filterCategories,
        };

        setOldMovie({ ...filterdData, Thumbnail: undefined });

        form.setFieldsValue(filterdData);
        setIsLoadingNextButton(false);
        setImageUrl(movie.thumbnail);
      } catch (error) {
        console.log(error);
        setIsLoadingNextButton(false);
      }
    };

    if (movieId) fetchApi();
  }, [movieId]);

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

  const onFinish = async (values: ValueFormType) => {
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
      //Compare Old values and New value
      deepEqual(values, oldMovie, "not same");

      form.resetFields();
      setImageUrl(null);
      setCurrent((prev: number) => prev + 1);
    } catch (error) {
      try {
        setIsLoadingNextButton(true);
        const movieId = await Axios.patch("Movie", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        await revalidateTagMovieListAction();
        message.success("Movie have been updated successfully!");

        setTimeout(() => {
          form.resetFields();
          setImageUrl(null);
          setIsLoadingNextButton(false);
          setCurrent((prev: number) => prev + 1);
          dispatch(setMovieId(movieId));
        }, 2000);
      } catch (error) {
        console.log(error);
        message.error("Something went wrong!");
        movieNameRef.current?.focus();
        setIsLoadingNextButton(false);
      }
    }
  };

  //AI Create Information --------------------------------
  useEffect(() => {
    if (clickAIButton > 0) {
      //AI create Movie ----------------------------
      const handleAICreateMovie = async () => {
        const englishName = form.getFieldValue("EnglishName");
        if (!englishName) {
          movieNameRef.current?.focus();
          return message.error("Required input English Name");
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
          const movie = res.data;

          form.setFieldsValue({
            Category: movie.Categories,
            ProducedDate: dayjs(movie.ProducedDate, "YYYY/MM/DD"),
            Description: movie.Description,
            Feature: movie.FeatureId > 4 ? null : movie.FeatureId,
            Mark: movie.Mark,
            Nation: movie.NationId,
            Duration: movie.Time,
            Viewer: movie.Viewer,
          });
          dispatch(setIsLoadingAIButton(false));
          message.success(
            `AI have created the movie information, Click button "AI Create" again if you have unexpected result`
          );
        } catch (error) {
          console.log(error);
          message.error(`${englishName} Not Found`);
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
        id="updateMovie"
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
        >
          <InputNumber
            placeholder="Duration"
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
