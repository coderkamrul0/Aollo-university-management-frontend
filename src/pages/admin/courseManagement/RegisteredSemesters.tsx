import { Button, Dropdown, Table, TableColumnsType, Tag } from "antd";

import {
  useGetRegisteredSemesterQuery,
  useUpdateRegisterSemesterMutation,
} from "../../../redux/features/admin/courseManagement.api";
import moment from "moment";
import { useState } from "react";

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
  const [semesterId, setSemesterId] = useState("");
  const { data: semesterData, isFetching } =
    useGetRegisteredSemesterQuery(undefined);
  const [updateSemesterStatus] = useUpdateRegisterSemesterMutation();

  const handleStatusUpdate = (data) => {
    console.log("semesterId", semesterId);
    console.log("newStatus", data.key);

    const updateData = {
      id: semesterId,
      data: {
        status: data.key,
      },
    };
    updateSemesterStatus(updateData);
  };

  const menuProps = {
    items,
    onClick: handleStatusUpdate,
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
      render: (item) => {
        return (
          <Dropdown menu={menuProps} trigger={["click"]}>
            <Button onClick={() => setSemesterId(item._id)}>Update</Button>
          </Dropdown>
        );
      },
    },
  ];

  const tableData = semesterData?.data?.map(
    ({ _id, academicSemester, startDate, endDate, status }) => ({
      _id,
      name: `${academicSemester?.name} - ${academicSemester?.year}`,
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
