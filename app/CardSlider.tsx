import dynamic from "next/dynamic";
const CardSliderCinemaMovie = dynamic(
  () =>
    import(
      "@/components/homePage/cardSlider/cardSliderFeature/CardSliderCinemaMovie"
    ),
);
const CardSliderNewMovie = dynamic(
  () =>
    import(
      "@/components/homePage/cardSlider/cardSliderFeature/CardSliderNewMovie"
    ),
);
const CardSliderStandalone = dynamic(
  () =>
    import(
      "@/components/homePage/cardSlider/cardSliderFeature/CardSliderStandalone"
    ),
);
const CardSliderTVSeriesMovie = dynamic(
  () =>
    import(
      "@/components/homePage/cardSlider/cardSliderFeature/CardSliderTVSeriesMovie"
    ),
);
const CardSliderUpcomingMovie = dynamic(
  () =>
    import(
      "@/components/homePage/cardSlider/cardSliderFeature/CardSliderUpcomingMovie"
    ),
);
const CardSliderTop10Data = dynamic(
  () =>
    import(
      "@/components/homePage/cardSlider/cardSliderTop10/CardSliderTop10Data"
    ),
);
import { Spin } from "antd";

export const CardSlider = () => {
  return (
    <>
      <CardSliderNewMovie />
      <CardSliderTop10Data />
      <CardSliderUpcomingMovie />
      <CardSliderStandalone />
      <CardSliderCinemaMovie />
      <CardSliderTVSeriesMovie />
    </>
  );
};
