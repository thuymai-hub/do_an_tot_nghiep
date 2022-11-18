import { PageHeader, Spin } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const DetailEvent: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [detailData, setDetailData] = useState({
    id: id,
    title: '',
    content: '',
    createAt: undefined
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8000/wp-json/wp/v2/event/${id}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setDetailData({
            id: result.id,
            title: result.title?.rendered,
            content: result.content?.rendered,
            createAt: result.date
          });
          setLoading(false);
        },
        (error) => {
          console.log('error', error);
          setLoading(false);
        }
      );
  }, [id]);
  return (
    <div className="p-6 bg-white">
      <PageHeader ghost={false} onBack={() => navigate(-1)} title={`Chi tiết sự kiện`} />
      <Spin spinning={loading}>
        <div className="text-center text-2xl font-semibold pb-6">{detailData?.title}</div>
        <div className="text-gray-600 font-semibold flex justify-end">
          Ngày đăng: {moment(detailData?.createAt).format('HH:mm DD/MM/YYYY')}
        </div>
        <div
          className="px-8 pt-4 text-justify"
          dangerouslySetInnerHTML={{ __html: detailData?.content }}
        />
      </Spin>
    </div>
  );
};
