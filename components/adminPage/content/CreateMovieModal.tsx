import { Form, Input, Button, Modal, Popconfirm, Tooltip, Steps } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InformationForm from "./form/InformationForm";
import VideoForm from "./form/videoForm";
import { isLoadingAIButtonSelector } from "@/utils/redux/selector";
import { setIsCancelButtonModal } from "@/utils/redux/slices/toggle/IsCancelButtonModalSlice";
import ActorForm from "./form/actorForm";
import { setMovieId } from "@/utils/redux/slices/data/movieIdSlice";

interface CreateMovieModalType {
  isModalOpen: boolean;
  handleOk: Function;
  handleCancel: Function;
}

const CreateMovieModal = ({
  isModalOpen,
  handleOk,
  handleCancel,
}: CreateMovieModalType) => {
  const dispath = useDispatch();

  const [current, setCurrent] = useState<number>(0);
  const [clickAIButton, setClickAIButton] = useState<number>(0);
  const [isLoadingNextButton, setIsLoadingNextButton] =
    useState<boolean>(false);

  const isLoadingAIButton = useSelector(isLoadingAIButtonSelector);

  return (
    <Modal
      title={
        <Steps current={current}>
          <Steps.Step
            title="Information"
            icon={<i className="fa-regular fa-circle-info"></i>}
          />
          <Steps.Step
            title="Video"
            icon={<i className="fa-light fa-clapperboard-play"></i>}
            active={true}
          />
          <Steps.Step
            title="Actor"
            icon={<i className="fa-light fa-users"></i>}
          />
        </Steps>
      }
      open={isModalOpen}
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
                  AI will help you create a movie.
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
            handleCancel();
            dispath(setIsCancelButtonModal());
            setCurrent(0);
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
          form="createMovie"
          loading={isLoadingNextButton}
          onClick={() => setCurrent(current + 1)}
        >
          Next
        </Button>,
      ]}
    >
      <div className="h-[70svh] overflow-auto p-3">
        <div className="flex justify-center">
          {/* {current === 0 ? (
            <InformationForm
              handleOk={handleOk}
              handleCancel={handleCancel}
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
            <ActorForm />
          )} */}
          <ActorForm />
        </div>
      </div>
    </Modal>
  );
};

export default CreateMovieModal;
