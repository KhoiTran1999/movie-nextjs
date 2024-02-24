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
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { setIsLoadingAIButton } from "@/utils/redux/slices/toggle/IsLoadingAIButtonSlice";
import {
  isCancelButtonModalSelector,
  isLoadingAIButtonSelector,
  movieIdSelector,
} from "@/utils/redux/selector";
import { revalidatePathAction } from "@/components/actions";
import { deepEqual } from "assert";
import Axios from "@/utils/axios";
import { setmovieDetail } from "@/utils/redux/slices/data/movieDetailSlice";

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
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/Features`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/Categories`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/nations?page=0`),
      ]);
      const feature = await res[0].json();
      const categories = await res[1].json();
      const nations = await res[2].json();
      const newFeatureOption = feature.map((val: FeatureType) => ({
        value: val.featureId,
        label: val.name,
      }));
      const newCategoryOption = categories.map((val: CategoryType) => ({
        value: val.categoryId,
        label: val.name,
      }));
      const newNationOption = nations.map((val: NationType) => ({
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

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/Movie/${movieId}`,
        );
        const movie = await res.json();

        dispatch(setmovieDetail(movie));
        //Add value into form
        const filterCategories = movie.categories.map(
          (val: any) => val.categoryId,
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
          Thumbnail: movie.thumbnail,
          MovieId: movieId,
        };

        setOldMovie(filterdData);

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

  //Check Thumnail ------------------------------------
  const handleInputLinkThumnail = (e: any) => {
    setImageUrl(e.target.value);
  };
  //-------------------------------------------------

  const onFinish = async (values: ValueFormType) => {
    const data = {
      MovieId: movieId,
      Categories: values.Category,
      ProducedDate: values.ProducedDate,
      Description: values.Description,
      Time: values.Duration,
      EnglishName: values.EnglishName,
      VietnamName: values.VietnamName,
      FeatureId: values.Feature,
      Mark: values.Mark,
      NationId: values.Nation,
      Thumbnail: values.Thumbnail,
      Trailer: values.Trailer,
      Viewer: values.Viewer,
    };

    try {
      //Compare Old values and New value
      deepEqual({ ...values, MovieId: movieId }, oldMovie, "not same");

      form.resetFields();
      setImageUrl(null);
      setCurrent((prev: number) => prev + 1);
    } catch (error) {
      try {
        setIsLoadingNextButton(true);
        await Axios.put("Movie", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        await revalidatePathAction("admin/manageMovies");
        message.success("Movie have been updated successfully!");

        setTimeout(() => {
          form.resetFields();
          setImageUrl(null);
          setIsLoadingNextButton(false);
          setCurrent((prev: number) => prev + 1);
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
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/Chat?content=${englishName}&nation=${nation}`,
          );
          const movie = await res.json();

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
            `AI have created the movie information, Click button "AI Create" again if you have unexpected result`,
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
          label="Link Thumnail"
          name="Thumbnail"
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
            onInput={handleInputLinkThumnail}
          />
        </Form.Item>

        {imageUrl ? (
          <div className="mb-6 flex justify-center">
            <div className="relative aspect-[3/5] w-1/3 rounded border border-dotted">
              <img
                src={imageUrl}
                alt="Thumnail"
                className="h-full w-full object-cover"
                onError={(e) => {
                  setImageUrl("/errorThumbnail.jpg");
                }}
              />
            </div>
          </div>
        ) : (
          <div className="mb-6 flex justify-center">
            <div className="flex aspect-[4/5] w-1/3 items-center justify-center rounded border border-dotted">
              <span className="font-semibold">Preview</span>
            </div>
          </div>
        )}

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
