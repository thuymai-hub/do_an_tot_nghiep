import { ForwardOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { PROTECTED_ROUTES_PATH, PUBLIC_ROUTES_PATH } from "routes/RoutesPath";
import { SCREEN_WIDTH } from "shared/utils/CONSTANT";
import styled from "styled-components";
import "./style.css";

interface IPostSection {
  posts: any;
}

const PostSection = (props: IPostSection) => {
  const { posts } = props;
  const navigate = useNavigate();
  return (
    <div style={{ marginTop: 50, width: SCREEN_WIDTH, paddingRight: 60 }}>
      <div>
        <Row style={{ justifyContent: "center", marginBottom: 30 }}>
          <TitleBlock>
            <a href="web-view-post">
              <h1 className="title">Tin tức</h1>
            </a>
          </TitleBlock>
        </Row>
      </div>
      <Row gutter={26} style={{ padding: "0 30px 0 60px" }}>
        <Col className="gutter-row" span={12}>
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate(PUBLIC_ROUTES_PATH.POSTPAGEPUBLICDETAIL, {
                state: { postId: posts[0]?.id },
              });
            }}
          >
            <img
              className="zoom"
              src={posts[0]?.image}
              style={{ height: "100%", width: "100%" }}
            />
            <div style={{ position: "absolute", bottom: 0, padding: 20 }}>
              <p style={{ fontSize: 20, color: "white", fontWeight: "700" }}>
                {posts[0]?.titlePost}
              </p>
            </div>
          </div>
        </Col>
        <Col
          className="gutter-row"
          span={6}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate(PUBLIC_ROUTES_PATH.POSTPAGEPUBLICDETAIL, {
                state: { postId: posts[1]?.id },
              });
            }}
          >
            <img
              className="zoom"
              src={posts[1]?.image}
              style={{ height: 200, width: '100%' }}
            />
            <div
              style={{ position: "absolute", bottom: 0, left: 10, right: 10 }}
            >
              <p style={{ fontSize: 15, color: "white", fontWeight: "700" }}>
                {posts[1]?.titlePost}
              </p>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate(PUBLIC_ROUTES_PATH.POSTPAGEPUBLICDETAIL, {
                state: { postId: posts[2]?.id },
              });
            }}
          >
            <img
              className="zoom"
              src={posts[2]?.image}
              style={{ height: 200, width: '100%' }}
            />
            <div
              style={{ position: "absolute", bottom: 0, left: 10, right: 10 }}
            >
              <p style={{ fontSize: 16, color: "white", fontWeight: "700" }}>
                {posts[2]?.titlePost}
              </p>
            </div>
          </div>
        </Col>
        <Col span={6} className="gutter-row">
          {posts.slice(3, 8).map((item: any, index: number) => (
            <PostItem
              key={index}
              onClick={() => {
                navigate(PUBLIC_ROUTES_PATH.POSTPAGEPUBLICDETAIL, {
                  state: { postId: item?.id },
                });
              }}
            >
              <p style={{ fontSize: 16, fontWeight: "600" }}>
                {item.titlePost.length > 60
                  ? `${item.titlePost.slice(0, 60)}...`
                  : item.titlePost}
              </p>
            </PostItem>
          ))}
        </Col>
      </Row>
    </div>
  );
};

const TitleBlock = styled.div`
  width: 135px;
  height: 70px;
  border-bottom: 4px solid #5c5c5c;

  .title {
    font-size: 40px;
    font-weight: bold;
    color: "#5C5C5C";
  }
`;

const PostItem = styled.div`
  padding: 8px;
  border-bottom: 1px solid gray;
  cursor: pointer;
`;

export default PostSection;
