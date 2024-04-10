import { LayoutContext } from "@/components/ui/IndexFeatures/context/LayoutContext";
import MainExternalLayout from "@/components/ui/IndexFeatures/layout/MainExternalLayout";
import BookAStoryTime from "@/components/ui/IndexFeatures/sections/BookAStoryTime";
import Hero from "@/components/ui/IndexFeatures/sections/Hero";
import JoinOurComunity from "@/components/ui/IndexFeatures/sections/JoinOurCommunity";
import Language from "@/components/ui/IndexFeatures/sections/Language";
import LiveInsideTheBook from "@/components/ui/IndexFeatures/sections/LiveInsideTheBook";
import Testimonial from "@/components/ui/IndexFeatures/sections/Testimonial";
import { useContext, useEffect } from "react";

const IndexNew = () => {
  const { changeNavTheme } = useContext(LayoutContext);
  useEffect(() => {
    changeNavTheme("onDarkBackground");
    return () => {
      changeNavTheme("onLightBackground");
    };
  }, [changeNavTheme]);

  return (
    <>
      <Hero />
      <BookAStoryTime />
      <LiveInsideTheBook />
      <Language />
      <Testimonial />
      <JoinOurComunity />
    </>
  );
};
IndexNew.layout = MainExternalLayout;
export default IndexNew;
