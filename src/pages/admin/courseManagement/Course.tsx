import { Button, Table, TableColumnsType } from "antd";
import { useGetAllCoursesQuery } from "../../../redux/features/admin/courseManagement.api";

interface DataType {
  _id: string;
  title: string;
  code: string;
  credits: number;
}

const Course = () => {
  const { data: courses, isFetching } = useGetAllCoursesQuery(undefined);
  console.log(courses);

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
      render: () => {
        return <Button>Assign Faculty</Button>;
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

export default Course;
