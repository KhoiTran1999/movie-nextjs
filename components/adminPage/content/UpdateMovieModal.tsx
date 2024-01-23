import { Form, Input, Button, Modal, Popconfirm, Tooltip, Steps } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InformationForm from "./formUpdateMovie/InformationForm";
import VideoForm from "./formUpdateMovie/videoForm";
import { isLoadingAIButtonSelector } from "@/utils/redux/selector";
import { setIsCancelButtonModal } from "@/utils/redux/slices/toggle/IsCancelButtonModalSlice";
import ActorForm from "./formUpdateMovie/actorForm";
import { setMovieId } from "@/utils/redux/slices/data/movieIdSlice";

interface UpdateMovieModalType {
  isUpdateModalOpen: boolean;
  handleOkUpdateModal: Function;
  handleCancelUpdateModal: Function;
}

const UpdateMovieModal = ({
  isUpdateModalOpen,
  handleOkUpdateModal,
  handleCancelUpdateModal,
}: UpdateMovieModalType) => {
  const dispath = useDispatch();

  const [current, setCurrent] = useState<number>(0);
  const [clickAIButton, setClickAIButton] = useState<number>(0);
  const [isLoadingNextButton, setIsLoadingNextButton] =
    useState<boolean>(false);
  const isLoadingAIButton = useSelector(isLoadingAIButtonSelector);

  return (
    <Modal
      width={current >= 2 ? "800px" : "530px"}
      title={
        <Steps current={current} key={"step"}>
          <Steps.Step
            key={"Information"}
            title="Information"
            icon={<i className="fa-regular fa-circle-info"></i>}
          />
          <Steps.Step
            key={"Video"}
            title="Video"
            icon={<i className="fa-light fa-clapperboard-play"></i>}
          />
          <Steps.Step
            key={"Actor"}
            title="Actor"
            icon={<i className="fa-light fa-user"></i>}
          />
        </Steps>
      }
      open={isUpdateModalOpen}
      centered
      closeIcon={false}
      okButtonProps={{ hidden: true }}
      cancelButtonProps={{ hidden: true }}
      footer={[
        <>
          {current === 0 && (
            <Tooltip
              key={"AICreateMovie"}
              title={
                <p>
                  AI will help you to create a movie.
                  <br /> *English Name: required
                  <br />
                  *Nation: optional. It will help the result more exactly
                </p>
              }
            >
              <Button
                onClick={() => setClickAIButton((prev) => prev + 1)}
                danger
                loading={isLoadingAIButton}
                disabled={isLoadingNextButton}
              >
                <i className="fa-sharp fa-solid fa-stars mr-1"></i>
                AI Create
              </Button>
            </Tooltip>
          )}
        </>,
        <Popconfirm
          key={"Cancel"}
          title="Cancel create movie"
          description="Are you sure to cancel this movie? All this data will be lost"
          onConfirm={() => {
            handleCancelUpdateModal();
            dispath(setIsCancelButtonModal());
            setCurrent(0);
            setClickAIButton(0);
            dispath(setMovieId(""));
          }}
        >
          <Button
            disabled={isLoadingAIButton || isLoadingNextButton}
            key="back"
            type="text"
          >
            Cancel
          </Button>
        </Popconfirm>,
        <Button
          disabled={isLoadingAIButton}
          key="Submit"
          htmlType="submit"
          form="updateMovie"
          loading={isLoadingNextButton}
          onClick={() => {
            if (current >= 2) {
              return setTimeout(() => {
                handleOkUpdateModal();
                setCurrent(0);
                setClickAIButton(0);
              }, 2000);
            }
          }}
        >
          Next
        </Button>,
      ]}
    >
      <div className="h-[70svh] overflow-auto p-3">
        <div className="flex justify-center">
          {current === 0 ? (
            <InformationForm
              handleOk={handleOkUpdateModal}
              handleCancel={handleCancelUpdateModal}
              clickAIButton={clickAIButton}
              setCurrent={setCurrent}
              setIsLoadingNextButton={setIsLoadingNextButton}
              isLoadingNextButton={isLoadingNextButton}
            />
          ) : current === 1 ? (
            <VideoForm
              setCurrent={setCurrent}
              setIsLoadingNextButton={setIsLoadingNextButton}
              isLoadingNextButton={isLoadingNextButton}
            />
          ) : (
            <ActorForm
              setCurrent={setCurrent}
              current={current}
              setIsLoadingNextButton={setIsLoadingNextButton}
              isLoadingNextButton={isLoadingNextButton}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default UpdateMovieModal;
