import { Rubik_Dirt } from "@next/font/google";
import Link from "next/link";
import VideoPlayer from "./component/VideoPlayer";

interface previewMovieProps {
  description: string;
  englishName: string;
  movieId: number;
  vietnamName: string;
  trailer: string;
  thumbnail: string;
}

const rubik = Rubik_Dirt({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});

const TopPageMovie = async () => {
  const res = await fetch(`${process.env.API_URL}/Movies/Newest`, {
    next: { tags: ["newest-movie"] },
  });
  console.log("=====> Fetch Newst Movie");

  const previewMovie: previewMovieProps = await res.json();

  return (
    <div className="text-white overflow-hidden relative h-[80vh] w-screen">
      <VideoPlayer trailer={previewMovie?.trailer} />

      <div
        style={{
          boxShadow: "0px -240px 44px -215px rgba(0,0,0,1) inset",
        }}
        className="text-[#D1D0CF] absolute z-9 top-1/2 translate-y-[-50%] z-0 h-[80vh] w-screen px-12 flex flex-col justify-center"
      >
        <h1
          className={`${rubik.className} text-7xl my-4 tracking-wider [word-spacing:5px] animate-wiggle w-2/3`}
        >
          {previewMovie?.englishName}
        </h1>
        <p className="w-2/5 mb-4 max-h-[148px] break-words line-clamp-[3] text-ellipsis overflow-hidden animate-wiggle">
          {previewMovie?.description}
        </p>
        <div className="mt-5 flex animate-wiggle">
          <Link href={`/detail?id=${previewMovie?.movieId}`}>
            <button className="w-32 h-10 text-white rounded-md bg-[#b2afaf94] hover:bg-[#adaaaa64] transition-colors">
              Detail
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopPageMovie;
