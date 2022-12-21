import { Button, Col, Row } from "antd";
import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <div style={{ height: 600, padding: 100, background: "black" }}>
      <Row gutter={16}>
        <Col span={8}>
          <p style={{ color: "#5988de", fontWeight: "700", fontSize: 18 }}>
            Về chúng tôi
          </p>
          <p style={{ color: "white", textAlign: "justify" }}>
            “It is my hope that the principles in the document will be
            translated into action”, said UN Special Representative in Sudan,
            Volker Perthes. “The transitional authorities need to respect and
            protect the rights and freedoms of all Sudanese, regardless of their
            ethnic, religious or political background.”
          </p>
          <div className="btn" style={{ width: 130, height: 40 }}>
            <a href="/web-view-contact-page">
              <p className="text">Liên hệ</p>
            </a>
          </div>
        </Col>
        <Col span={1} />
        <Col span={6}>
          <p style={{ color: "#5988de", fontWeight: "700", fontSize: 18 }}>
            Nội dung trang web
          </p>
          <a href="/web-view-post">
            <li style={{ color: "white" }}>Tin tức</li>
          </a>
          <a href="#event_posts">
            <li style={{ color: "white" }}>Sự kiện nổi bật</li>
          </a>
          <a href="/web-view-forum">
            <li style={{ color: "white" }}>Diễn đàn</li>
          </a>
          <a href="/web-doc-page">
            <li style={{ color: "white" }}>Tài liệu</li>
          </a>
        </Col>
        <Col span={8}>
          <p style={{ color: "#5988de", fontWeight: "700", fontSize: 18 }}>
            Ảnh nổi bật
          </p>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ flex: 1, height: 140 }}>
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  marginRight: 10,
                }}
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c2Nob29sfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
              />
            </div>
            <div style={{ flex: 1, height: 140 }}>
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  marginLeft: 10,
                }}
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c2Nob29sfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
              />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "row", marginTop: 10 }}>
            <div style={{ flex: 1, height: 140 }}>
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  marginRight: 10,
                }}
                src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHNjaG9vbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
              />
            </div>
            <div style={{ flex: 1, height: 140 }}>
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  marginLeft: 10,
                }}
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fHNjaG9vbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
              />
            </div>
          </div>
        </Col>
      </Row>
      <Row
        style={{
          marginTop: 40,
          borderTopWidth: 1,
          borderTopColor: "#6b6a6a",
          marginRight: 40,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row", paddingTop: 16 }}>
          <SocialMediaBlock>
            <img
              style={{ width: 20, height: 20 }}
              src="https://cdn-icons-png.flaticon.com/128/1384/1384168.png"
            />
          </SocialMediaBlock>
          <SocialMediaBlock>
            <img
              style={{ width: 20, height: 20 }}
              src="https://cdn-icons-png.flaticon.com/128/1384/1384172.png"
            />
          </SocialMediaBlock>
          <SocialMediaBlock>
            <img
              style={{ width: 20, height: 20 }}
              src="https://cdn-icons-png.flaticon.com/128/1384/1384171.png"
            />
          </SocialMediaBlock>
        </div>
        <p
          style={{
            color: "#5988de",
            fontSize: 24,
            fontFamily: "ABradley Hand",
            paddingTop: 20,
          }}
        >
          Thank you!
        </p>
      </Row>
    </div>
  );
};

const SocialMediaBlock = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  border: 3px solid orange;
  border-radius: 1000px;
  align-items: center;
  margin-left: 20px;
`;

export default Footer;
