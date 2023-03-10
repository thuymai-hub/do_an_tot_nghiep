import Icon from "@ant-design/icons";
import { Col, DatePicker, Input, Row, Select } from "antd";
import { Item } from "rc-menu";
import React from "react";
import styled from "styled-components";

interface IFilter {
  search?: string;
  accountType: number | undefined;
  setSearch: React.Dispatch<React.SetStateAction<string | undefined>>;
  setAccountType: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const accountTypes = [
  { label: "Quản trị viên", value: 1 },
  { label: "Giảng viên", value: 2 },
  { label: "Sinh viên", value: 3 },
];

const Filter = (props: IFilter) => {
  const { search, setSearch, setAccountType } = props;

  return (
    <CustomRow gutter={[16, 16]}>
      <Col span={6}>
        <Input.Search
          allowClear
          style={{ width: "100%" }}
          placeholder="Nhập tên tài khoản"
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
          placeholder="Chọn loại tài khoản"
          allowClear
          onChange={(value: number | undefined) => {
            if (value === undefined) {
              setAccountType(undefined);
            } else {
              setAccountType(value);
            }
          }}
        >
          {accountTypes.map((item: any, index: number) => (
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
