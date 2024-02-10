import { Button, Dropdown, Table, TableColumnsType, Tag } from "antd";

import { useGetRegisteredSemesterQuery } from "../../../redux/features/admin/courseManagement.api";
import moment from "moment";

interface DataType {
  _id: string;
  name: string;
  status: string;
  startDate: string;
  endDate: string;
}

const items = [
  {
    label: "Upcoming",
    key: "UPCOMING",
  },
  {
    label: "Ongoing",
    key: "ONGOING",
  },
  {
    label: "Ended",
    key: "ENDED",
  },
];

const RegisteredSemesters = () => {
  const { data: semesterData, isFetching } =
    useGetRegisteredSemesterQuery(undefined);

  const handleStatusDropdown = (data) => {
    console.log(data);
  };

  const menuProps = {
    items,
    onClick: handleStatusDropdown,
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
    },

    {
      title: "Status",
      dataIndex: "status",
      render: (item) => {
        let color;
        if (item === "ONGOING") {
          color = "green";
        } else if (item === "UPCOMING") {
          color = "blue";
        } else {
          color = "red";
        }
        return <Tag color={color}>{item}</Tag>;
      },
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      render: (startDate: string) => moment(startDate).format("MMM-DD-YYYY"),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      render: (endDate: string) => moment(endDate).format("MMM-DD-YYYY"),
    },
    {
      title: "Action",
      render: () => {
        return (
          <Dropdown menu={menuProps}>
            <Button>Update</Button>
          </Dropdown>
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
