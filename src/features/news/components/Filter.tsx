import Icon from '@ant-design/icons';
import { Col, DatePicker, Input, Row, Select } from 'antd';
import { Item } from 'rc-menu';
import React from 'react';
import styled from 'styled-components';
import { ITypePost } from '../pages/NewsPage';

interface IFilter {
    typePosts: ITypePost[];
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
    const { typePosts } = props;

    return (
        <CustomRow gutter={[16, 16]}>
            <Col span={6}>
                <Input.Search
                    allowClear
                    style={{ width: '100%' }}
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
                    style={{ width: '100%' }}
                    placeholder="Chọn danh mục"
                    allowClear
                    onChange={(value: number | undefined) => {
                        if (value === undefined) {
                            // setCategoryId(undefined);
                        } else {
                            // setCategoryId(value);
                        }
                    }}>
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
