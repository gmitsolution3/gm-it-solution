import CTA from "@/components/home/CTA";
import HeroSlider from "@/components/home/HeroSlider/HeroSlider";
import OurServices from "@/components/home/OurServices/OurServices";
import FeaturedProjects from "@/components/home/FeaturedProjects/FeaturedProjects";
import Testimonials from "@/components/home/Testimonials";
import WhyChooseUs from "@/components/home/WhyChooseUs";

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
