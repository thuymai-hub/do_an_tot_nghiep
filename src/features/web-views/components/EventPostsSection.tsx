import { Carousel, Col, Row } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PUBLIC_ROUTES_PATH } from "routes/RoutesPath";
import { SCREEN_WIDTH } from "shared/utils/CONSTANT";
import styled from "styled-components";
import "./style.css";
import "./PostSection.Style.css";

interface IEventPostSection {
  eventPosts: any[];
  futureEvents: any[];
  normalEvents: any[];
}

const EventPostSection = (props: IEventPostSection) => {
  const { eventPosts, futureEvents, normalEvents } = props;
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
    <div id="event_posts" className="event-container">
      <div style={{ marginBottom: 30, width: "100%" }}>
        <div className="header-container">
          <h1>Sự kiện</h1>
        </div>
      </div>
      <div className="event-content-container">
        <div className="post-column-1">
          {normalEvents.slice(0, 2).map((item: any, index: number) => (
            <div
              key={index}
              className="sub-post-column-1"
              onClick={() => {
                navigate(PUBLIC_ROUTES_PATH.EVENT_PAGE_PUBLIC, {
                  state: { postId: item?.id },
                });
              }}
            >
              <div className="date-block">
                <p className="date-title">
                  Tháng {item?.createdDate.split("-")[1]}
                </p>
                <div style={{ marginTop: -20 }}>
                  <p className="date-detail">
                    {item?.createdDate.split("-")[0]}
                  </p>
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  height: 250,
                  overflow: "hidden",
                }}
              >
                <img
                  className="zoom"
                  src={item?.image}
                  style={{ width: "100%", height: 250, objectFit: "cover" }}
                />
              </div>
              <div style={{ width: "100%", padding: "50px 20px 20px" }}>
                <p className="event-title">{item?.title}</p>
                <p
                  style={{
                    color: "gray",
                    fontWeight: "600",
                    fontSize: 15,
                  }}
                >
                  {item?.shortDes}
                </p>
                <p
                  style={{
                    fontWeight: "600",
                    fontSize: 15,
                  }}
                >
                  Địa điểm:{" "}
                  <span style={{ fontWeight: "600" }}>
                    {item?.place || "---"}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="column-2">
          <div
            style={{
              width: "100%",
              height: 470,
              padding: 20,
              backgroundColor: "white",
            }}
          >
            {normalEvents.slice(2, 4).map((item: any, index: number) => (
              <div
                key={index}
                style={{ cursor: "pointer", marginBottom: 20 }}
                onClick={() => {
                  navigate(PUBLIC_ROUTES_PATH.EVENT_PAGE_PUBLIC, {
                    state: { postId: item?.id },
                  });
                }}
              >
                <div className="column-2-item-container">
                  <div className="column-2-item-date-block">
                    <p className="column-2-item-date-title ">
                      Tháng {item?.createdDate.split("-")[1]}
                    </p>
                    <div style={{ marginTop: -20 }}>
                      <p
                        style={{
                          fontSize: 26,
                          fontWeight: "700",
                          color: "white",
                          textTransform: "uppercase",
                          textAlign: "center",
                        }}
                      >
                        {item?.createdDate.split("-")[0]}
                      </p>
                    </div>
                  </div>
                  <div className="column-2-item-content ">
                    <p className="event-title">{item.title}</p>
                    <div style={{ marginTop: -10 }}>
                      <p style={{ fontSize: 13, color: "gray" }}>
                        {item?.shortDes}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="incomming-block">
              <div style={{ width: "100%", marginTop: 16 }}>
                <p className="incomming-title">Sự kiện sắp diễn ra</p>
              </div>
              {futureEvents.slice(0, 1).map((item: any, index: number) => (
                <div
                  key={index}
                  style={{ cursor: "pointer", marginBottom: 20 }}
                  onClick={() => {
                    navigate(PUBLIC_ROUTES_PATH.EVENT_PAGE_PUBLIC, {
                      state: { postId: item?.id },
                    });
                  }}
                >
                  <div className="column-2-item-container">
                    <div className="column-2-item-date-block">
                      <p className="column-2-item-date-title">
                        Tháng {item?.createdDate.split("-")[1]}
                      </p>
                      <div style={{ marginTop: -20 }}>
                        <p className="date-detail">
                          {item?.createdDate.split("-")[0]}
                        </p>
                      </div>
                    </div>
                    <div className="column-2-item-content ">
                      <p style={{ fontSize: 18, fontWeight: "600" }}>
                        {item.title}
                      </p>
                      <div style={{ marginTop: -10 }}>
                        <p style={{ fontSize: 13, color: "gray" }}>
                          {item?.shortDes}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ItemContainer = styled.div`
  width: 100%;
  height: 400px;
  position: relative;
  border-radius: 10px;
  cursor: pointer;

  .title-block {
    width: 100%;
    padding: 16px;
    position: absolute;
    top: 140px;
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
  height: 100%;
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
