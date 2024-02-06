import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Button } from "antd";

const studentDummyData = {
  password: "student123",
  student: {
    name: {
      firstName: "Mr. Student2",
      middleName: "",
      lastName: "Good",
    },
    gender: "male",
    dateOfBirth: "1990-01-01",
    email: "abcd@gmail.com",
    contactNo: "123567",
    emergencyContactNo: "987-654-3210",
    bloogGroup: "A+",
    presentAddress: "123 Main St, Cityville",
    permanentAddress: "456 Oak St, Townsville",
    guardian: {
      fatherName: "James Doe",
      fatherOccupation: "Engineer",
      fatherContactNo: "111-222-3333",
      motherName: "Mary Doe",
      motherOccupation: "Teacher",
      motherContactNo: "444-555-6666",
    },
    localGuardian: {
      name: "Alice Johnson",
      occupation: "Doctor",
      contactNo: "777-888-9999",
      address: "789 Pine St, Villageton",
    },
    admissionSemester: "65663d516435f247a24e9169",
    academicDepartment: "656701b4adaebc55db21bdea",
    profileImg: "path/to/profile/image.jpg",
  },
};

const CreateStudent = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <PHForm onSubmit={onSubmit}>
      <PHInput type="text" name="name" label="name" />
      <Button htmlType="submit">Submit</Button>
    </PHForm>
  );
};

export default CreateStudent;
