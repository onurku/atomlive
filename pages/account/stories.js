import ProfileLayout from "@/components/layouts/ProfileLayout";
import DashboardTitle from "@/components/ui/DashboardTitle";

const Stories = () => {
  return (
    <>
      <DashboardTitle text="Stories" />
      <span>stories</span>
    </>
  );
};

Stories.layout = ProfileLayout;

export default Stories;
