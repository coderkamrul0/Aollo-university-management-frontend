import { Button, Modal, Table, TableColumnsType } from "antd";
import {
  useAssignFacultyMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { useState } from "react";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { useGetFacultiesQuery } from "../../../redux/features/admin/userManagement.api";

interface DataType {
  _id: string;
  title: string;
  code: string;
  credits: number;
}

const Course = () => {
  const { data: courses, isFetching } = useGetAllCoursesQuery(undefined);

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "title",
    },

    {
      title: "Code",
      dataIndex: "code",
    },
    {
      title: "Credits",
      dataIndex: "credits",
    },

    {
      title: "Action",
      render: (item) => {
        return <AddFacultyModal facultyInfo={item} />;
      },
    },
  ];

  const tableData = courses?.data?.map(
    ({ _id, title, code, credits, prefix }) => ({
      _id,
      title,
      code: `${prefix} - ${code}`,
      credits,
    })
  );

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      rowKey="_id"
    />
  );
};

const AddFacultyModal = ({ facultyInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: facultiesData } = useGetFacultiesQuery(undefined);
  const [assignFaculty] = useAssignFacultyMutation();

  const facultiesOption = facultiesData?.data?.map((item) => ({
    value: item._id,
    label: `${item.fullName} - ${item.id}`,
  }));

  const handleSubmit = (data) => {
    const facultyData = {
      courseId: facultyInfo._id,
      data,
    };

    assignFaculty(facultyData);
    console.log(facultyData);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button onClick={showModal}>Add Faculty</Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <PHForm onSubmit={handleSubmit}>
          <PHSelect
            mode="multiple"
            options={facultiesOption}
            name="faculties"
            label="Faculty"
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Modal>
    </>
  );
};

export default Course;
