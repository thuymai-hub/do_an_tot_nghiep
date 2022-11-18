import React from 'react';
import { Tabs } from 'shared/components/Tabs';
import { AccountTab } from '../components/AccountTab';
import { DashBoardTab } from '../components/DashBoardTab';

export const DetailAccountPage: React.FC = () => {
  const tabs = [
    { tabIndex: '1', label: 'Dashboard', content: <DashBoardTab /> },
    { tabIndex: '2', label: 'Account', content: <AccountTab /> }
  ];

  return (
    <div>
      <Tabs tabs={tabs} />
    </div>
  );
};
