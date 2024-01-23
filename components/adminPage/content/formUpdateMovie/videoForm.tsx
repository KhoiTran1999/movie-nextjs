import { Button, Card, Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import {
  PlusOutlined,
  MinusCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import {
  isCancelButtonModalSelector,
  movieIdSelector,
} from "@/utils/redux/selector";
import Axios from "@/utils/axios";

interface VideoFormType {
  setCurrent: Function;
  setIsLoadingNextButton: Function;
  isLoadingNextButton: boolean;
}

const VideoForm = ({
  setCurrent,
  setIsLoadingNextButton,
  isLoadingNextButton,
}: VideoFormType) => {
  const [form] = Form.useForm();

  const isCancelButtonModal = useSelector(isCancelButtonModalSelector);
  const movieId = useSelector(movieIdSelector);

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

  useEffect(() => {
    form.resetFields();
  }, [isCancelButtonModal]);

  const handleOnFinish = async (values: any) => {
    if (movieId && values.seasonList) {
      setIsLoadingNextButton(true);
      values.seasonList.forEach(async (season: any) => {
        try {
          const seasonId = await Axios.post("Seasons", {
            movieId: movieId.data,
            name: season.seasonName,
          });

          try {
            await Axios.post("episode", season.episode, {
              params: { seasonId: seasonId.data },
            });

            try {
              Axios.patch(
                `Movie/${movieId}`,
                {},
                { params: { status: "Release" } }
              );
            } catch (error) {
              console.log(error);
            }

            success("Create Episode succesfully");
            setTimeout(() => {
              setIsLoadingNextButton(false);
              setCurrent((prev: number) => prev + 1);
            }, 2000);
          } catch (error) {
            console.log(error);
            errorRes("Failed to add Episode");
            setIsLoadingNextButton(false);
          }
        } catch (error) {
          console.log(error);
          errorRes("Failed to add Season");
          setIsLoadingNextButton(false);
          return;
        }
      });
    } else {
      setCurrent((prev: number) => prev + 1);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      {contextHolder}
      <Form
        form={form}
        layout="horizontal"
        style={{ width: "100%" }}
        id="createMovie"
        onFinish={handleOnFinish}
      >
        <Form.List name="seasonList">
          {(fields, { add, remove }) => (
            <div
              style={{ display: "flex", rowGap: 16, flexDirection: "column" }}
            >
              {fields.map((field) => (
                <Card
                  size="small"
                  title={`season ${field.name + 1}`}
                  key={field.key}
                  style={{ backgroundColor: "transparent" }}
                  extra={
                    <CloseOutlined
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  }
                >
                  <Form.Item
                    label={"Name"}
                    name={[field.name, "seasonName"]}
                    rules={[{ required: true }]}
                  >
                    <Input
                      className="bg-transparent placeholder:text-[#5d5d5d]"
                      placeholder="season name"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Form.List name={[field.name, "episode"]}>
                      {(subFields, subOpt, { errors }) => (
                        <>
                          {subFields.map((subField, index) => (
                            <Form.Item
                              label={`Episode ` + (index + 1)}
                              required={false}
                              key={subField.key}
                            >
                              <div className="flex items-center">
                                <Form.Item
                                  name={[subField.name, "video"]}
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
                                    disabled={isLoadingNextButton}
                                    style={{ marginRight: "20px", flex: 2 }}
                                  />
                                </Form.Item>
                                <Form.Item
                                  name={[subField.name, "name"]}
                                  rules={[
                                    {
                                      required: true,
                                      whitespace: true,
                                      message:
                                        "Please input name or delete this field.",
                                    },
                                  ]}
                                  noStyle
                                >
                                  <Input
                                    className="bg-transparent placeholder:text-[#5d5d5d]"
                                    placeholder="name"
                                    disabled={isLoadingNextButton}
                                    style={{ flex: 1 }}
                                  />
                                </Form.Item>
                                {subFields.length > 0 ? (
                                  <MinusCircleOutlined
                                    className="dynamic-delete-button ml-3 hover:text-[red] transition-colors"
                                    onClick={() => {
                                      if (subFields.length === 1) {
                                        return remove(field.name);
                                      }
                                      subOpt.remove(subField.name);
                                    }}
                                  />
                                ) : null}
                              </div>
                            </Form.Item>
                          ))}
                          <Form.Item wrapperCol={{ offset: 8 }}>
                            {!isLoadingNextButton && (
                              <Button
                                type="dashed"
                                onClick={() => subOpt.add()}
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
                  </Form.Item>
                </Card>
              ))}
              <Button type="dashed" onClick={() => add()} block>
                + Add Season
              </Button>
            </div>
          )}
        </Form.List>
      </Form>
    </div>
  );
};

export default VideoForm;
