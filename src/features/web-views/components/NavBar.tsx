import { Button, Dropdown, MenuProps } from "antd";
import LocalStorage from "apis/LocalStorage";
import React from "react";
import { useSelector } from "react-redux";
import { handleLogout } from "../../../shared/utils/functionHelper";

const NavBar = () => {
  const userInfor = useSelector((state: any) => state?.user?.user);
  const userType = LocalStorage.getUserType();

  const token = LocalStorage.getToken();
  const items: MenuProps["items"] =
    userType === "3"
      ? [
          {
            key: "1",
            label: (
              <a rel="noopener noreferrer" href="/student">
                Bài viết của tôi
              </a>
            ),
          },

          {
            key: "3",
            label: (
              <Button
                style={{ border: 0, background: "#f5f5f5" }}
                onClick={handleLogout}
              >
                Đăng xuất
              </Button>
            ),
          },
        ]
      : [
          {
            key: "1",
            label: (
              <a rel="noopener noreferrer" href="/student">
                Bài viết của tôi
              </a>
            ),
          },
          {
            key: "2",
            label: (
              <a rel="noopener noreferrer" href="/teacher_course">
                Khoá học
              </a>
            ),
          },

          {
            key: "3",
            label: (
              <Button
                style={{ border: 0, background: "#f5f5f5" }}
                onClick={handleLogout}
              >
                Đăng xuất
              </Button>
            ),
          },
        ];

  return (
    <div className="w3-top">
      <div
        className="w3-bar w3-white w3-wide w3-padding w3-card"
        style={{ width: "100%" }}
      >
        <a href="/web-view" className="w3-bar-item w3-button">
          <b>Thuỷ Lợi</b> University
        </a>
        <div className="w3-right w3-hide-small">
          <a href="/web-view-post" className="w3-bar-item w3-button">
            Bài viết
          </a>
          <a href="/web-view-forum" className="w3-bar-item w3-button">
            Diễn đàn
          </a>
          <a href="/web-doc-page" className="w3-bar-item w3-button">
            Tài liệu
          </a>
          {/* <a href="/login" className="w3-bar-item w3-button">
            Cá nhân
          </a> */}
          {!token ? (
            <a href="/login" className="w3-bar-item w3-button">
              Cá nhân
            </a>
          ) : (
            <>
              <a href="/noti" className="w3-bar-item w3-button">
                Thông báo
              </a>
              <Dropdown menu={{ items }} placement="bottomRight">
                <a className="w3-bar-item w3-button">
                  {LocalStorage.getUserName()}
                </a>
              </Dropdown>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
