import { Carousel, Col, Row } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PUBLIC_ROUTES_PATH } from "routes/RoutesPath";
import styled from "styled-components";

interface IEventPostSection {
  eventPosts: any[];
}

const EventPostSection = (props: IEventPostSection) => {
  const { eventPosts } = props;
  const navigate = useNavigate();

  const renderItem = (item: any, index: number) => {
    return (
      <ItemContainer
        key={index}
        onClick={() => {
          navigate(PUBLIC_ROUTES_PATH.EVENT_PAGE_PUBLIC, {
            state: { postId: item?.id },
          });
        }}
      >
        <img
          src={
            item?.image ||
            "https://images.unsplash.com/photo-1669067585141-2e67dfda2ffc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4Nnx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
          }
          style={{ width: "100%", height: "100%" }}
        />
        <div className="title-block">
          <span className="text">{item.title || "Default title"}</span>
        </div>
      </ItemContainer>
    );
  };

  return (
    <>
      <div className="w3-container w3-padding-32" id="projects">
        <h1
          className="w3-border-bottom w3-border-light-grey w3-padding-16"
          style={{ fontSize: 20 }}
        >
          Sự kiện nổi bật
        </h1>
      </div>
      <Row
        style={{
          padding: "0 16px",
          height: 400,
          width: "90%",
        }}
      >
        <Col span={12}>
          <Carousel autoplay style={{ width: "100%", height: 400 }}>
            {eventPosts.map((item: any, index: number) =>
              renderItem(item, index)
            )}
          </Carousel>
        </Col>
        <Col span={1} />
        <Col span={10}>
          <Row>
            <Col span={24}>
              <SmallItemContainer
                onClick={() => navigate(PUBLIC_ROUTES_PATH.FORUMPAGEPUBLIC)}
              >
                <img
                  style={{
                    width: "100%",
                    height: 190,
                    objectFit: "cover",
                  }}
                  src="https://images.unsplash.com/photo-1546640646-89b557854b23?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fG5lb24lMjBsaWdodHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
                />
                <div className="title-small-block">
                  <p className="small-text">Diễn đàn</p>
                </div>
              </SmallItemContainer>
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={24}>
              <SmallItemContainer
                onClick={() => {
                  const element = document.getElementById("about");
                  element?.scrollIntoView();
                }}
              >
                <img
                  style={{ width: "100%", height: 190, objectFit: "cover" }}
                  src="https://images.unsplash.com/photo-1532896374032-fdffb11e2b8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDZ8fG5lb24lMjBsaWdodHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
                />
                <div className="title-small-block">
                  <p className="small-text">Về chúng tôi</p>
                </div>
              </SmallItemContainer>
            </Col>
          </Row>
        </Col>
        <Col span={1} />
      </Row>
    </>
  );
};

const ItemContainer = styled.div`
  width: 100%;
  height: 400px;
  position: relative;
  border-radius: 10px;
  cursor: pointer;

  .title-block {
    width: 100%;
    padding: 16px;
    position: absolute;
    top: 160px;
    left: 0;
    right: 0;
    text-align: center;

    .text {
      font-size: 20px;
      font-weight: 600;
      color: white;
      text-align: center;
    }
  }
`;

const SmallItemContainer = styled.div`
  width: 100%;
  height: 190px;
  cursor: pointer;

  .title-small-block {
    width: 100%;
    padding: 16px;
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    text-align: center;
  }

  .small-text {
    font-size: 20px;
    font-weight: 600;
    color: white;
    text-align: center;
  }
`;

export default EventPostSection;
