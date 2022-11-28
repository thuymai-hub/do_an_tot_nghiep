import { renderPostType } from "features/news/pages/NewsPage";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PUBLIC_ROUTES_PATH } from "routes/RoutesPath";
import styled from "styled-components";

interface IPostItem {
  item: any;
}

const PostItem = (props: IPostItem) => {
  const { item } = props;
  const navigate = useNavigate();
  return (
    <PostContainer
      onClick={() => {
        navigate(PUBLIC_ROUTES_PATH.POSTPAGEPUBLICDETAIL, {
          state: { postId: item?.id },
        });
      }}
    >
      <img
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 10,
          filter: "grayscale(40%)",
        }}
        src={
          item?.image ||
          "https://images.unsplash.com/photo-1669459868647-4c2f1c564052?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
        }
      />
      <div className="tag-block">
        <span style={{ color: "white", fontWeight: "bold", letterSpacing: 2 }}>
          {renderPostType(item?.postType)}
        </span>
      </div>
      <div className="title-block">
        <span style={{ color: "white", fontWeight: "bold", letterSpacing: 1 }}>
          {item?.titlePost || "Tên bài mặc định"}
        </span>
      </div>
    </PostContainer>
  );
};

const PostContainer = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 10px;
  background-color: red;
  display: flex;
  position: relative;
  cursor: pointer;

  .tag-block {
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 4px 8px;
    border-radius: 10px;
    background-color: rgba(137, 210, 243, 0.8);
  }

  .title-block {
    position: absolute;
    left: 10px;
    bottom: 10px;
    right: 10px;
  }
`;

export default PostItem;
