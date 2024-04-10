//Library components

//App components
import HeadMeta from "@/components/ui/HeadMeta";
import { LayoutProvider } from "../context/LayoutContext";
import Footer from "./Footer";
import Navbar from "./Navbar";

const MainExternalLayout = ({ children, meta: pageMeta }) => {
  const meta = {
    title: "Atom.live",
    description:
      "multilingual, interactive books. Read the same book in multiple languages",
    cardImage: "/og.jpg",
    ...pageMeta
  };

  return (
    <>
      <LayoutProvider>
        <HeadMeta meta={meta} />
        <Navbar />
        <div id="main-section">{children}</div>
        <Footer />
      </LayoutProvider>
    </>
  );
};

export default MainExternalLayout;
