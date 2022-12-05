import { Col, Row } from "antd";
import React from "react";

const SubBar = () => {
  return (
    <Row
      gutter={26}
      justify={"center"}
      style={{
        width: "78%",
        padding: "30px 30px 10px",
        borderBottom: "1px solid lightgray",
        marginLeft: "5%",
      }}
    >
      <Col className="gutter-row sub-nav-bar-item " span={4}>
        <a href="#about">
          <img
            src="https://cdn-icons-png.flaticon.com/128/1030/1030902.png"
            style={{ width: 30, height: 30, margin: "auto" }}
          />
          <p className="sub-nav-bar-title">Giới thiệu</p>
        </a>
      </Col>
      <Col className="gutter-row sub-nav-bar-item " span={4}>
        <a href="">
          <img
            src="https://cdn-icons-png.flaticon.com/128/2231/2231642.png"
            style={{ width: 30, height: 30, margin: "auto" }}
          />
          <p className="sub-nav-bar-title">Tuyển sinh</p>
        </a>
      </Col>
      <Col className="gutter-row sub-nav-bar-item " span={4}>
        <a href="#event_posts">
          <img
            src="https://cdn-icons-png.flaticon.com/128/616/616490.png"
            style={{ width: 30, height: 30, margin: "auto" }}
          />
          <p className="sub-nav-bar-title">Sự kiện nổi bật</p>
        </a>
      </Col>
      <Col className="gutter-row sub-nav-bar-item " span={4}>
        <a href="/web-view-post">
          <img
            src="https://cdn-icons-png.flaticon.com/128/741/741867.png"
            style={{ width: 30, height: 30, margin: "auto" }}
          />
          <p className="sub-nav-bar-title">Tin tức</p>
        </a>
      </Col>
      <Col className="gutter-row sub-nav-bar-item " span={4}>
        <img
          src="https://cdn-icons-png.flaticon.com/128/1305/1305141.png"
          style={{ width: 30, height: 30, margin: "auto" }}
        />
        <p className="sub-nav-bar-title">Nghiên cứu</p>
      </Col>
      <Col className="gutter-row sub-nav-bar-item " span={4}>
        <img
          src="https://cdn-icons-png.flaticon.com/128/3048/3048425.png"
          style={{ width: 30, height: 30, margin: "auto" }}
        />
        <p className="sub-nav-bar-title">Sinh viên</p>
      </Col>
    </Row>
  );
};

export default SubBar;
