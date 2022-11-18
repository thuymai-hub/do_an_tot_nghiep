import Icon from "@ant-design/icons";
import { Col, DatePicker, Input, Row, Select } from "antd";
import { Item } from "rc-menu";
import React from "react";
import styled from "styled-components";

interface IFilter {
  search?: string;
  categories?: any[];
  status?: number | undefined;
  toDate?: string | undefined;
  fromDate?: string | undefined;
  categoryId?: number | undefined;
  setCategoryId?: React.Dispatch<React.SetStateAction<number | undefined>>;
  setSearch?: React.Dispatch<React.SetStateAction<string>>;
  setStatus?: React.Dispatch<React.SetStateAction<number | undefined>>;
  setToDate?: React.Dispatch<React.SetStateAction<string | undefined>>;
  setFromDate?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const Filter = (props: IFilter) => {
  const {} = props;

  return (
    <CustomRow gutter={[16, 16]}>
      <Col span={6}>
        <Input.Search
          allowClear
          style={{ width: "100%" }}
          placeholder="Nhập tên tài khoản"
          addonAfter={<Icon type="close-circle-o" />}
          // value={search}
          onChange={(e: any) => {
            // setSearch(e.target.value);
          }}
        />
      </Col>
    </CustomRow>
  );
};

const CustomRow = styled(Row)`
  padding-bottom: 12px;
`;

export default Filter;
