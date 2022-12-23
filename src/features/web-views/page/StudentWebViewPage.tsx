import { Col, Row } from "antd";
import React from "react";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import { ContentContainer } from "./DocPagePublic";
import { PageContainer } from "./HomePagePublic";
import "../components/style.css";

const StudentWebviewPage = () => {
  return (
    <PageContainer>
      <NavBar current={6} />
      <ContentContainer style={{ padding: 100, marginTop: 80 }}>
        <p style={{ fontSize: 22, color: "#5988de", fontWeight: "bold" }}>
          Trang chủ - Sinh viên
        </p>
        <div>
          <Row style={{ width: "100%", height: 400 }}>
            <Col span={11}>
              <img
                style={{ height: 400, width: "100%" }}
                src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c3R1ZGVudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
              />
            </Col>
            <Col
              span={11}
              style={{ padding: "30px 40px", backgroundColor: "#ebebeb" }}
            >
              <p
                style={{
                  fontSize: 26,
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  textDecoration: "underline",
                }}
              >
                Nghiên cứu - sáng tạo - khởi nghiệp
              </p>
              <p style={{ fontSize: 18, fontWeight: "600" }}>
                Nghiên cứu - sáng tạo -khởi nghiệp dành cho các bạn sinh viên
                thuộc Đại học Thuỷ Lợi
              </p>
              <li
                style={{
                  color: "#5988de",
                  fontSize: 16,
                  fontWeight: "600",
                  paddingBottom: 10,
                }}
              >
                Câu lạc bộ nghiên cứu, sáng tạo
              </li>
              <li
                style={{
                  color: "#5988de",
                  fontSize: 16,
                  fontWeight: "600",
                  paddingBottom: 10,
                }}
              >
                Hội thi sinh viên nghiên cứu khoa học thường niên
              </li>
              <li style={{ color: "#5988de", fontSize: 16, fontWeight: "600" }}>
                Cuộc thi sáng tạo trẻ
              </li>
              <div className="btn">
                <p className="text">Liên hệ</p>
              </div>
            </Col>
          </Row>
          <Row style={{ width: "100%", height: 400 }}>
            <Col
              span={11}
              style={{ padding: "30px 40px", backgroundColor: "#ebebeb" }}
            >
              <p
                style={{
                  fontSize: 26,
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  textDecoration: "underline",
                }}
              >
                Học bổng - Học phí
              </p>
              <p style={{ fontSize: 18, fontWeight: "600" }}>
                Hàng năm, Trường Đại học Thuỷ Lợi đã phối hợp với các tổ chức,
                đơn vị, tập đoàn, các doanh nghiệp trong và ngoài nước dành
                nhiều suất học bổng cho sinh viên
              </p>
              <li
                style={{
                  color: "#5988de",
                  fontSize: 16,
                  fontWeight: "600",
                  paddingBottom: 10,
                }}
              >
                Học bổng
              </li>
              <li
                style={{
                  color: "#5988de",
                  fontSize: 16,
                  fontWeight: "600",
                  paddingBottom: 10,
                }}
              >
                Học phí
              </li>
              <div className="btn">
                <p className="text">Liên hệ</p>
              </div>
            </Col>
            <Col span={11}>
              <img
                style={{ height: 400, width: "100%" }}
                src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fG1vbmV5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
              />
            </Col>
          </Row>
          <Row style={{ width: "100%", height: 400 }}>
            <Col span={11}>
              <img
                style={{ height: 400, width: "100%" }}
                src="https://images.unsplash.com/photo-1522881193457-37ae97c905bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bWVudG9yfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
              />
            </Col>
            <Col
              span={11}
              style={{ padding: "30px 40px", backgroundColor: "#ebebeb" }}
            >
              <p
                style={{
                  fontSize: 26,
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  textDecoration: "underline",
                }}
              >
                Hướng nghiệp - Việc làm
              </p>
              <p style={{ fontSize: 18, fontWeight: "600" }}>
                Cung cấp các thông tin về việc làm và nơi thực tập hướng nghiệp.
              </p>
              <li
                style={{
                  color: "#5988de",
                  fontSize: 16,
                  fontWeight: "600",
                  paddingBottom: 10,
                }}
              >
                Thông tin tuyển dụng
              </li>
              <div className="btn">
                <p className="text">Xem tại đây</p>
              </div>
            </Col>
          </Row>
        </div>
      </ContentContainer>
    </PageContainer>
  );
};

export default StudentWebviewPage;
