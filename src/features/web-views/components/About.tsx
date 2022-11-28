import { Col, Row } from "antd";
import React from "react";
import styled from "styled-components";

const About = () => {
  return (
    <div id="about">
      <div className="w3-container w3-padding-32" id="projects">
        <h1
          className="w3-border-bottom w3-border-light-grey w3-padding-16"
          style={{ fontSize: 20, marginLeft: 10 }}
        >
          Về chúng tôi
        </h1>
      </div>
      <Row>
        <Col span={3} />
        <Col span={9}>
          <img
            style={{ height: 400, width: "100%" }}
            src="https://images.unsplash.com/photo-1473830394358-91588751b241?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
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

const InfoBlock = styled.div``;

export default About;
