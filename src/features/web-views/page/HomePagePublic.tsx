import { Spin } from "antd";
import React from "react";
import styled from "styled-components";
import About from "../components/About";
import Content from "../components/Content";
import Header from "../components/Header";
import NavBar from "../components/NavBar";

const HomePagePublic = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [posts, setPosts] = React.useState<any>([]);
  const [eventPosts, setEventPosts] = React.useState<any>([]);

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
            postType: item?.acf?.post_type,
            status: item?.acf?.is_confirmed,
            image: item?.acf?.image,
          }));
          setPosts(convertData);
          setLoading(false);
        },
        (error) => {
          console.log("error", error);
          setLoading(false);
        }
      );
  };

  const getEventPosts = () => {
    setLoading(true);
    fetch("http://localhost:8000/wp-json/wp/v2/event_posts")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("result:", result);
          const convertData = result.map((item: any) => ({
            id: item?.id,
            title: item?.acf?.title,
            createdDate: item?.date.slice(0, 10).split("-").reverse().join("-"),
            loveCount: item?.acf?.love_count,
            postType: item?.acf?.post_type,
            startDate: item?.acf?.start_date,
            endDate: item?.acf?.end_date,
            status: item?.acf?.status,
            image: item?.acf?.image,
          }));
          setEventPosts(convertData);
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
    getEventPosts();
  }, []);
  return (
    <Spin spinning={loading}>
      <PageContainer>
        <NavBar />
        <Header />
        <Content posts={posts} eventPosts={eventPosts} />
        <About />
        <br />
        <br />
        <br />
      </PageContainer>
    </Spin>
  );
};

export const PageContainer = styled.div`
  width: "100%";
  height: "100%";
  margin: 0;
  padding: 0;
  background: white;
`;

export default HomePagePublic;
