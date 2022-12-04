import { Col, Row } from "antd";
import React from "react";
import styled from "styled-components";

const About = () => {
  return (
    <div
      id="about"
      style={{ marginTop: 80, backgroundColor: "black", padding: "40px 0" }}
    >
      <div>
        <Row
          style={{ justifyContent: "center", marginBottom: 30, width: "90%" }}
        >
          <TitleBlock>
            <h1 className="title">Về chúng tôi</h1>
          </TitleBlock>
        </Row>
      </div>
      <Row>
        <Col span={3} />
        <Col span={9}>
          <img
            style={{ height: 400, width: "100%" }}
            src="https://www.tlu.edu.vn/Portals/0/2022/Thang5/Thang%206/DT2.jpg?ver=2022-11-30-165151-613"
          />
        </Col>
        <Col span={8}>
          <div
            style={{
              boxShadow: "5px 0 5px #ededeb",
              padding: 20,
              position: "absolute",
              left: -60,
              background: "white",
              top: 140,
            }}
          >
            <p style={{ textAlign: "justify" }}>
              Chiến lược phát triển Trường Đại học Thuỷ lợi giai đoạn 2006 -
              2020 sẽ đưa ĐHTL trở thành một trong mười trường đại học hàng đầu
              của Việt Nam, từ đó tạo tiền đề cho việc hoàn thành tốt các mục
              tiêu đã nêu ra ở trên. Chiến lược phát triển của Trường ĐHTL sẽ
              được thực thi trong ba giai đoạn năm năm, mười năm và 15 năm trong
              đó giai đoạn năm năm đầu tiên sẽ đóng vai trò quyết định.
            </p>
          </div>
        </Col>
        <Col span={4} />
      </Row>
    </div>
  );
};

const TitleBlock = styled.div`
  width: 240px;
  height: 70px;
  border-bottom: 4px solid white;

  .title {
    font-size: 40px;
    font-weight: bold;
    color: white;
  }
`;
export default About;
