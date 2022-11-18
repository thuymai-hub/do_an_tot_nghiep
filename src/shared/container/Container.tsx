import { Avatar, Popover } from 'antd';
import R from 'assets';
import React from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import {
  IoAlertCircleOutline,
  IoLogOutOutline,
  IoNotificationsOutline,
  IoSettingsOutline
} from 'react-icons/io5';
import { useLocation } from 'react-router-dom';
import { Sidebar } from 'shared/container/Sidebar';
import { handleLogout } from 'shared/utils/functionHelper';
import { Head } from './Head';
import './Menu.css';

const NAME_FEATURE_INDEX = 1;

export const Container = ({ children }: { children?: React.ReactNode }) => {
  const location = useLocation();
  const Locations = location.pathname.split('/');

  const titleWeb =
    Locations[NAME_FEATURE_INDEX].charAt(0).toUpperCase() +
      Locations[NAME_FEATURE_INDEX].slice(1) || 'Home';

  const content = (
    <div>
      <div className="cursor-pointer py-1 px-2 flex items-center hover:bg-gray-200">
        <IoAlertCircleOutline className="mr-2 text-xl" />
        Hồ sơ
      </div>
      <div
        className="cursor-pointer py-1 px-2 flex items-center hover:bg-gray-200"
        onClick={handleLogout}>
        <IoLogOutOutline className="mr-2 text-xl" />
        Đăng xuất
      </div>
    </div>
  );

  return (
    <div className=" w-screen h-screen flex">
      <Head title={titleWeb + ' | ĐH Thủy Lợi'} />

      <div className="bg-second-color h-full text-white nav-menu active ">
        <Sidebar />
      </div>
      <div className="w-full flex flex-col grow">
        <div className="bg-white w-full min-h-12 p-4 border-b flex justify-between">
          <div className="flex items-center">
            <AiOutlineMenu
              className="mr-2 cursor-pointer"
              onClick={() => {
                document.getElementsByClassName('nav-menu')[0].classList.toggle('active');
              }}
            />
          </div>
          <div className="flex">
            <div className="flex items-center">
              <Popover placement="bottom" title={null} content={content} trigger="click">
                <IoSettingsOutline className="text-xl cursor-pointer mr-4" />
              </Popover>

              <IoNotificationsOutline className="text-xl cursor-pointer" />
            </div>
            <div className="border border-border-color--1 bg-border-color--1 mx-2"></div>
            <div>
              <Avatar style={{ width: 36, height: 36 }} src={R.images.avatar_default} />
              <span className="ml-2 font-semibold">Mai Ánh Thùy</span>
            </div>
          </div>
        </div>
        <div className=" w-full grow overflow-y-auto flex justify-center ">
          <div className=" w-full max-w-7xl h-full">{children}</div>
        </div>
      </div>
    </div>
  );
};
