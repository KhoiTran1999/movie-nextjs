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
import { SeasonType } from "@/types";
import { deepEqual } from "assert";

interface VideoFormType {
  setCurrent: Function;
  setIsLoadingNextButton: Function;
  isLoadingNextButton: boolean;
}

interface SeasonFilterdType {
  name: string;
  episode: EpisodeFilterdType[];
}

interface EpisodeFilterdType {
  name: string;
  video: string;
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

  const [oldSeasonList, setOldSeasonList] = useState<SeasonFilterdType[]>([]);
  const [fetchedSeason, setFetchedSeason] = useState<SeasonType[]>([]);

  useEffect(() => {
    form.resetFields();
  }, [isCancelButtonModal]);

  //Add first render value -----------------------
  useEffect(() => {
    const fetchApi = async () => {
      setIsLoadingNextButton(true);
      const res = await fetch(
        `${process.env.API_URL}/Seasons?movieId=${movieId}`
      );
      const seasonList = await res.json();
      setFetchedSeason(seasonList);

      const filterdSeasonList = seasonList.map((season: any) => {
        const filterdEpisodes = season.episodes.map((episode: any) => ({
          video: episode.video,
          name: episode.name,
        }));
        return { name: season.name, episode: filterdEpisodes };
      });
      console.log("filterdSeasonList: ", filterdSeasonList);

      form.setFieldValue("seasonList", filterdSeasonList);
      setOldSeasonList(filterdSeasonList);

      setIsLoadingNextButton(false);
    };
    fetchApi();
  }, []);

  //----------------------------------------------
  const handleOnFinish = async (values: any) => {
    console.log(values);

    // if (!values.seasonList) {
    //   return setCurrent((prev: number) => prev + 1);
    // }

    // if (values.seasonList.length === 1 && !values.seasonList[0].episode) {
    //   setCurrent((prev: number) => prev + 1);
    //   return form.resetFields();
    // }

    // console.log("fetchedSeason: ", fetchedSeason);
    // console.log("oldSeason: ", oldSeasonList);
    // console.log("values.seasonList: ", values.seasonList);

    // try {
    //   //Compare Old values and New value
    //   deepEqual(oldSeasonList, values.seasonList, "not same");
    //   form.resetFields();
    //   setCurrent((prev: number) => prev + 1);
    // } catch (error) {
    //   //3 Situation about Updating VideoForm
    //   if (values.seasonList.length === oldSeasonList.length) {
    //     values.seasonList.forEach((season: SeasonFilterdType, idx: number) => {
    //       const fetchUpdateSeason = async () => {
    //         //Update Season
    //         try {
    //           await Axios.put(
    //             `Seasons/${fetchedSeason[idx].seasonId}`,
    //             season.name
    //           );
    //         } catch (error) {
    //           console.log(error);
    //         }

    //         //-------------------------------------------
    //         const newEpisode = season.episode.map(
    //           (episode: EpisodeFilterdType, idx: number) => {
    //             return {
    //               episodeId: fetchedSeason[idx].episodes[idx].episodeId,
    //               name: episode.name,
    //               video: episode.video,
    //             };
    //           }
    //         );
    //         //Update Episode: 3 situation
    //         if (season.episode.length <= oldSeasonList[idx].episode.length) {
    //           try {
    //             await Axios.put(
    //               `episode/${fetchedSeason[idx].seasonId}`,
    //               newEpisode
    //             );
    //           } catch (error) {
    //             console.log(error);
    //           }
    //         } else {
    //           //New Episode List > Old Episode List

    //           //Update first apart of New Episode which equal the length of Old Episode List
    //           const apartOfNewEpisodeList = newEpisode.slice(
    //             0,
    //             oldSeasonList[idx].episode.length - 1
    //           );

    //           try {
    //             await Axios.put(
    //               `episode/${fetchedSeason[idx].seasonId}`,
    //               apartOfNewEpisodeList
    //             );
    //           } catch (error) {
    //             console.log(error);
    //           }

    //           //Create a rest of New Episode
    //           const restOfNewEpisodeList = newEpisode
    //             .slice(oldSeasonList[idx].episode.length - 1)
    //             .map((val) => ({ name: val.name, video: val.video }));

    //           try {
    //             await Axios.post(`episode`, restOfNewEpisodeList, {
    //               params: { seasonId: fetchedSeason[idx].seasonId },
    //             });
    //           } catch (error) {
    //             console.log(error);
    //           }
    //         }
    //       };
    //       fetchUpdateSeason();
    //     });
    //   } else if (values.seasonList.length > oldSeasonList.length) {
    //     //Update First New Season with the length of Old Season List

    //     values.seasonList.forEach((season: SeasonFilterdType, idx: number) => {
    //       const updateFirstNewSeason = async () => {
    //         //Update Season
    //         try {
    //           await Axios.put(`Seasons/${fetchedSeason[idx].seasonId}`);
    //         } catch (error) {
    //           console.log(error);
    //         }

    //         //-------------------------------------------
    //         const newEpisode = season.episode.map(
    //           (episode: EpisodeFilterdType, idx: number) => {
    //             return {
    //               episodeId: fetchedSeason[idx].episodes[idx].episodeId,
    //               name: episode.name,
    //               video: episode.video,
    //             };
    //           }
    //         );
    //         //Update Episode: 3 situation
    //         if (season.episode.length <= oldSeasonList[idx].episode.length) {
    //           try {
    //             await Axios.put(
    //               `episode/${fetchedSeason[idx].seasonId}`,
    //               newEpisode
    //             );
    //           } catch (error) {
    //             console.log(error);
    //           }
    //         } else {
    //           //New Episode List > Old Episode List

    //           //Update first apart of New Episode which equal the length of Old Episode List
    //           const apartOfNewEpisodeList = newEpisode.slice(
    //             0,
    //             oldSeasonList[idx].episode.length - 1
    //           );

    //           try {
    //             await Axios.put(
    //               `episode/${fetchedSeason[idx].seasonId}`,
    //               apartOfNewEpisodeList
    //             );
    //           } catch (error) {
    //             console.log(error);
    //           }

    //           //Create a rest of New Episode
    //           const restOfNewEpisodeList = newEpisode
    //             .slice(oldSeasonList[idx].episode.length - 1)
    //             .map((val) => ({ name: val.name, video: val.video }));

    //           try {
    //             await Axios.post(`episode`, restOfNewEpisodeList, {
    //               params: { seasonId: fetchedSeason[idx].seasonId },
    //             });
    //           } catch (error) {
    //             console.log(error);
    //           }
    //         }
    //       };
    //       const updateTheRestOfNewSeason = async () => {
    //         const seasonId = await Axios.post("Seasons", {
    //           movieId,
    //           name: season.name,
    //         });

    //         try {
    //           await Axios.post("episode", season.episode, {
    //             params: { seasonId: seasonId.data },
    //           });
    //         } catch (error) {
    //           console.log(error);
    //         }
    //       };

    //       //Example: New Season length = 5, Old Season length = 3 => Update the first 3 of New Season Element
    //       if (fetchedSeason[idx]) updateFirstNewSeason();
    //       else {
    //         //Update the Rest of New Season Element
    //         updateTheRestOfNewSeason();
    //       }
    //     });
    //   } else {
    //     //Update New Season with the length of itself

    //     values.seasonList.forEach((season: SeasonFilterdType, idx: number) => {
    //       const updateFirstNewSeason = async () => {
    //         //Update Season
    //         try {
    //           await Axios.put(`Seasons/${fetchedSeason[idx].seasonId}`);
    //         } catch (error) {
    //           console.log(error);
    //         }

    //         //-------------------------------------------
    //         const newEpisode = season.episode.map(
    //           (episode: EpisodeFilterdType, idx: number) => {
    //             return {
    //               episodeId: fetchedSeason[idx].episodes[idx].episodeId,
    //               name: episode.name,
    //               video: episode.video,
    //             };
    //           }
    //         );
    //         //Update Episode: 3 situation
    //         if (season.episode.length <= oldSeasonList[idx].episode.length) {
    //           try {
    //             await Axios.put(
    //               `episode/${fetchedSeason[idx].seasonId}`,
    //               newEpisode
    //             );
    //           } catch (error) {
    //             console.log(error);
    //           }
    //         } else {
    //           //New Episode List > Old Episode List

    //           //Update first apart of New Episode which equal the length of Old Episode List
    //           const apartOfNewEpisodeList = newEpisode.slice(
    //             0,
    //             oldSeasonList[idx].episode.length - 1
    //           );

    //           try {
    //             await Axios.put(
    //               `episode/${fetchedSeason[idx].seasonId}`,
    //               apartOfNewEpisodeList
    //             );
    //           } catch (error) {
    //             console.log(error);
    //           }

    //           //Create a rest of New Episode
    //           const restOfNewEpisodeList = newEpisode
    //             .slice(oldSeasonList[idx].episode.length - 1)
    //             .map((val) => ({ name: val.name, video: val.video }));

    //           try {
    //             await Axios.post(`episode`, restOfNewEpisodeList, {
    //               params: { seasonId: fetchedSeason[idx].seasonId },
    //             });
    //           } catch (error) {
    //             console.log(error);
    //           }
    //         }
    //       };
    //       updateFirstNewSeason();
    //     });
    //     const theRestOfOldSeasonList = oldSeasonList.slice(
    //       values.seasonList.length - 1
    //     );
    //     theRestOfOldSeasonList.forEach(
    //       async (oldSeason: SeasonFilterdType, idx: number) => {
    //         await Axios.delete(`Seasons/${fetchedSeason[idx].seasonId}`);
    //       }
    //     );
    //   }
    // }
  };

  return (
    <div style={{ width: "100%" }}>
      {contextHolder}
      <Form
        form={form}
        layout="horizontal"
        style={{ width: "100%" }}
        id="updateMovie"
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
                    name={[field.name, "name"]}
                    rules={[{ required: true }]}
                  >
                    <Input
                      className="bg-transparent placeholder:text-[#5d5d5d]"
                      placeholder="season name"
                      disabled={isLoadingNextButton}
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
                                        "Please input ID Video or delete this field.",
                                    },
                                  ]}
                                  noStyle
                                >
                                  <Input
                                    className="bg-transparent placeholder:text-[#5d5d5d]"
                                    placeholder="1MEcf3..."
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
                                disabled={isLoadingNextButton}
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
              <Button
                disabled={isLoadingNextButton}
                type="dashed"
                onClick={() => add()}
                block
              >
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
