import { Carousel, Col, Row } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PUBLIC_ROUTES_PATH } from "routes/RoutesPath";
import { SCREEN_WIDTH } from "shared/utils/CONSTANT";
import styled from "styled-components";
import "./style.css";

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
    <div
      id="event_posts"
      style={{
        marginTop: 100,
        minHeight: 700,
        backgroundColor: "black",
        padding: "30px 0",
        width: SCREEN_WIDTH,
      }}
    >
      <div>
        <Row
          style={{ justifyContent: "center", marginBottom: 30, width: "100%" }}
        >
          <div
            style={{
              width: 300,
              height: 70,
              borderBottom: "4px solid white",
            }}
          >
            <h1
              style={{
                fontSize: 40,
                fontWeight: "bold",
                color: "white",
              }}
            >
              Sự kiện nổi bật
            </h1>
          </div>
        </Row>
      </div>
      <Row
        style={{
          padding: "0 50px",
          height: 470,
          width: "100%",
          marginTop: 80,
        }}
      >
        <Col
          span={15}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {normalEvents.slice(0, 2).map((item: any, index: number) => (
            <div
              key={index}
              style={{
                width: "46%",
                backgroundColor: "white",
                position: "relative",
                cursor: "pointer",
              }}
              onClick={() => {
                navigate(PUBLIC_ROUTES_PATH.EVENT_PAGE_PUBLIC, {
                  state: { postId: item?.id },
                });
              }}
            >
              <div
                style={{
                  position: "absolute",
                  right: 20,
                  bottom: 220,
                  width: 80,
                  height: 100,
                  backgroundColor: "#4D55B7",
                  padding: "20px 2px",
                  zIndex: 10,
                }}
              >
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: "700",
                    color: "white",
                    textTransform: "uppercase",
                    textAlign: "center",
                  }}
                >
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
                <p
                  style={{
                    textTransform: "uppercase",
                    color: "#4D55B7",
                    fontWeight: "800",
                    fontSize: 18,
                  }}
                >
                  {item?.title}
                </p>
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
                  Địa điểm: <span style={{fontWeight: '600'}}>{item?.place || "---"}</span>
                </p>
              </div>
            </div>
          ))}
        </Col>
        <Col span={1} />
        <Col span={7}>
          <Row>
            <Col span={24}>
              <div
                style={{
                  width: "100%",
                  height: 470,
                  padding: 20,
                  backgroundColor: "white",
                }}
              >
                {normalEvents.slice(2, 4).map((item: any, index: number) => (
                  <Row
                    key={index}
                    gutter={16}
                    style={{ cursor: "pointer", marginBottom: 20 }}
                    onClick={() => {
                      navigate(PUBLIC_ROUTES_PATH.EVENT_PAGE_PUBLIC, {
                        state: { postId: item?.id },
                      });
                    }}
                  >
                    <Col className="gutter-row" span={4}>
                      <div
                        style={{
                          width: 80,
                          height: 100,
                          backgroundColor: "#4D55B7",
                          padding: "20px 2px",
                          zIndex: 10,
                        }}
                      >
                        <p
                          style={{
                            fontSize: 13,
                            fontWeight: "700",
                            color: "white",
                            textTransform: "uppercase",
                            textAlign: "center",
                          }}
                        >
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
                    </Col>
                    <Col span={3} />
                    <Col className="gutter-row" span={16}>
                      <p style={{ fontSize: 18, fontWeight: "600" }}>
                        {item.title}
                      </p>
                      <div style={{ marginTop: -10 }}>
                        <p style={{ fontSize: 13, color: "gray" }}>
                          {item?.shortDes}
                        </p>
                      </div>
                    </Col>
                  </Row>
                ))}
                <Row
                  style={{
                    width: "100%",
                    borderTopWidth: 1,
                    borderTopColor: "#EEEEEE",
                  }}
                >
                  <div style={{ width: "100%", marginTop: 16 }}>
                    <p
                      style={{
                        color: "#4D55B7",
                        fontSize: 20,
                        fontWeight: "800",
                        textAlign: "center",
                      }}
                    >
                      Sự kiện sắp diễn ra
                    </p>
                  </div>
                  {futureEvents.slice(0, 1).map((item: any, index: number) => (
                    <Row
                      key={index}
                      gutter={16}
                      style={{ cursor: "pointer", marginBottom: 20 }}
                      onClick={() => {
                        navigate(PUBLIC_ROUTES_PATH.EVENT_PAGE_PUBLIC, {
                          state: { postId: item?.id },
                        });
                      }}
                    >
                      <Col className="gutter-row" span={4}>
                        <div
                          style={{
                            width: 80,
                            height: 100,
                            backgroundColor: "#4D55B7",
                            padding: "20px 2px",
                            zIndex: 10,
                          }}
                        >
                          <p
                            style={{
                              fontSize: 13,
                              fontWeight: "700",
                              color: "white",
                              textTransform: "uppercase",
                              textAlign: "center",
                            }}
                          >
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
                      </Col>
                      <Col span={3} />
                      <Col className="gutter-row" span={16}>
                        <p style={{ fontSize: 18, fontWeight: "600" }}>
                          {item.title}
                        </p>
                        {/* <div style={{ marginTop: -10 }}>
                          <p style={{ fontSize: 13, color: "gray" }}>
                            {item?.shortDes}
                          </p>
                        </div> */}
                      </Col>
                    </Row>
                  ))}
                </Row>
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={1} />
      </Row>
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
