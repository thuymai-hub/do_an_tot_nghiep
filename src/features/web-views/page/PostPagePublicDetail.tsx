import { Col, Row, Spin } from "antd";
import React from "react";
import { useLocation } from "react-router-dom";
import { CliCookieService, CLI_COOKIE_KEYS } from "shared/services/cli-cookie";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import { PageContainer } from "./HomePagePublic";
import { ContentContainer } from "./PostPagePublic";
import { convert } from "html-to-text";
import { renderPostType } from "features/news/pages/NewsPage";

const PostPagePublicDetail = () => {
  const location = useLocation();
  const targetId = location?.state?.postId;
  const [loading, setLoading] = React.useState<boolean>(false);
  const [detailPost, setDetailPost] = React.useState<any>();

  const getDetailData = () => {
    setLoading(true);
    fetch(`http://localhost:8000/wp-json/wp/v2/posts/${targetId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CliCookieService.get(
          CLI_COOKIE_KEYS.ACCESS_TOKEN
        )}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result: any) => {
          setLoading(false);
          const data = {
            id: result?.acf?.id,
            titlePost: result?.acf?.title_post,
            description: result?.acf?.content,
            image: result?.acf?.image,
            date: result?.acf?.date,
            newsType: result?.acf?.post_type,
            isSentNoti: Number(result?.acf?.is_send_noti) === 1 ? true : false,
          };
          setDetailPost(data);
        },
        (error) => {
          console.log("error", error);
          setLoading(false);
        }
      );
  };

  React.useEffect(() => {
    getDetailData();
  }, []);
  return (
    <Spin spinning={loading}>
      <PageContainer>
        <NavBar />
        <ContentContainer>
          <br />
          <br />
          <br />
          <br />
          <Row>
            <Col span={2} />
            <Col span={10}>
              <img
                style={{ height: 500, width: "100%", borderRadius: 10 }}
                src={
                  detailPost?.image ||
                  "https://images.unsplash.com/photo-1473830394358-91588751b241?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
                }
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
                  top: 100,
                }}
              >
                <div style={{ position: "absolute", top: 20, right: 20 }}>
                  <p style={{ fontSize: 12, letterSpacing: 1, color: "gray" }}>
                    {renderPostType(detailPost?.newsType)}
                  </p>
                </div>
                <h1
                  style={{ fontSize: 20, fontWeight: "bold", letterSpacing: 1 }}
                >
                  {detailPost?.titlePost}
                </h1>
                <h1
                  style={{ fontSize: 12, fontStyle: "italic", color: "gray" }}
                >
                  {detailPost?.date}
                </h1>
                <p style={{ textAlign: "justify" }}>
                  {detailPost?.description?.replace(/<[^>]+>/g, "")}
                </p>
              </div>
            </Col>
            <Col span={4} />
          </Row>
        </ContentContainer>
      </PageContainer>
    </Spin>
  );
};

export default PostPagePublicDetail;
