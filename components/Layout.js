import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import HeadMeta from "@/components/ui/HeadMeta";

export default function Layout({ children, meta: pageMeta }) {
  const meta = {
    title: "Atom.live",
    description: "Reading Magic",
    cardImage: "/og.jpg",
    ...pageMeta
  };

  return (
    <>
      <HeadMeta meta={meta} />
      <Navbar />
      <div id="skip">{children}</div>
      <Footer />
    </>
  );
}
