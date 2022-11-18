import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CardInfo } from 'shared/components/Card';
import { Table } from 'shared/components/Table/Table';

const columns = [
  {
    title: 'TRANSACTION ID',
    keyData: 'transactionId'
  },
  {
    title: 'STATUS',
    keyData: 'status'
  },
  {
    title: 'TYPE',
    keyData: 'type'
  },
  {
    title: 'CREATED ON',
    keyData: 'createdAt'
  },
  {
    title: 'PAYMENT METHOD',
    keyData: 'paymentMethod'
  }
];

export const DashBoardTab: React.FC = () => {
  const params = useParams();
  const [accountInfo, setAccountInfo] = useState<any>({
    userId: { label: 'USER ID', value: '' },
    fullName: { label: 'USERNAME', value: '' },
    email: { label: 'EMAIL', value: '' },
    phone: { label: 'PHONE NUMBER', value: '' },
    gender: { label: 'GENDER', value: '' },
    createdAt: { label: 'CREATED AT', value: moment().format('DD/MM/YYYY HH:mm') }
  });

  useEffect(() => {
    if (params.id) getDataSource();
  }, [params]);

  const getDataSource = async () => {
    try {
      // const res = await requestGetDetailAccount(params.id || '');

      // const result = { ...accountInfo };
      // Object.keys(accountInfo).map((key: string) => {
      //   result[key].value = res.data[key];
      // });
      // setAccountInfo(result);
    } catch (error) {
      console.error('Exception ' + error);
    }
  };

  const renderAccountInfo = (
    <div>
      {Object.keys(accountInfo).map((info) => (
        <div key={info} className="mb-3">
          <div className="text-gray-600 font-semibold">{accountInfo[info].label}</div>
          <div>{(accountInfo[info] && accountInfo[info].value) || <br></br>}</div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="mt-5 px-2">
      <div className="grid grid-cols-12 gap-y-4 gap-x-2">
        <CardInfo title="Account info" className="col-span-12">
          <div className="p-2">{renderAccountInfo}</div>
        </CardInfo>
      </div>
      <CardInfo title="Latest order" className="mt-5">
        <div className="p-2">
          <Table columns={columns} dataSource={[]} />
        </div>
      </CardInfo>
      <CardInfo title="Latest payment transaction" className="mt-5">
        <div className="p-2">
          <Table columns={columns} dataSource={[]} />
        </div>
      </CardInfo>
    </div>
  );
};
