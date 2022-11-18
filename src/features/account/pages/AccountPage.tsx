import { Button, Input, Table } from 'antd';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useTableData } from 'shared/hooks/useTableData';

const { Search } = Input;
interface TFilter {
  page?: number;
  search?: string;
}

const dataFake = [
  {
    key: '1',
    stt: 1,
    name: 'Mai Ánh Thùy',
    type: 'Sinh viên'
  },
  {
    key: '2',
    stt: 2,
    name: 'Nguyễn Văn A',
    type: 'Admin'
  },
  {
    key: '2',
    stt: 2,
    name: 'Nguyễn Văn B',
    type: 'Giảng viên'
  }
];

const columns = [
  {
    title: 'STT',
    dataIndex: 'stt',
    key: 'stt'
  },
  {
    title: 'Tên tài khoản',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Loại tài khoản',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createAt',
    key: 'createAt',
    render: () => <div>{moment().format('DD/MM/YYYY')}</div>
  }
];
export const AccountPage: React.FC = () => {
  const navigate = useNavigate();
  const [expandFilter, setExpandFilter] = useState<TFilter>({ search: '', page: 1 });
  const searchRef: any = useRef();
  const { dataSource, loading, paging, setPaging } = useTableData({
    expandFilter,
    fetchList: null
  });

  const goToAddNews = () => {
    console.log('go');
  };
  const onSearch = (value: string) => {
    console.log('value', value);
  };

  return (
    <div className="p-2">
      <div className="flex justify-between">
        <div className="text-lg font-semibold">Tài khoản</div>
        <div className="flex">
          <Button type="primary" size="large" onClick={goToAddNews}>
            <div className="flex items-center">
              <AiOutlinePlusCircle className="mr-2" /> Thêm mới
            </div>
          </Button>
        </div>
      </div>

      <div className="bg-white p-4 rounded mb-4 mt-4">
        <div className="grid grid-cols-12 gap-x-2 gap-y-4 ">
          <div className="col-span-6">
            <Search placeholder="Nhập tên tài khoản" ref={searchRef} onSearch={onSearch} />
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded mb-4 mt-4">
        <Table dataSource={dataFake} columns={columns} />
      </div>
    </div>
  );
};
