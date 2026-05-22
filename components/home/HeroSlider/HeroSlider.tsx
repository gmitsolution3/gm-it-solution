import { getSliders } from "@/services/getSliders";
import { Suspense } from "react";
import HeroLoader from "./HeroLoader";
import HeroSliderWrapper from "./HeroSliderWrapper";


export default async function HeroSlider() {
  const slidersPromise = getSliders();

  return (
    <Suspense fallback={<HeroLoader />}>
      <HeroSliderWrapper slidersPromise={slidersPromise} />
    </Suspense>
  );
}
