import { Button, Form, Input } from "antd";
import { useState } from "react";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

const VideoForm = () => {
  const [saveLoading, setSaveLoading] = useState<boolean>(false);

  return (
    <Form
      // form={form}
      labelCol={{ span: 7 }}
      layout="horizontal"
      style={{ width: "70%" }}
      id="createInformationForm"
    >
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
                  Add Link Episode
                </Button>
              )}
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
};

export default VideoForm;
