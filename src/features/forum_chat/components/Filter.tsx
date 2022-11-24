import Icon from "@ant-design/icons";
import { Col, Input, Row, Select } from "antd";
import styled from "styled-components";

interface IFilter {
  search?: string;
  categories?: any[];
  status?: number | undefined;
  toDate?: string | undefined;
  fromDate?: string | undefined;
  categoryId?: number | undefined;
}

export const statusPosts = [
  { label: "Chưa phê duyệt", value: 0 },
  { label: "Đã phê duyệt", value: 1 },
];

const Filter = (props: IFilter) => {
  return (
    <CustomRow gutter={[16, 16]}>
      <Col span={6}>
        <Input.Search
          allowClear
          style={{ width: "100%" }}
          placeholder="Tiều đề bài viết"
          addonAfter={<Icon type="close-circle-o" />}
          // value={search}
          onChange={(e: any) => {
            // setSearch(e.target.value);
          }}
        />
      </Col>
      <Col span={6}>
        <Select
          style={{ width: "100%" }}
          placeholder="Chọn trạng thái"
          allowClear
          onChange={(value: number | undefined) => {
            if (value === undefined) {
              // setCategoryId(undefined);
            } else {
              // setCategoryId(value);
            }
          }}
        >
          {statusPosts.map((item: any, index: number) => (
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
