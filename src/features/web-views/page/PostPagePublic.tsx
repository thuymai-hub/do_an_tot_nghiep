import { Button, Col, Dropdown, MenuProps, Row, Select, Spin } from "antd";
import { renderPostType } from "features/news/pages/NewsPage";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PUBLIC_ROUTES_PATH } from "routes/RoutesPath";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import { PageContainer } from "./HomePagePublic";
import "../components/PostPage.Style.css";

const PostPagePublic = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [posts, setPosts] = React.useState<any>([]);
  const [postType, setPostType] = React.useState<number>();
  const [fullDataSource, setFullDataSource] = React.useState<any>([]);
  const [listTypes, setListTypes] = React.useState<Array<any>>([]);

  const handleChange = (value: string | undefined) => {
    if (value) {
      setPostType(Number(value?.split("-")[0]));
    } else {
      setPostType(undefined);
    }
  };

  const renderPostItem = (item: any, index: number) => {
    return (
      <div
        className="post-item-container"
        onClick={() => {
          navigate(PUBLIC_ROUTES_PATH.POSTPAGEPUBLICDETAIL, {
            state: { postId: item?.id },
          });
        }}
      >
        <PostItem key={index}>
          <img
            src={
              item?.image ||
              "https://images.unsplash.com/photo-1669461734596-b126134d0dfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyN3x8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
            }
            style={{
              width: "100%",
              height: 300,
              objectFit: "cover",
              borderRadius: 10,
              cursor: "pointer",
            }}
          />
          <div className="tag-block">{item?.postType}</div>
          <div className="info-block">
            <p
              style={{
                color: "white",
                letterSpacing: 1,
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              {item?.titlePost}
            </p>
            <div
              style={{
                marginTop: -10,
              }}
            >
              <p
                style={{
                  color: "white",
                  fontSize: 12,
                  opacity: 0.8,
                }}
              >
                {item?.createdDate}
              </p>
            </div>
          </div>
        </PostItem>
      </div>
    );
  };

  const getPosts = () => {
    setLoading(true);
    fetch("http://localhost:8000/wp-json/wp/v2/posts?post_status=any")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("result:", result);
          const convertData = result.map((item: any) => ({
            id: item?.id,
            titlePost: item?.acf?.title_post,
            createdDate: item?.date.slice(0, 10).split("-").reverse().join("-"),
            loveCount: item?.acf?.love_count,
            postType: item?.acf?.post_type.split("-")[1],
            postTypeFull: item?.acf?.post_type,
            status: item?.acf?.is_confirmed,
            image: item?.acf?.image,
          }));
          setPosts(convertData);
          console.log(
            "🚀 ~ file: PostPagePublic.tsx:101 ~ getPosts ~ convertData",
            convertData
          );
          setFullDataSource(convertData);
          setLoading(false);
        },
        (error) => {
          console.log("error", error);
          setLoading(false);
        }
      );
  };

  const onSearch = () => {
    setLoading(true);
    if (postType) {
      const matchedData = fullDataSource.filter(
        (item: any) => Number(item?.postTypeFull?.split("-")[0]) === postType
      );

      setTimeout(() => {
        setLoading(false);
        setPosts(matchedData);
      }, 500);
    } else {
      setTimeout(() => {
        setLoading(false);
        setPosts(fullDataSource);
      }, 500);
    }
  };

  const getListNewsTypes = () => {
    setLoading(true);
    fetch("http://localhost:8000/wp-json/wp/v2/news_types")
      .then((res) => res.json())
      .then(
        (result) => {
          const convertData = result.map((item: any) => ({
            value: `${item?.id}-${item?.acf?.title}`,
            label: item?.acf?.title,
          }));
          setListTypes(convertData);
          setLoading(false);
        },
        (error) => {
          console.log("error", error);
          setLoading(false);
        }
      );
  };

  React.useEffect(() => {
    getPosts();
    getListNewsTypes();
  }, []);

  React.useEffect(() => {
    onSearch();
  }, [postType]);

  return (
    <Spin spinning={loading}>
      <PageContainer>
        <NavBar current={4} />
        <ContentContainer style={{ marginTop: 160 }}>
          <p className="header">Trang chủ - Tin tức</p>
          <div className="post-page-container">
            <Select
              style={{ width: 120 }}
              placeholder="Loại bài viết"
              onChange={handleChange}
              allowClear
              options={listTypes}
            />
          </div>
          <br />
          <br />
          <div className="post-page-content-container">
            {posts.map((item: any, index: number) =>
              renderPostItem(item, index)
            )}
          </div>
        </ContentContainer>
      </PageContainer>
    </Spin>
  );
};

export const ContentContainer = styled.div`
  padding: 20px 40px;
  min-height: 700px;
`;

const PostItem = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 10px;
  box-shadow: 4px 4px 6px lightgray;
  margin-bottom: 30px;
  position: relative;

  .info-block {
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .tag-block {
    position: absolute;
    left: 10px;
    top: 10px;
    padding: 8px 12px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
  }
`;

export default PostPagePublic;
