import Icon from "@ant-design/icons";
import { Col, DatePicker, Input, Row, Select } from "antd";
import { Item } from "rc-menu";
import React from "react";
import styled from "styled-components";

interface IFilter {
  search?: string;
  setSearch: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const Filter = (props: IFilter) => {
  const { search, setSearch } = props;

  return (
    <CustomRow gutter={[16, 16]}>
      <Col span={6}>
        <Input.Search
          allowClear
          style={{ width: "100%" }}
          placeholder="Tiều đề bài viết"
          addonAfter={<Icon type="close-circle-o" />}
          value={search}
          onChange={(e: any) => {
            setSearch(e?.target?.value);
            console.log(
              "🚀 ~ file: Filter.tsx ~ line 26 ~ Filter ~ e?.target?.value",
              e?.target?.value
            );
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
