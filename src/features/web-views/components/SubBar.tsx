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
    <div className="sub-bar-container">
      {/* <div className="gutter-row sub-nav-bar-item ">
        <a href="/web-view-introduction">
          <p
            className="sub-nav-bar-title"
            style={
              current === 1
                ? { color: "#5988de", fontWeight: "700" }
                : undefined
            }
          >
            Giới thiệu
          </p>
        </a>
      </div> */}
      <div className="gutter-row sub-nav-bar-item ">
        <a href="/web-view-admission-page">
          <p
            className="sub-nav-bar-title"
            style={
              current === 2
                ? { color: "#5988de", fontWeight: "700" }
                : undefined
            }
          >
            Tuyển sinh
          </p>
        </a>
      </div>
      <div className="gutter-row sub-nav-bar-item ">
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
                  ? { color: "#5988de", fontWeight: "700" }
                  : undefined
              }
            >
              Sự kiện
            </p>
          </a>
        ) : (
          <div
            style={{ background: "white", cursor: "pointer", marginTop: -14 }}
            onClick={() => {
              if (setIsChooseEventSection) {
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
                  ? { color: "#5988de", fontWeight: "700" }
                  : undefined
              }
            >
              Sự kiện
            </span>
          </div>
        )}
      </div>
      <div className="gutter-row sub-nav-bar-item ">
        <a href="/web-view-post">
          {/* <img
            src="https://cdn-icons-png.flaticon.com/128/2540/2540832.png"
            style={{ width: 30, height: 30, margin: "auto" }}
          /> */}
          <p
            className="sub-nav-bar-title"
            style={
              current === 4
                ? { color: "#5988de", fontWeight: "700" }
                : undefined
            }
          >
            Tin tức
          </p>
        </a>
      </div>
      <div className="gutter-row sub-nav-bar-item ">
        <a href="/web-view-forum">
          {/* <img
            src="https://cdn-icons-png.flaticon.com/128/2518/2518227.png"
            style={{ width: 30, height: 30, margin: "auto" }}
          /> */}
          <p
            className="sub-nav-bar-title"
            style={
              current === 5
                ? { color: "#5988de", fontWeight: "700" }
                : undefined
            }
          >
            Diễn đàn
          </p>
        </a>
      </div>
      <div className="gutter-row sub-nav-bar-item ">
        <a href="/web-doc-page">
          {/* <img
            src="https://cdn-icons-png.flaticon.com/128/3048/3048425.png"
            style={{ width: 30, height: 30, margin: "auto" }}
          /> */}
          <p
            className="sub-nav-bar-title"
            style={
              current === 6
                ? { color: "#5988de", fontWeight: "700" }
                : undefined
            }
          >
            Tài liệu
          </p>
        </a>
      </div>
    </div>
  );
};

export default SubBar;
