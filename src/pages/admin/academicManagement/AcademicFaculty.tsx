import { useGetAllFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";
import { Table, TableColumnsType } from "antd";

type TFaculty = {
  _id: string;
  name: string;
};
const AcademicFaculty = () => {
  const { data: facultyData, isFetching } = useGetAllFacultiesQuery(undefined);

  const columns: TableColumnsType<TFaculty> = [
    {
      title: "Index",
      dataIndex: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
    },
  ];

  const tableData = facultyData?.data?.map(({ _id, name }, index) => ({
    _id,
    name,
    index: index + 1,
  }));

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      rowKey="_id"
    />
  );
};

export default AcademicFaculty;
