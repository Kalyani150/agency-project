import HeroSlider from "../components/home/HeroSlider";
import Stats from "../components/home/Stats";

import AboutPreview from "../components/home/AboutPreview";
import ServicesPreview from "../components/home/ServicesPreview";
import WhyChooseUs from "../components/home/WhyChooseUs";
import ProjectsPreview from "../components/home/ProjectsPreview";
import Technologies from "../components/home/Technologies";
import Process from "../components/home/Process";
import Testimonials from "../components/home/Testimonials";
import FAQPreview from "../components/home/FAQPreview";
import BlogPreview from "../components/home/BlogPreview";
import CTA from "../components/home/CTA";
function Home({
  services = [],
  projects = [],
  blogs = [],
  testimonials = [],
}) {
  return (
    <>
      <HeroSlider />

      <Stats />

      <AboutPreview />

      <ServicesPreview
        services={services}
      />

      <WhyChooseUs />

      <ProjectsPreview
        projects={projects}
      />

      <Technologies />

      <Process />

      <Testimonials
        testimonials={testimonials}
      />

      <FAQPreview />

      <BlogPreview
        blogs={blogs}
      />

      <CTA />
    </>
  );
}

export default Home;