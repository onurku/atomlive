import Hero from "@/components/ui/IndexFeatures/MeetOurTeacher/Hero";
import MeetOurTeacher from "@/components/ui/IndexFeatures/MeetOurTeacher/MeetOurTeacher";
import MainExternalLayout from "@/components/ui/IndexFeatures/layout/MainExternalLayout";

const TeacherNew = () => {
  return (
    <>
      <Hero />
      <MeetOurTeacher />
    </>
  );
};
TeacherNew.layout = MainExternalLayout;
export default TeacherNew;
