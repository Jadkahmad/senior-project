import HomeNav from "./components/HomePage/homeNav";
import ResponsiveMenu from "./components/HomePage/ResponsiveMenu";
import NavBanner from "./components/HomePage/NavBanner";
import Hero from "./components/HomePage/Hero";
import NumCounter from "./components/HomePage/NumCounter";
import WhyChooseUs from "./components/HomePage/WhyChooseUs";
import Subjects from "./components/HomePage/Subjects";
import Footer from "./components/HomePage/Footer";
import Testimonials from "./components/HomePage/Testimonials";







const HomePage = () => {
  return (
    <div className="overflow-x-hidden">

      <HomeNav/>
      <ResponsiveMenu open={false}/>
      <NavBanner/>
      <Hero/>
      <NumCounter/>
      <WhyChooseUs/>
      <Subjects/>
      <Testimonials/>
      <Footer/>
      




      
      
    </div>
  );
};

export default HomePage;
