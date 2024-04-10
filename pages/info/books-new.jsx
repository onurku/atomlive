import BooksSection from "@/components/ui/IndexFeatures/Books/BooksSection";
import Hero from "@/components/ui/IndexFeatures/Books/Hero";
import MainExternalLayout from "@/components/ui/IndexFeatures/layout/MainExternalLayout";

const BooksNew = () => {
  return (
    <>
      <Hero />
      <BooksSection />
    </>
  );
};
BooksNew.layout = MainExternalLayout;
export default BooksNew;
