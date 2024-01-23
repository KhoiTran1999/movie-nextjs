type movieProps = {
  seasonNumber: number;
  episodeNumber: number;
  name: string;
  video: string;
};

export const WatchModal = ({
  seasonNumber,
  episodeNumber,
  name,
  video,
}: movieProps) => {
  return (
    <div className="h-[70svh]">
      <iframe
        src={`https://drive.google.com/file/d/${video}/preview`}
        width="100%"
        height="100%"
        frameBorder="100"
        allowFullScreen
        title={`${name} - Episode ${episodeNumber} - Season ${seasonNumber}`}
        style={{ borderRadius: "10px" }}
        id="iframeVideo"
      ></iframe>
    </div>
  );
};
