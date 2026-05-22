import { ISlider } from "@/types";
import HeroSliderClient from "./HeroSliderClient";

interface IProps {
  slidersPromise: Promise<ISlider[]>;
}

export default async function HeroSliderWrapper({ slidersPromise }: IProps) {
  const sliders = await slidersPromise;

  return <HeroSliderClient sliders={sliders} />;
}
