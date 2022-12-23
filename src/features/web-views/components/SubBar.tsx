import { Col, Row } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PROTECTED_ROUTES_PATH, PUBLIC_ROUTES_PATH } from "routes/RoutesPath";
import { SCREEN_WIDTH } from "shared/utils/CONSTANT";

interface ISubBar {
  current?: number;
  isAtHomePage?: boolean;
  isChooseEventSection?: boolean;
  setIsChooseEventSection?: React.Dispatch<React.SetStateAction<boolean>>;
}

const SubBar = (props: ISubBar) => {
  const {
    current,
    isAtHomePage,
    isChooseEventSection,
    setIsChooseEventSection,
  } = props;
  const navigate = useNavigate();

  return (
    <Row
      gutter={26}
      justify={"center"}
      style={{
        width: SCREEN_WIDTH,
        padding: "0 200px",
        background: "white",
        height: 46,
        paddingTop: 10,
        boxShadow: "0 5px 20px #d9d9d9",
      }}
    >
      <Col className="gutter-row sub-nav-bar-item " span={4}>
        <a href="/web-view-introduction">
          {/* <img
            src="https://cdn-icons-png.flaticon.com/128/1030/1030902.png"
            style={{ width: 30, height: 30, margin: "auto" }}
          /> */}
          <p
            className="sub-nav-bar-title"
            style={
              current === 1 ? { color: "#5988de", fontSize: 18 } : undefined
            }
          >
            Giới thiệu
          </p>
        </a>
      </Col>
      <Col className="gutter-row sub-nav-bar-item " span={4}>
        <a href="/web-view-admission-page">
          {/* <img
            src="https://cdn-icons-png.flaticon.com/128/2231/2231642.png"
            style={{ width: 30, height: 30, margin: "auto" }}
          /> */}
          <p
            className="sub-nav-bar-title"
            style={
              current === 2 ? { color: "#5988de", fontSize: 18 } : undefined
            }
          >
            Tuyển sinh
          </p>
        </a>
      </Col>
      <Col className="gutter-row sub-nav-bar-item " span={4}>
        {isAtHomePage ? (
          <a
            href="#event_posts"
            onClick={() => {
              if (setIsChooseEventSection) {
                setIsChooseEventSection(true);
              }
            }}
          >
            <p
              className="sub-nav-bar-title"
              style={
                isChooseEventSection
                  ? { color: "#5988de", fontSize: 18 }
                  : undefined
              }
            >
              Sự kiện nổi bật
            </p>
          </a>
        ) : (
          <div
            style={{ background: "white", cursor: "pointer", marginTop: -14 }}
            onClick={() => {
              console.log(1);
              if (setIsChooseEventSection) {
                console.log(2);
                setIsChooseEventSection(true);
              }
              navigate(PUBLIC_ROUTES_PATH.HOMEPAGEPUBLIC, {
                state: { id: 1 },
              });
            }}
          >
            <span
              className="sub-nav-bar-title"
              style={
                isChooseEventSection
                  ? { color: "#5988de", fontSize: 18 }
                  : undefined
              }
            >
              Sự kiện nổi bật
            </span>
          </div>
        )}
      </Col>
      <Col className="gutter-row sub-nav-bar-item " span={4}>
        <a href="/web-view-post">
          {/* <img
            src="https://cdn-icons-png.flaticon.com/128/2540/2540832.png"
            style={{ width: 30, height: 30, margin: "auto" }}
          /> */}
          <p
            className="sub-nav-bar-title"
            style={
              current === 4 ? { color: "#5988de", fontSize: 18 } : undefined
            }
          >
            Tin tức
          </p>
        </a>
      </Col>
      <Col className="gutter-row sub-nav-bar-item " span={4}>
        <a href="/web-view-forum">
          {/* <img
            src="https://cdn-icons-png.flaticon.com/128/2518/2518227.png"
            style={{ width: 30, height: 30, margin: "auto" }}
          /> */}
          <p
            className="sub-nav-bar-title"
            style={
              current === 5 ? { color: "#5988de", fontSize: 18 } : undefined
            }
          >
            Diễn đàn
          </p>
        </a>
      </Col>
      <Col className="gutter-row sub-nav-bar-item " span={4}>
        <a href="/web-view-student-page">
          {/* <img
            src="https://cdn-icons-png.flaticon.com/128/3048/3048425.png"
            style={{ width: 30, height: 30, margin: "auto" }}
          /> */}
          <p
            className="sub-nav-bar-title"
            style={
              current === 6 ? { color: "#5988de", fontSize: 18 } : undefined
            }
          >
            Sinh viên
          </p>
        </a>
      </Col>
    </Row>
  );
};

export default SubBar;
