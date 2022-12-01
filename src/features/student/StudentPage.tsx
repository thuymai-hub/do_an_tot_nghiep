import { Col, Empty, Row, Spin } from "antd";
import LocalStorage from "apis/LocalStorage";
import ButtonAdd from "components/Button/ButtonAdd";
import EmptyComp from "components/Empty";
import { renderPostType } from "features/news/pages/NewsPage";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PROTECTED_ROUTES_PATH, PUBLIC_ROUTES_PATH } from "routes/RoutesPath";
import styled from "styled-components";
import Navbar from "../web-views/components/NavBar";

const StudentPage = () => {
  const navigate = useNavigate();
  const userInfor = useSelector((state: any) => state?.user?.user);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [dataSource, setDataSource] = React.useState<any[]>([]);
  const [fullDataSource, setFullDataSource] = React.useState<any[]>([]);

  const getDataSource = () => {
    if (!userInfor?.id) return;
    setLoading(true);
    fetch("http://localhost:8000/wp-json/wp/v2/forum_posts")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(
            "🚀 ~ file: StudentPage.tsx ~ line 29 ~ getDataSource ~ result",
            result
          );
          const myPosts = result?.filter(
            (item: any) => Number(item?.acf?.author_id) === userInfor?.id
          );
          const convertData = myPosts?.map((item: any) => ({
            id: item?.id,
            createdDate: item?.date.slice(0, 10).split("-").reverse().join("-"),
            loveCount: Number(item?.acf?.love_count),
            postType: item?.acf?.post_type,
            author: item?.acf?.author,
            commentCount:
              item?.acf.comment_count === ""
                ? []
                : JSON.parse(item?.acf.comment_count),
            content: item?.acf?.content,
            image: item?.acf?.image,
            status: item?.acf?.is_confirmed,
            // isLiked: checkAlreadyLike(item?.acf?.people_like),
            peopleList:
              item?.acf.people_like === "" || !item?.acf?.people_like
                ? []
                : JSON.parse(item?.acf.people_like),
          }));
          setDataSource(convertData);
          console.log("current data", convertData);
          setFullDataSource(convertData);
          setLoading(false);
        },
        (error) => {
          console.log("error", error);
          setLoading(false);
        }
      );
  };

  const renderPostItem = (item: any, index: number) => {
    return (
      <Col
        className="gutter-row"
        span={6}
        onClick={() => {
          navigate(PROTECTED_ROUTES_PATH.ADD_EDIT_STUDENT_POST, {
            state: { id: item?.id },
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
          <div className="tag-block">
            {item?.status === "1" ? (
              <img
                style={{ width: 24, height: 24 }}
                src={"https://cdn-icons-png.flaticon.com/128/1442/1442912.png"}
              />
            ) : (
              <img
                style={{ width: 24, height: 24 }}
                src={"https://cdn-icons-png.flaticon.com/128/4436/4436481.png"}
              />
            )}
          </div>

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
      </Col>
    );
  };

  React.useEffect(() => {
    getDataSource();
  }, [userInfor?.id]);

  return (
    <Spin spinning={loading}>
      <Container>
        <h2 style={{ fontSize: 24, fontWeight: "bold" }}>Bài viết của tôi</h2>
        <ButtonAdd
          text="Thêm mới"
          onClickButton={() =>
            navigate(PROTECTED_ROUTES_PATH.ADD_EDIT_STUDENT_POST)
          }
        />
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          style={{ width: "93%", marginTop: 30 }}
        >
          {dataSource.length === 0 ? (
            <Empty
              image="https://cdn-icons-png.flaticon.com/128/5089/5089767.png"
              imageStyle={{
                height: 100,
              }}
              description={<span>Danh sách trống</span>}
            />
          ) : (
            dataSource.map((item: any, index: number) =>
              renderPostItem(item, index)
            )
          )}
        </Row>
      </Container>
    </Spin>
  );
};

const Container = styled.div`
  margin-top: 60px;
  width: 100%;
  padding: 40px 30px;
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

export default StudentPage;
