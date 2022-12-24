import { Carousel, Col, Row, Spin } from "antd";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PUBLIC_ROUTES_PATH } from "routes/RoutesPath";
import styled from "styled-components";
import About from "../components/About";
import Content from "../components/Content";
import { ItemContainer } from "../components/EventPostsSection";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NavBar from "../components/NavBar";

const HomePagePublic = () => {
  const location = useLocation();
  const [isChooseEventSection, setIsChooseEventSection] = React.useState(false);
  const isEventChosen = location?.state?.id;
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [posts, setPosts] = React.useState<any>([]);
  const [eventPosts, setEventPosts] = React.useState<any>([]);
  const [subjects, setSubjects] = React.useState<any>([]);
  const [futureEvents, setFutureEvents] = React.useState<any>([]);
  const [normalEvents, setNormalEvents] = React.useState<any>([]);

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
            // item?.image ||
            "https://images.unsplash.com/photo-1669067585141-2e67dfda2ffc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4Nnx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
          }
          style={{ width: "100%", height: "100%" }}
        />
        {/* <div className="title-block">
          <span className="text">{item.Post || "Default title"}</span>
        </div> */}
      </ItemContainer>
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
            place: item?.acf?.place,
            isFutureEvent: item?.acf?.is_future_event,
            shortDes: item?.acf?.short_description,
          }));
          setEventPosts(convertData);
          setLoading(false);
          const data = convertData.filter((item: any) => {
            return item?.isFutureEvent === "1";
          });
          setFutureEvents(data);
          const normalData = convertData.filter(
            (item: any) => item?.isFutureEvent === "0"
          );
          setNormalEvents(normalData);
        },
        (error) => {
          console.log("error", error);
          setLoading(false);
        }
      );
  };

  const pageScroll = () => {
    if (document) {
      setIsChooseEventSection(true);
      document
        ?.getElementById("event_posts")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  React.useEffect(() => {
    if (isEventChosen === 1) {
      pageScroll();
    }
  }, []);

  const getListSubjects = () => {
    setLoading(true);
    fetch("http://localhost:8000/wp-json/wp/v2/subjects")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("result:", result);
          const convertData = result.map((item: any) => ({
            id: item?.id,
            title: item?.acf?.title,
            createdDate: item?.date.slice(0, 10).split("-").reverse().join("-"),
            courseType: item?.acf?.course_type,
            author: item?.acf?.author,
            image: item?.acf?.image,
            content: item?.acf?.content,
          }));
          setSubjects(convertData);
          setLoading(false);
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
    getListSubjects();
  }, []);

  return (
    <Spin spinning={loading}>
      <PageContainer>
        <NavBar
          current={isEventChosen ? 3 : 10}
          isAtHomePage={true}
          isChooseEventSection={isChooseEventSection}
          setIsChooseEventSection={setIsChooseEventSection}
        />
        <Header />
        <Content
          futureEvents={futureEvents}
          normalEvents={normalEvents}
          posts={posts}
          eventPosts={eventPosts}
          subjects={subjects}
        />
        {/* <About /> */}
        <br />
        <br />
        <br />
        <Footer />
      </PageContainer>
    </Spin>
  );
};

export const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
`;

export default HomePagePublic;
