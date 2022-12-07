import Icon from "@ant-design/icons";
import { Col, DatePicker, Input, Row, Select } from "antd";
import { Item } from "rc-menu";
import React from "react";
import styled from "styled-components";

interface IFilter {
  search?: string;
  setCourseType: React.Dispatch<React.SetStateAction<number | undefined>>;
  setSearch: React.Dispatch<React.SetStateAction<string | undefined>>;
  listCourse: any;
}

export const typePosts = [
  { label: "Công nghệ thông tin", value: 1 },
  { label: "Thiết kế đồ hoạ", value: 2 },
  { label: "Quản trị kinh doanh", value: 3 },
];

const Filter = (props: IFilter) => {
  const { search, setSearch, setCourseType, listCourse } = props;

  return (
    <CustomRow gutter={[16, 16]}>
      <Col span={6}>
        <Input.Search
          allowClear
          style={{ width: "100%" }}
          placeholder="Tiều đề khoá học"
          addonAfter={<Icon type="close-circle-o" />}
          value={search}
          onChange={(e: any) => {
            setSearch(e.target.value);
          }}
        />
      </Col>
      <Col span={6}>
        <Select
          style={{ width: "100%" }}
          placeholder="Chọn khoá học"
          allowClear
          onChange={(value: string | undefined) => {
            if (value === undefined) {
              setCourseType(undefined);
            } else {
              setCourseType(Number(value.split("-")[0]));
            }
          }}
        >
          {listCourse.map((item: any, index: number) => (
            <Select.Option key={index} value={item.value}>
              {item.label}
            </Select.Option>
          ))}
        </Select>
      </Col>
    </CustomRow>
  );
};

const CustomRow = styled(Row)`
  padding-bottom: 12px;
`;

export default Filter;
