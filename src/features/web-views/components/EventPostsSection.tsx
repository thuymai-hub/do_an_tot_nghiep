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
  console.log(
    "🚀 ~ file: EventPostsSection.tsx ~ line 13 ~ EventPostSection ~ eventPosts",
    eventPosts
  );
  const navigate = useNavigate();
  const [futureEvents, setFutureEvents] = React.useState<any[]>([]);
  const [normalEvents, setNormalEvents] = React.useState<any[]>([]);

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

  const splitPosts = () => {
    const data = eventPosts.filter(
      (item: any) => Number(item.isFutureEvent) === 1
    );
    setFutureEvents(data);
    const normalData = eventPosts.filter(
      (item: any) => Number(item.isFutureEvent) !== 1
    );
    setNormalEvents(normalData);
  };

  React.useEffect(() => {
    splitPosts();
  }, []);

  return (
    <div
      id="event_posts"
      style={{ marginTop: 100, backgroundColor: "black", padding: "30px 0" }}
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
          height: 450,
          width: "100%",
          marginTop: 80,
        }}
      >
        <Col span={15}>
          <Carousel autoplay style={{ width: "100%", height: 450 }}>
            {normalEvents.map((item: any, index: number) =>
              renderItem(item, index)
            )}
          </Carousel>
        </Col>
        <Col span={1} />
        <Col span={7}>
          <Row>
            <Col span={24}>
              <div
                style={{
                  width: "100%",
                  height: 400,
                  padding: 20,
                  backgroundColor: "white",
                }}
              >
                <p
                  style={{ color: "#666565", fontSize: 24, fontWeight: "600" }}
                >
                  Sự kiện sắp diễn ra
                </p>
                {futureEvents.map((item: any, index: number) => (
                  <Row gutter={16} style={{ cursor: "pointer" }}>
                    <Col className="gutter-row" span={4}>
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/2273/2273225.png"
                        style={{ width: 30, height: 30 }}
                      />
                    </Col>
                    <Col className="gutter-row" span={20}>
                      <p style={{ fontSize: 18, fontWeight: "600" }}>
                        {item.title}
                      </p>
                      <div style={{ marginTop: -10 }}>
                        <p style={{ fontSize: 13, color: "gray" }}>
                          {item?.endDate}
                        </p>
                      </div>
                    </Col>
                  </Row>
                ))}
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
