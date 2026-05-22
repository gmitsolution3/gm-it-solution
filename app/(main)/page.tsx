import dynamic from "next/dynamic";

import CTA from "@/components/home/CTA";
import FeaturedProjects from "@/components/home/FeaturedProjects/FeaturedProjects";
import HeroSlider from "@/components/home/HeroSlider/HeroSlider";
import OurServices from "@/components/home/OurServices/OurServices";
import WhyChooseUs from "@/components/home/WhyChooseUs";
const Testimonials = dynamic(
  () => import("@/components/home/Testimonials/Testimonials"),
);

export default function Home() {
  return (
    <>
      <HeroSlider />
      <WhyChooseUs />
      <OurServices />
      <FeaturedProjects />
      <Testimonials />
      <CTA />
    </>
  );
}
