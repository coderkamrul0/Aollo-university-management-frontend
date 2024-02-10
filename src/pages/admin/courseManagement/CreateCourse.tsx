/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import { toast } from "sonner";
import PHInput from "../../../components/form/PHInput";
import {
  useAddCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { TResponse } from "../../../types";
import PHSelect from "../../../components/form/PHSelect";

const CreateCourse = () => {
  const { data: courses } = useGetAllCoursesQuery(undefined);
  const [createCourse] = useAddCourseMutation();

  const preRequisiteCourseOptions = courses?.data?.map((item: any) => ({
    value: item._id,
    label: item.prefix,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const courseData = {
      ...data,
      code: Number(data.code),
      credits: Number(data.credits),
      isDeleted: false,
      preRequisiteCourses: data.preRequisiteCourses
        ? data.preRequisiteCourses?.map((item: any) => ({
            course: item,
            isDeleted: false,
          }))
        : [],
    };

    console.log(courseData);

    try {
      const res = (await createCourse(courseData)) as TResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Course Created.", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong.", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHInput name="title" label="Title" type="text" />
          <PHInput name="prefix" label="Prefix" type="text" />
          <PHInput name="code" label="Code" type="number" />
          <PHInput name="credits" label="Credits" type="number" />
          <PHSelect
            mode="multiple"
            name="preRequisiteCourses"
            label="preRequisiteCourses"
            options={preRequisiteCourseOptions}
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateCourse;
