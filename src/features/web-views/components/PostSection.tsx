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
    <div className="post-section-container">
      <div className="title-container">
        <a href="web-view-post">
          <h1 style={{ color: "black" }} className="title">
            Tin tức
          </h1>
        </a>
      </div>
      <div className="post-content-container">
        <div className="first-post-container">
          <div
            className="first-post-image-container"
            onClick={() => {
              navigate(PUBLIC_ROUTES_PATH.POSTPAGEPUBLICDETAIL, {
                state: { postId: posts[0]?.id },
              });
            }}
          >
            <img
              className="zoom"
              src={posts[0]?.image}
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
            />
            <div className="title-post-container">
              <p className="first-title-post">{posts[0]?.titlePost}</p>
            </div>
          </div>
        </div>
        <div className="second-post-container">
          <div
            className="second-post-item-block"
            style={{ marginBottom: 20 }}
            onClick={() => {
              navigate(PUBLIC_ROUTES_PATH.POSTPAGEPUBLICDETAIL, {
                state: { postId: posts[1]?.id },
              });
            }}
          >
            <img
              className="zoom"
              src={posts[1]?.image}
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
            />
            <div className="title-post-container">
              <p className="second-post-title">{posts[1]?.titlePost}</p>
            </div>
          </div>
          <div
            className="second-post-item-block "
            onClick={() => {
              navigate(PUBLIC_ROUTES_PATH.POSTPAGEPUBLICDETAIL, {
                state: { postId: posts[2]?.id },
              });
            }}
          >
            <img
              className="zoom"
              src={posts[2]?.image}
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
            />
            <div
              style={{ position: "absolute", bottom: 0, left: 10, right: 10 }}
            >
              <p className="second-post-title">{posts[2]?.titlePost}</p>
            </div>
          </div>
        </div>
        <div className="third-post-container">
          {posts.slice(3, 8).map((item: any, index: number) => (
            <PostItem
              key={index}
              onClick={() => {
                navigate(PUBLIC_ROUTES_PATH.POSTPAGEPUBLICDETAIL, {
                  state: { postId: item?.id },
                });
              }}
            >
              <p className="third-title-post">
                {item.titlePost.length > 60
                  ? `${item.titlePost.slice(0, 60)}...`
                  : item.titlePost}
              </p>
            </PostItem>
          ))}
        </div>
      </div>
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
  border-bottom: 1px solid #d1d1d1;
  cursor: pointer;
`;

export default PostSection;
