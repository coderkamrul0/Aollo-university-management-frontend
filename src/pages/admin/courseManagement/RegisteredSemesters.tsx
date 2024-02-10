import { Button, Table, TableColumnsType } from "antd";

import { useGetRegisteredSemesterQuery } from "../../../redux/features/admin/courseManagement.api";
import moment from "moment";

interface DataType {
  _id: string;
  name: string;
  status: string;
  startDate: string;
  endDate: string;
}

const RegisteredSemesters = () => {
  const { data: semesterData, isFetching } =
    useGetRegisteredSemesterQuery(undefined);

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
    },

    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      render: (startDate: string) => moment(startDate).format("YYYY-MM-DD"), 
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      render: (endDate: string) => moment(endDate).format("YYYY-MM-DD"), 
    },
    {
      title: "Action",
      render: () => {
        return (
          <div>
            <Button>Update</Button>
          </div>
        );
      },
    },
  ];

  const tableData = semesterData?.data?.map(
    ({ _id, academicSemester, startDate, endDate, status }) => ({
      _id,
      name: `${academicSemester.name} - ${academicSemester.year}`,
      startDate,
      endDate,
      status,
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

export default RegisteredSemesters;
