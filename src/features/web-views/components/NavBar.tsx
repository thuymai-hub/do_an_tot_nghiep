import { Button, Col, Dropdown, MenuProps, Row } from "antd";
import LocalStorage from "apis/LocalStorage";
import R from "assets";
import React from "react";
import { useSelector } from "react-redux";
import { handleLogout } from "../../../shared/utils/functionHelper";
import "./style.css";
import SubBar from "./SubBar";

interface INavBar {
  current?: number;
  isAtHomePage?: boolean;
  isChooseEventSection?: boolean;
  setIsChooseEventSection?: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar = (props: INavBar) => {
  const {
    current,
    isAtHomePage,
    isChooseEventSection,
    setIsChooseEventSection,
  } = props;
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
    <div className="w3-top" style={{ zIndex: 1000, height: 110 }}>
      <Row
        style={{
          height: 100,
          backgroundColor: "#2357e8",
          boxShadow: "0px 5px 10px #c7c7c7",
        }}
      >
        <Col span={1} />
        <Col className="block_1" span={11}>
          <div className="logo_block">
            <a
              href="/web-view"
              onClick={() => {
                if (setIsChooseEventSection) {
                  setIsChooseEventSection(false);
                }
              }}
            >
              <img src={R.images.logo_TL} alt="logo" width={80} height={60} />
            </a>
          </div>
          <div className="title_block">
            <a
              href="/web-view"
              onClick={() => {
                if (setIsChooseEventSection) {
                  setIsChooseEventSection(false);
                }
              }}
            >
              <p className="title_1">Khoa công nghệ thông tin</p>
              <div style={{ marginTop: -30 }}>
                <p className="title_2">Đại học Thuỷ Lợi</p>
              </div>
            </a>
          </div>
        </Col>
        <Col span={1} />
        <Col span={11} className="block_2">
          {!token ? (
            <div style={{ paddingTop: 30 }}>
              <a
                href="/login"
                style={{
                  padding: "8px 16px",
                  float: "right",
                  width: "auto",
                  border: "none",
                  display: "flex",
                  flexDirection: "row",
                  outline: 0,
                  letterSpacing: 2,
                  color: "white",
                  fontWeight: "600",
                }}
              >
                CÁ NHÂN
                <img
                  style={{
                    width: 30,
                    height: 30,
                    marginLeft: 10,
                    marginTop: -5,
                  }}
                  src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
                />
              </a>

              <a
                href="/web-view-contact-page"
                style={{
                  padding: "8px 16px",
                  float: "right",
                  width: "auto",
                  border: "none",
                  display: "flex",
                  flexDirection: "row",
                  outline: 0,
                  letterSpacing: 2,
                  color: "white",
                  fontWeight: "600",
                }}
              >
                LIÊN HỆ
                <img
                  style={{
                    width: 28,
                    height: 28,
                    marginLeft: 10,
                    marginTop: -5,
                  }}
                  src="https://cdn-icons-png.flaticon.com/128/8898/8898833.png"
                />
              </a>
            </div>
          ) : (
            <div style={{ paddingTop: 30 }}>
              <Dropdown menu={{ items }} placement="bottomRight">
                <a
                  style={{
                    padding: "8px 16px",
                    float: "right",
                    width: "auto",
                    border: "none",
                    display: "flex",
                    flexDirection: "row",
                    outline: 0,
                    letterSpacing: 2,
                    color: "white",
                    fontWeight: "600",
                    textTransform: "uppercase",
                  }}
                >
                  {LocalStorage.getUserName()}
                  <img
                    style={{
                      width: 30,
                      height: 30,
                      marginLeft: 10,
                      marginTop: -5,
                    }}
                    src="https://cdn-icons-png.flaticon.com/128/4140/4140077.png"
                  />
                </a>
              </Dropdown>
              {/* <a
                href="/noti"
                style={{
                  padding: "8px 16px",
                  float: "right",
                  width: "auto",
                  border: "none",
                  display: "block",
                  outline: 0,
                  letterSpacing: 2,
                  color: "#4D55B7",
                  fontWeight: "600",
                }}
              >
                THÔNG BÁO
              </a> */}
            </div>
          )}
        </Col>
      </Row>
      <Row>
        <SubBar
          current={current}
          isAtHomePage={isAtHomePage}
          isChooseEventSection={isChooseEventSection}
          setIsChooseEventSection={setIsChooseEventSection}
        />
      </Row>
    </div>
  );
};

export default NavBar;
