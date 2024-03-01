import dynamic from "next/dynamic";

const CardSliderCinemaMovie = dynamic(
  () =>
    import(
      "@/components/homePage/cardSlider/cardSliderFeature/CardSliderCinemaMovie"
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

export const CardSlider = () => {
  return (
    <>
      <CardSliderTop10Data />
      <CardSliderUpcomingMovie />
      <CardSliderStandalone />
      <CardSliderCinemaMovie />
      <CardSliderTVSeriesMovie />
    </>
  );
};
