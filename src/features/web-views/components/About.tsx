import { Col, Row } from "antd";
import React from "react";
import { SCREEN_WIDTH } from "shared/utils/CONSTANT";
import styled from "styled-components";

const About = () => {
  return (
    <div
      id="about"
      style={{
        marginTop: 80,
        backgroundColor: "black",
        padding: "40px 0",
        width: SCREEN_WIDTH,
      }}
    >
      <div>
        <Row
          style={{ justifyContent: "center", marginBottom: 30, width: "90%" }}
        >
          <TitleBlock>
            <h1 className="small_title">Giới thiệu</h1>
            <h1 className="title">Tôi là...</h1>
          </TitleBlock>
        </Row>
      </div>
      <Row
        justify="center"
        style={{ width: "90%", display: "flex", justifyContent: "center" }}
      >
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: 1000,
            borderWidth: 3,
            borderColor: "orange",
          }}
        >
          <img
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 1000,
              objectFit: "cover",
            }}
            src="https://scontent.fhan17-1.fna.fbcdn.net/v/t1.6435-9/118803452_2653770108194815_5441057767048637165_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=0debeb&_nc_ohc=82uRQ5wG688AX8xa9jK&_nc_ht=scontent.fhan17-1.fna&oh=00_AfDyirZjVkDzPFURkVrXQMsvYUMyfz_8RZ2j1STuuZyhmQ&oe=63C09134"
          />
        </div>
      </Row>
      <Row style={{ width: "90%", padding: "20px 20%" }}>
        <p style={{ color: "gray", fontSize: 14, textAlign: "center" }}>
          “It is my hope that the principles in the document will be translated
          into action”, said UN Special Representative in Sudan, Volker Perthes.
          “The transitional authorities need to respect and protect the rights
          and freedoms of all Sudanese, regardless of their ethnic, religious or
          political background.”
        </p>
      </Row>
      <Row style={{ width: "100%", padding: "20px 38%" }}>
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
      </Row>
    </div>
  );
};

const TitleBlock = styled.div`
  /* width: 290px; */
  height: 70px;
  /* border-bottom: 4px solid white; */

  .title {
    font-size: 40px;
    font-weight: bold;
    color: orange;
  }

  .small_title {
    text-transform: uppercase;
    color: gray;
    font-size: 14px;
    text-align: center;
  }
`;

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
export default About;
