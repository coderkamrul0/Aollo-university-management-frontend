import { Table, TableColumnsType, TableProps } from "antd";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { useState } from "react";

interface DataType {
  _id: string;
  name: string;
  year: string;
  startMonth: string;
  endMonth: string;
}

const AcademicSemester = () => {
  const [params, setParams] = useState([]);
  const { data: semesterData } = useGetAllSemestersQuery(params);
  console.log(semesterData);

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      filters: [
        {
          text: "Autumn",
          value: "Autumn",
        },
        {
          text: "Fall",
          value: "Fall",
        },
        {
          text: "Summar",
          value: "Summar",
        },
      ],
    },

    {
      title: "Year",
      dataIndex: "year",
      filters: [
        {
          text: "2024",
          value: "2024",
        },
        {
          text: "2025",
          value: "2025",
        },
        {
          text: "2026",
          value: "2026",
        },
        {
          text: "2027",
          value: "2027",
        },
        {
          text: "2028",
          value: "2028",
        },
      ],
    },
    {
      title: "Start Month",
      dataIndex: "startMonth",
    },
    {
      title: "End Month",
      dataIndex: "endMonth",
    },
  ];

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    // console.log({ filters, extra });
    if (extra.action === "filter") {
      const queryParams = [];
      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );
      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );
      setParams(queryParams);
    }
  };

  const tableData = semesterData?.data?.map(
    ({ _id, name, year, startMonth, endMonth }) => ({
      _id,
      name,
      year,
      startMonth,
      endMonth,
    })
  );

  return (
    <Table
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      rowKey="_id"
    />
  );
};

export default AcademicSemester;
