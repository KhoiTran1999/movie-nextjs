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
import { EpisodeType, SeasonType } from "@/types";
import { deepEqual } from "assert";
import {
  getSeasonListAction,
  revalidateTagSeasonListAction,
} from "@/components/actions";

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
      const seasonList = await getSeasonListAction(movieId);
      console.log(seasonList);

      setFetchedSeason(seasonList);

      const filterdSeasonList = seasonList?.map((season: SeasonType) => {
        const filterdEpisodes = season.episodes.map((episode: EpisodeType) => ({
          video: episode.video,
          name: episode.name,
        }));
        return { name: season.name, episode: filterdEpisodes };
      });

      form.setFieldValue("seasonList", filterdSeasonList);
      setOldSeasonList(filterdSeasonList);

      setIsLoadingNextButton(false);
    };
    fetchApi();
  }, []);

  //----------------------------------------------
  const handleOnFinish = async (values: any) => {
    console.log(values);

    if (!values.seasonList) {
      return setCurrent((prev: number) => prev + 1);
    }

    if (values.seasonList.length === 1 && !values.seasonList[0].episode) {
      setCurrent((prev: number) => prev + 1);
      return form.resetFields();
    }
    try {
      //Compare Old values and New value
      deepEqual(oldSeasonList, values.seasonList, "not same");
      form.resetFields();
      setCurrent((prev: number) => prev + 1);
    } catch (error) {
      setIsLoadingNextButton(true);
      //3 Situation about Updating VideoForm
      if (values.seasonList.length === oldSeasonList.length) {
        const fetchUpdateVideoFormCase1 = async () => {
          for (const [idx, season] of values.seasonList.entries()) {
            try {
              //Compare Old and New Season
              deepEqual(season, oldSeasonList[idx], "Season not same");
            } catch (error) {
              // Update Season
              try {
                await Axios.put(
                  `Seasons/${fetchedSeason[idx].seasonId}`,
                  season.name
                );
              } catch (error) {
                setIsLoadingNextButton(false);
                console.log(error);
              }

              //-------------------------------------------
              const newEpisodeList = season.episode.map(
                (episode: EpisodeFilterdType, index: number) => {
                  return {
                    episodeId: fetchedSeason[idx]?.episodes[index]?.episodeId,
                    name: episode.name,
                    video: episode.video,
                  };
                }
              );
              const oldEpisodeList = oldSeasonList[idx].episode.map(
                (episode: EpisodeFilterdType, index: number) => {
                  return {
                    episodeId: fetchedSeason[idx]?.episodes[index]?.episodeId,
                    name: episode.name,
                    video: episode.video,
                  };
                }
              );

              //Update Episode: 3 situations
              if (season.episode.length === oldSeasonList[idx].episode.length) {
                try {
                  await Axios.put(
                    `episode/${fetchedSeason[idx].seasonId}`,
                    newEpisodeList
                  );
                } catch (error) {
                  console.log(error);
                  setIsLoadingNextButton(false);
                }
              } else if (
                season.episode.length > oldSeasonList[idx].episode.length
              ) {
                //New Episode List > Old Episode List

                //Update first apart of New Episode which equal the length of Old Episode List
                let apartOfNewEpisodeList;
                if (newEpisodeList.length >= 2) {
                  apartOfNewEpisodeList = newEpisodeList.slice(
                    0,
                    oldSeasonList[idx].episode.length
                  );
                } else
                  throw Error("New Episode list must have at least 2 episodes");

                try {
                  await Axios.put(
                    `episode/${fetchedSeason[idx].seasonId}`,
                    apartOfNewEpisodeList
                  );
                } catch (error) {
                  setIsLoadingNextButton(false);
                  console.log(error);
                }

                //Create a rest of New Episode
                const restOfNewEpisodeList = newEpisodeList
                  .slice(oldSeasonList[idx].episode.length)
                  .map((val: EpisodeFilterdType) => ({
                    name: val.name,
                    video: val.video,
                  }));

                try {
                  await Axios.post(`episode`, restOfNewEpisodeList, {
                    params: { seasonId: fetchedSeason[idx].seasonId },
                  });
                } catch (error) {
                  console.log(error);
                  setIsLoadingNextButton(false);
                }
              } else {
                //New Episode List < Old Episode List
                console.log(
                  "season.episode.length < oldSeasonList[idx].episode.length"
                );

                //Update New Episode
                try {
                  await Axios.put(
                    `episode/${fetchedSeason[idx].seasonId}`,
                    newEpisodeList
                  );
                } catch (error) {
                  setIsLoadingNextButton(false);
                  console.log(error);
                }

                //Delete a rest of Old Episode
                const theRestOfOldEpisodeList = oldEpisodeList.slice(
                  season.episode.length
                );
                console.log(
                  "theRestOfOldEpisodeList: ",
                  theRestOfOldEpisodeList
                );

                for (const [
                  idx,
                  episode,
                ] of theRestOfOldEpisodeList.entries()) {
                  try {
                    await Axios.delete(`episode/${episode.episodeId}`);
                  } catch (error) {
                    console.log(error);
                    setIsLoadingNextButton(false);
                  }
                }
              }
            }
          }
          await revalidateTagSeasonListAction();
          setCurrent((prev: number) => prev + 1);
          setIsLoadingNextButton(false);
        };
        fetchUpdateVideoFormCase1();
      } else if (values.seasonList.length > oldSeasonList.length) {
        const fetchUpdateVideoFormCase2 = async () => {
          for (const [idx, season] of values.seasonList.entries()) {
            try {
              //Compare Old and New Season
              deepEqual(season, oldSeasonList[idx], "Season not same");
            } catch (error) {
              if (idx === oldSeasonList.length) {
                break;
              }
              // Update Season
              try {
                await Axios.put(
                  `Seasons/${fetchedSeason[idx].seasonId}`,
                  season.name
                );
              } catch (error) {
                setIsLoadingNextButton(false);
                console.log(error);
              }
            }

            //-------------------------------------------
            const newEpisodeList = season.episode.map(
              (episode: EpisodeFilterdType, index: number) => {
                return {
                  episodeId: fetchedSeason[idx]?.episodes[index]?.episodeId,
                  name: episode.name,
                  video: episode.video,
                };
              }
            );
            const oldEpisodeList = oldSeasonList[idx].episode.map(
              (episode: EpisodeFilterdType, index: number) => {
                return {
                  episodeId: fetchedSeason[idx]?.episodes[index]?.episodeId,
                  name: episode.name,
                  video: episode.video,
                };
              }
            );

            //Update Episode: 3 situations
            if (season.episode.length === oldSeasonList[idx].episode.length) {
              try {
                await Axios.put(
                  `episode/${fetchedSeason[idx].seasonId}`,
                  newEpisodeList
                );
              } catch (error) {
                console.log(error);
                setIsLoadingNextButton(false);
              }
            } else if (
              season.episode.length > oldSeasonList[idx].episode.length
            ) {
              //New Episode List > Old Episode List

              //Update first apart of New Episode which equal the length of Old Episode List
              let apartOfNewEpisodeList;
              if (newEpisodeList.length >= 2) {
                apartOfNewEpisodeList = newEpisodeList.slice(
                  0,
                  oldSeasonList[idx].episode.length
                );
              } else
                throw Error("New Episode list must have at least 2 episodes");

              try {
                await Axios.put(
                  `episode/${fetchedSeason[idx].seasonId}`,
                  apartOfNewEpisodeList
                );
              } catch (error) {
                setIsLoadingNextButton(false);
                console.log(error);
              }

              //Create a rest of New Episode
              const restOfNewEpisodeList = newEpisodeList
                .slice(oldSeasonList[idx].episode.length)
                .map((val: EpisodeFilterdType) => ({
                  name: val.name,
                  video: val.video,
                }));

              try {
                await Axios.post(`episode`, restOfNewEpisodeList, {
                  params: { seasonId: fetchedSeason[idx].seasonId },
                });
              } catch (error) {
                console.log(error);
                setIsLoadingNextButton(false);
              }
            } else {
              //New Episode List < Old Episode List
              console.log(
                "season.episode.length < oldSeasonList[idx].episode.length"
              );

              //Update New Episode
              try {
                await Axios.put(
                  `episode/${fetchedSeason[idx].seasonId}`,
                  newEpisodeList
                );
              } catch (error) {
                setIsLoadingNextButton(false);
                console.log(error);
              }

              //Delete a rest of Old Episode
              const theRestOfOldEpisodeList = oldEpisodeList.slice(
                season.episode.length
              );
              console.log("theRestOfOldEpisodeList: ", theRestOfOldEpisodeList);

              for (const [idx, episode] of theRestOfOldEpisodeList.entries()) {
                try {
                  await Axios.delete(`episode/${episode.episodeId}`);
                } catch (error) {
                  console.log(error);
                  setIsLoadingNextButton(false);
                }
              }
            }
          }

          //Add the rest of New Season
          const theRestOfNewSeason = values.seasonList.slice(
            oldSeasonList.length
          );
          for (const season of theRestOfNewSeason) {
            try {
              const seasonId = await Axios.post("Seasons", {
                movieId,
                name: season.name,
              });

              await Axios.post("episode", season.episode, {
                params: { seasonId: seasonId.data },
              });
            } catch (error) {
              console.log(error);
              setIsLoadingNextButton(false);
              return;
            }
          }

          await revalidateTagSeasonListAction();
          setCurrent((prev: number) => prev + 1);
          setIsLoadingNextButton(false);
        };
        fetchUpdateVideoFormCase2();
      } else {
        //Update New Season with the length of itself

        const fetchUpdateVideoFormCase3 = async () => {
          for (const [idx, season] of values.seasonList.entries()) {
            try {
              //Compare Old and New Season
              deepEqual(season, oldSeasonList[idx], "Season not same");
            } catch (error) {
              // Update Season
              try {
                await Axios.put(
                  `Seasons/${fetchedSeason[idx].seasonId}`,
                  season.name
                );
              } catch (error) {
                setIsLoadingNextButton(false);
                console.log(error);
              }

              //-------------------------------------------
              const newEpisodeList = season.episode.map(
                (episode: EpisodeFilterdType, index: number) => {
                  return {
                    episodeId: fetchedSeason[idx]?.episodes[index]?.episodeId,
                    name: episode.name,
                    video: episode.video,
                  };
                }
              );
              const oldEpisodeList = oldSeasonList[idx].episode.map(
                (episode: EpisodeFilterdType, index: number) => {
                  return {
                    episodeId: fetchedSeason[idx]?.episodes[index]?.episodeId,
                    name: episode.name,
                    video: episode.video,
                  };
                }
              );

              //Update Episode: 3 situations
              if (season.episode.length === oldSeasonList[idx].episode.length) {
                try {
                  await Axios.put(
                    `episode/${fetchedSeason[idx].seasonId}`,
                    newEpisodeList
                  );
                } catch (error) {
                  console.log(error);
                  setIsLoadingNextButton(false);
                }
              } else if (
                season.episode.length > oldSeasonList[idx].episode.length
              ) {
                //New Episode List > Old Episode List

                //Update first apart of New Episode which equal the length of Old Episode List
                let apartOfNewEpisodeList;
                if (newEpisodeList.length >= 2) {
                  apartOfNewEpisodeList = newEpisodeList.slice(
                    0,
                    oldSeasonList[idx].episode.length
                  );
                } else
                  throw Error("New Episode list must have at least 2 episodes");

                try {
                  await Axios.put(
                    `episode/${fetchedSeason[idx].seasonId}`,
                    apartOfNewEpisodeList
                  );
                } catch (error) {
                  setIsLoadingNextButton(false);
                  console.log(error);
                }

                //Create a rest of New Episode
                const restOfNewEpisodeList = newEpisodeList
                  .slice(oldSeasonList[idx].episode.length)
                  .map((val: EpisodeFilterdType) => ({
                    name: val.name,
                    video: val.video,
                  }));

                try {
                  await Axios.post(`episode`, restOfNewEpisodeList, {
                    params: { seasonId: fetchedSeason[idx].seasonId },
                  });
                } catch (error) {
                  console.log(error);
                  setIsLoadingNextButton(false);
                }
              } else {
                //New Episode List < Old Episode List
                console.log(
                  "season.episode.length < oldSeasonList[idx].episode.length"
                );

                //Update New Episode
                try {
                  await Axios.put(
                    `episode/${fetchedSeason[idx].seasonId}`,
                    newEpisodeList
                  );
                } catch (error) {
                  setIsLoadingNextButton(false);
                  console.log(error);
                }

                //Delete a rest of Old Episode
                const theRestOfOldEpisodeList = oldEpisodeList.slice(
                  season.episode.length
                );
                console.log(
                  "theRestOfOldEpisodeList: ",
                  theRestOfOldEpisodeList
                );

                for (const [
                  idx,
                  episode,
                ] of theRestOfOldEpisodeList.entries()) {
                  try {
                    await Axios.delete(`episode/${episode.episodeId}`);
                  } catch (error) {
                    console.log(error);
                    setIsLoadingNextButton(false);
                  }
                }
              }
            }
          }

          //Delete the rest of Old Season
          const theRestOfOldSeason = fetchedSeason.slice(
            values.seasonList.length
          );
          for (const season of theRestOfOldSeason) {
            try {
              await Axios.delete(`Seasons/${season.seasonId}`);
            } catch (error) {
              console.log(error);
              setIsLoadingNextButton(false);
            }
          }

          await revalidateTagSeasonListAction();
          setCurrent((prev: number) => prev + 1);
          setIsLoadingNextButton(false);
        };
        fetchUpdateVideoFormCase3();
      }
    }
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
