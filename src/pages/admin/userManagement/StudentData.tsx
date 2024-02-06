import { Button, Space, Table, TableColumnsType, TableProps } from "antd";

import { useState } from "react";
import { TQueryParam, TStudent } from "../../../types";
import { useGetStudentsQuery } from "../../../redux/features/admin/userManagement.api";

export type DataType = Pick<
  TStudent,
  "email" | "_id" | "id" | "fullName" | "profileImg"
>;

const StudentData = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const { data: studentData, isFetching } = useGetStudentsQuery(params);
  console.log(studentData);

  const columns: TableColumnsType<DataType> = [
    {
      title: "Image",
      dataIndex: "_id",
      render: (_id: string, record: DataType) => (
        <img
          src={record.profileImg}
          alt="Profile"
          style={{ width: 50, height: 50, borderRadius: "50%" }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Roll No",
      dataIndex: "id",
    },
    {
      title: "Action",
      render: () => {
        return (
          <Space>
            <Button size="small" type="primary">
              Details
            </Button>
            <Button size="small" type="default">
              Update
            </Button>
            <Button size="small" danger>
              Block
            </Button>
          </Space>
        );
      },
      width: '10%'
    },
  ];

  const onChange: TableProps<DataType>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    // console.log({ filters, extra });
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];
      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );
      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );
      setParams(queryParams);
    }
  };

  const tableData = studentData?.data?.map(
    ({ _id, email, id, fullName, profileImg }) => ({
      _id,
      email,
      fullName,
      id,
      profileImg,
    })
  );

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      rowKey="_id"
    />
  );
};

export default StudentData;
