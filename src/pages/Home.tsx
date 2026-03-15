import { Layout } from "@/components/layout/Layout";
import { HeroSlider } from "@/components/home/HeroSlider";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Testimonials } from "@/components/home/Testimonials";
import { TechStack } from "@/components/home/TechStack";
import { CTASection } from "@/components/home/CTASection";

const Home = () => {
  return (
    <>
      <HeroSlider />
      <WhyChooseUs />
      <ServicesPreview />
      <FeaturedProjects />
      <Testimonials />
      <CTASection />
    </>
  );
};

export default Home;
