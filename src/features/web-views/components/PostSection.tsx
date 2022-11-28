import { ForwardOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { PUBLIC_ROUTES_PATH } from "routes/RoutesPath";
import PostItem from "./PostItem";

interface IPostSection {
  posts: any;
}

const PostSection = (props: IPostSection) => {
  const { posts } = props;
  const navigate = useNavigate();
  return (
    <>
      <div className="w3-container w3-padding-32" id="projects">
        <h1
          className="w3-border-bottom w3-border-light-grey w3-padding-16"
          style={{ fontSize: 20 }}
        >
          Bài viết
        </h1>
      </div>
      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        style={{ padding: "0 16px" }}
      >
        {posts.slice(0, 3).map((item: any, index: number) => (
          <Col key={index} className="gutter-row" span={6}>
            <PostItem item={item} />
          </Col>
        ))}
        <Col span={3}>
          <Row align="middle" style={{ height: 200 }}>
            <Button
              type="primary"
              shape="circle"
              icon={<ForwardOutlined />}
              onClick={() => navigate(PUBLIC_ROUTES_PATH.POSTPAGEPUBLIC)}
            />
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default PostSection;
