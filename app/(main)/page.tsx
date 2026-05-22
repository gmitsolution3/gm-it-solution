import CTA from "@/components/home/CTA";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import HeroSlider from "@/components/home/HeroSlider/HeroSlider";
import Services from "@/components/home/Services";
import Testimonials from "@/components/home/Testimonials";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <WhyChooseUs />
      <Services />
      <FeaturedProjects />
      <Testimonials />
      <CTA />
    </>
  );
}
