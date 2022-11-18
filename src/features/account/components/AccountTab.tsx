import { Divider } from 'antd';
import React, { useState, useEffect } from 'react';
import { CardInfo } from 'shared/components/Card';
import { FcSimCardChip } from 'react-icons/fc';

export const AccountTab: React.FC = () => {
  const [userProfile, setUserProfile] = useState({
    name: { label: 'Name', value: '' },
    accountStatus: { label: 'Account Status', value: '' },
    phoneNumber: { label: 'Phone Number', value: '' },
    email: { label: 'Email', value: '' },
    typeId: { label: 'ID Type', value: '' },
    numberId: { label: 'ID Number', value: '' },
    language: { label: 'Language', value: '' },
    createdOn: ''
  });

  const [paymentInfor, setPaymentInfor] = useState({
    walletBalance: { label: 'Wallet Balance', value: '' },
    paymentMethod: { label: 'Payment Method', value: '' },
    walletLimit: { label: 'Wallet Limit', value: 0 },
    incomingBalance: { label: 'Incoming Balance', value: 0 }
  });

  useEffect(() => {
    getDataSource();
  }, []);

  const getDataSource = () => {
    try {
      setUserProfile({
        name: { label: 'Name', value: 'Tony' },
        accountStatus: { label: 'Account Status', value: 'Active' },
        phoneNumber: { label: 'Phone Number', value: '09123456678' },
        email: { label: 'Email', value: 'tony123@gmail.com' },
        typeId: { label: 'ID Type', value: 'Passport Number' },
        numberId: { label: 'ID Number', value: '962761961883921' },
        language: { label: 'Language', value: 'VietNamese' },
        createdOn: ''
      });
      setPaymentInfor({
        walletBalance: { label: 'Wallet Balance', value: 'Setel Wallet' },
        paymentMethod: { label: 'Payment Method', value: "'Setel Wallet'" },
        walletLimit: { label: 'Wallet Limit', value: 300000 },
        incomingBalance: { label: 'Incoming Balance', value: 100 }
      });
    } catch (error) {
      console.error('Exception ' + error);
    }
  };

  const renderRowInfor = (groupInfor: any) => {
    return (
      <div>
        {Object.keys(groupInfor).map((key: string) => {
          return (
            <div className="grid grid-cols-12 gap-y-4 gap-x-2" key={key}>
              <div className="col-span-4 pb-2 font-medium text-gray-500">
                {groupInfor[key].label}
              </div>
              <div className="col-span-8">{groupInfor[key].value}</div>
            </div>
          );
        })}
      </div>
    );
  };

  const LoyaltyCard = () => {
    return (
      <div className="col-span-5 rounded-lg bg-[#1f1e1e] p-4">
        <div className="flex justify-between">
          <div>
            <FcSimCardChip className="text-5xl" />
          </div>
          <div className="text-yellow-500 italic font-semibold text-lg">Loyalty Card</div>
        </div>
        <div className="flex justify-center text-yellow-500 font-bold text-2xl py-6 font-josefin-sans">
          7845 6293 8475
        </div>
        <div className="flex justify-between text-white">
          <div>
            <div className="font-semibold ">Point Balance</div>
            <div className="text-center text-yellow-500 text-xl italic">100 pts</div>
          </div>
          <div>
            <div className="font-semibold">Activation Hits</div>
            <div className="text-center text-yellow-500 text-xl italic">48</div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="p-2">
      <div className="grid grid-cols-12 gap-y-4 gap-x-2">
        <CardInfo title="Some name" className="col-span-12">
          <div className="grid grid-cols-12 gap-y-4 gap-x-2 p-4">
            <div className="col-span-2 font-semibold text-gray-600">USER PROFILE</div>
            <div className="col-span-10">{renderRowInfor(userProfile)}</div>
          </div>
          <Divider />
          <div className="grid grid-cols-12 gap-y-4 gap-x-2 p-4">
            <div className="col-span-2 font-semibold text-gray-600">PAYMENT</div>
            <div className="col-span-10">{renderRowInfor(paymentInfor)}</div>
          </div>
          <Divider />

          <div className="grid grid-cols-12 gap-y-4 gap-x-2 p-4">
            <div className="col-span-2 font-semibold text-gray-600"></div>
            <div className="col-span-10">
              <div className="grid grid-cols-12 gap-y-4 gap-x-2">
                <LoyaltyCard />
              </div>
            </div>
          </div>
        </CardInfo>
      </div>
    </div>
  );
};
