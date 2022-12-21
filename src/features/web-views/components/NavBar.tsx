import { Button, Col, Dropdown, MenuProps, Row } from "antd";
import LocalStorage from "apis/LocalStorage";
import R from "assets";
import React from "react";
import { useSelector } from "react-redux";
import { handleLogout } from "../../../shared/utils/functionHelper";
import "./style.css";

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
    <div className="w3-top" style={{ zIndex: 1000, height: 110 }}>
      {/* <div
        className="w3-bar w3-white w3-wide w3-padding w3-card"
        style={{ height: 100, backgroundColor: "#4D55B7" }}
      >
        <img
          src={R.images.logo_TL}
          alt="logo"
          width={40}
          height={20}
          style={{ position: "absolute", top: 10, left: 20 }}
        />
        <a
          href="/web-view"
          style={{
            padding: "8px 60px",
            float: "left",
            width: "auto",
            border: "none",
            display: "block",
            outline: 0,
            letterSpacing: 2,
          }}
        >
          <b>Tin tức</b> CNTT
        </a>
        <div className="w3-right w3-hide-small">
          {!token ? (
            <a
              href="/login"
              style={{
                padding: "8px 16px",
                float: "left",
                width: "auto",
                border: "none",
                display: "block",
                outline: 0,
                letterSpacing: 3,
              }}
            >
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
      </div> */}
      <Row
        style={{
          height: 100,
          backgroundColor: "white",
          boxShadow: "0px 5px 10px #c7c7c7",
        }}
      >
        <Col span={1} />
        <Col className="block_1" span={11}>
          <div className="logo_block">
            <a href="/web-view">
              <img src={R.images.logo_TL} alt="logo" width={80} height={60} />
            </a>
          </div>
          <div className="title_block">
            <a href="/web-view">
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
                  color: "#4D55B7",
                  fontWeight: "800",
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
                  src="https://cdn-icons-png.flaticon.com/128/4140/4140077.png"
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
                  color: "#4D55B7",
                  fontWeight: "800",
                }}
              >
                LIÊN HỆ
                <img
                  style={{
                    width: 26,
                    height: 26,
                    marginLeft: 10,
                    marginTop: -5,
                  }}
                  src="https://cdn-icons-png.flaticon.com/128/9194/9194885.png"
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
                    color: "#4D55B7",
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
    </div>
  );
};

export default NavBar;
