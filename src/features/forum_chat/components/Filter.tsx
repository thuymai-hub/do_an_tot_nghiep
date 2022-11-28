import Icon from "@ant-design/icons";
import { Col, Input, Row, Select } from "antd";
import { ITypePost } from "features/event_university/pages/EventPage";
import React from "react";
import styled from "styled-components";

interface IFilter {
  search?: string;
  status?: number;
  setSearch: React.Dispatch<React.SetStateAction<string | undefined>>;
  setPostType: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export const postStatus = [
  {
    label: "Chờ phê duyệt",
    value: 1,
  },
  {
    label: "Phê duyệt",
    value: 2,
  },
];

const Filter = (props: IFilter) => {
  const { search, status, setSearch, setPostType } = props;

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
          placeholder="Chọn trạng thái"
          allowClear
          value={status}
          onChange={(value: number | undefined) => {
            console.log(
              "🚀 ~ file: Filter.tsx ~ line 47 ~ Filter ~ value",
              value
            );
            if (value === undefined) {
              setPostType(undefined);
            } else {
              setPostType(value);
            }
          }}
        >
          {postStatus.map((item: any, index: number) => (
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
