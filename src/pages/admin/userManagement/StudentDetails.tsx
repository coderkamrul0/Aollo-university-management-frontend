import { useParams } from "react-router-dom";
import { useGetSingleStudentQuery } from "../../../redux/features/admin/userManagement.api";

const StudentDetails = () => {
  const { studentId } = useParams();
  const { data: studentData, isLoading } = useGetSingleStudentQuery(studentId);
  console.log(studentData);

  if (isLoading) {
    return <p>loading........</p>;
  }
  return (
    <div>
      <h1>{studentData?.data?.fullName}</h1>
    </div>
  );
};

export default StudentDetails;
