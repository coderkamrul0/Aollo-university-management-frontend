import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";

import { useState } from "react";
import { TQueryParam, TStudent } from "../../../types";
import { useGetStudentsQuery } from "../../../redux/features/admin/userManagement.api";
import { Link } from "react-router-dom";

export type DataType = Pick<
  TStudent,
  "email" | "_id" | "id" | "fullName" | "profileImg"
>;

const StudentData = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const { data: studentData, isFetching } = useGetStudentsQuery([
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);
  const metaData = studentData?.meta;
  console.log(metaData);

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
      render: (item) => {
        console.log(item);
        return (
          <Space>
            <Link to={`/admin/students-data/${item._id}`}>
              <Button size="small" type="primary">
                Details
              </Button>
            </Link>
            <Link to={`/admin/student-data/${item._id}`}>
              <Button size="small" type="default">
                Update
              </Button>
            </Link>
            <Button size="small" danger>
              Block
            </Button>
          </Space>
        );
      },
      width: "10%",
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
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        rowKey="_id"
        pagination={false}
      />
      <Pagination
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </>
  );
};

export default StudentData;
