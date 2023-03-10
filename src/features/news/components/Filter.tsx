import Icon from "@ant-design/icons";
import { Col, DatePicker, Input, Row, Select } from "antd";
import { Item } from "rc-menu";
import React from "react";
import styled from "styled-components";
import { ITypePost } from "../pages/NewsPage";

interface IFilter {
  typePosts: ITypePost[];
  search?: string;
  setSearch: React.Dispatch<React.SetStateAction<string | undefined>>;
  setPostType: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const Filter = (props: IFilter) => {
  const { typePosts, search, setSearch, setPostType } = props;

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
          }}
        />
      </Col>
      <Col span={6}>
        <Select
          style={{ width: "100%" }}
          placeholder="Chọn danh mục"
          allowClear
          onChange={(value: string | undefined) => {
            if (value === undefined) {
              setPostType(undefined);
            } else {
              setPostType(Number(value.split("-")[0]));
            }
          }}
        >
          {typePosts.map((item: ITypePost, index: number) => (
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
