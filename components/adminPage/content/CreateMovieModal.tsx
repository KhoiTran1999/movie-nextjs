import { Form, Input, InputNumber, DatePicker } from "antd";
import moment from "moment";
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
};

const CreateMovieModal = () => {
  const disabledDate = (current: any) => {
    // Disable dates before today
    return current && current > moment().endOf("day");
  };

  return (
    <div>
      <Form
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
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
          rules={[
            {
              message: "From 20 to 240 only",
            },
          ]}
        >
          <InputNumber
            min={20}
            max={240}
            placeholder="120"
            addonAfter="Minutes"
            className="inputCustom"
            defaultValue={20}
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
          <InputNumber
            placeholder="Viewer"
            min={0}
            max={10}
            className="inputCustom"
          />
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
      </Form>
    </div>
  );
};

export default CreateMovieModal;
