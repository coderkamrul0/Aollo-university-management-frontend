import { useParams } from "react-router-dom";
import { useGetSingleStudentQuery } from "../../../redux/features/admin/userManagement.api";

const StudentUpdate = () => {
  const { studentId } = useParams();
  const { data: studentData } = useGetSingleStudentQuery(studentId);
  const studentDefaultData = studentData?.data;
  console.log(studentDefaultData);
  return <div>studentUpdate</div>;
};

export default StudentUpdate;
