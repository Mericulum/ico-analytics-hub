
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import RoadmapSection from "./RoadmapSection";
import CTASection from "./CTASection";
import OverviewStats from "../overview/OverviewStats";
import CryptoExplanationSection from "./CryptoExplanationSection";

const IntroductionSection = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <HeroSection />
      <div className="mt-20">
        <OverviewStats />
      </div>
      <CryptoExplanationSection />
      <RoadmapSection />
      <FeaturesSection />
      <CTASection />
    </div>
  );
};

export default IntroductionSection;
