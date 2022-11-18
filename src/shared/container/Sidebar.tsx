import R from 'assets';
import React from 'react';
import { Menu } from './Menu';
import './Menu.css';

export const Sidebar: React.FC = () => {
  return (
    <div className="h-full w-full text-white overflow-y-auto flex flex-col justify-between">
      <div className="border-b border-color-border-2">
        <div className="p-4">
          <div className="flex justify-center">
            <img src={R.images.logo_TL} alt="logo" width={100} height={100} />
          </div>
        </div>

        <div className="text-center py-4 font-bold text-sky-500 italic">
          Trường Đại Học Thủy Lợi
        </div>
      </div>

      <Menu />
    </div>
  );
};
