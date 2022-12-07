import React, { useState } from "react";
import {
  BsCalendarCheck,
  BsChatText,
  BsFilePost,
  BsFolder2Open,
  BsHouseDoor,
  BsPeople,
  BsColumnsGap,
} from "react-icons/bs";
import { PROTECTED_ROUTES_PATH } from "routes/RoutesPath";
import { TGroupMenu } from "shared/types/interface";
import { GroupMenu } from "./GroupMenu";
import "./Menu.css";

const MENU: Array<TGroupMenu> = [
  {
    keyGroup: "1",
    groupMenu: [
      {
        title: "Tổng quan",
        to: PROTECTED_ROUTES_PATH.HOME,
        icon: <BsHouseDoor />,
      },
    ],
  },
  {
    keyGroup: "2",
    groupMenu: [
      {
        title: "Bài viết",
        to: PROTECTED_ROUTES_PATH.NEWS,
        icon: <BsFilePost />,
      },
    ],
  },
  {
    keyGroup: "3",
    groupMenu: [
      {
        title: "Sự kiện",
        to: PROTECTED_ROUTES_PATH.EVENTS,
        icon: <BsCalendarCheck />,
      },
    ],
  },
  {
    keyGroup: "4",
    groupMenu: [
      {
        title: "Diễn đàn",
        to: PROTECTED_ROUTES_PATH.FORUM,
        icon: <BsChatText />,
      },
    ],
  },
  {
    keyGroup: "5",
    groupMenu: [
      {
        title: "Tài liệu học tập",
        to: PROTECTED_ROUTES_PATH.STUDY_DOCUMENT,
        icon: <BsFolder2Open />,
      },
    ],
  },
  {
    keyGroup: "6",
    groupMenu: [
      {
        title: "Tài khoản",
        to: PROTECTED_ROUTES_PATH.ACCOUNT,
        icon: <BsPeople />,
      },
    ],
  },
  {
    keyGroup: "7",
    groupMenu: [
      {
        title: "Cấu hình",
        to: PROTECTED_ROUTES_PATH.CONFIG,
        icon: <BsColumnsGap />,
      },
    ],
  },
  // {
  //   keyGroup: '6',
  //   groupMenu: [{ title: 'Cấu hình', to: PROTECTED_ROUTES_PATH.CONFIG, icon: <BsGear /> }]
  // }
];

export const Menu: React.FC = () => {
  const [activeGroup, setActiveGroup] = useState<string>("");

  const classActive = (key: string) => {
    return activeGroup === key ? "bg-second-bold-color" : "";
  };

  return (
    <div className="scrollbar-menu overflow-y-auto overflow-x-hidden flex-1 ">
      {MENU.map((groupMenu: TGroupMenu) => (
        <div
          key={groupMenu.keyGroup}
          className={`border-t border-color-border-2 ${classActive(
            groupMenu.keyGroup
          )} `}
          onClick={() => {
            setActiveGroup(groupMenu.keyGroup);
          }}
        >
          <div>
            {groupMenu.titleGroup && (
              <div className="font-bold text-base text-gray-400 px-4 pt-4">
                {groupMenu.titleGroup}
              </div>
            )}
          </div>

          <GroupMenu groupMenu={groupMenu.groupMenu} />
        </div>
      ))}
    </div>
  );
};
