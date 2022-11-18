import { Col, Popconfirm, Row, Tooltip } from 'antd';
import R from 'assets';
import moment from 'moment';
import React from 'react';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineExclamationCircle } from 'react-icons/ai';

type Props = {
  titlePage: string;
  data: any;
  handleClickEdit: () => void;
  handleClickDetail: () => void;
  handleClickDelete: () => void;
};
export const NewsItemComp: React.FC<Props> = ({
  titlePage = '',
  data,
  handleClickEdit,
  handleClickDetail,
  handleClickDelete
}) => {
  return (
    <Row className="bg-white rounded p-4 shadow-xl mt-4">
      <Col span={4}>
        <img src={R.images.logo_TL} className="object-cover" />
      </Col>
      <Col span={17} className="px-4">
        <div className="font-semibold text-lg">{data?.title}</div>
        <div className="text-zinc-500">{moment(data?.createAt).format('DD/MM/YYYY HH:mm')}</div>
      </Col>
      <Col span={3} className="flex items-center">
        <div className="flex justify-around text-2xl">
          <Tooltip title="Xem chi tiết">
            <AiOutlineExclamationCircle
              className="text-blue-500 cursor-pointer"
              onClick={handleClickDetail}
            />
          </Tooltip>
          <Tooltip title={`Sửa ${titlePage}`}>
            <AiOutlineEdit className="text-green-500 cursor-pointer" onClick={handleClickEdit} />
          </Tooltip>
          <Tooltip title={`Xoá ${titlePage}`}>
            <Popconfirm
              placement="bottom"
              title={`Bạn chắc chắn muốn xoá ${titlePage} ?`}
              onConfirm={handleClickDelete}
              okText="Xoá"
              cancelText="Bỏ qua"
              okButtonProps={{ type: 'primary', danger: true }}>
              <AiOutlineDelete className="text-red-500 cursor-pointer" />
            </Popconfirm>
          </Tooltip>
        </div>
      </Col>
    </Row>
  );
};
