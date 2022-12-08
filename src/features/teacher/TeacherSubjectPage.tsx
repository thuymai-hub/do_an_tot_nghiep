import { Col, Empty, Row, Spin } from "antd";
import LocalStorage from "apis/LocalStorage";
import ButtonAdd from "components/Button/ButtonAdd";
import EmptyComp from "components/Empty";
import { renderPostType } from "features/news/pages/NewsPage";
import { renderCourse } from "features/web-views/page/DocPagePublic";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PROTECTED_ROUTES_PATH, PUBLIC_ROUTES_PATH } from "routes/RoutesPath";
import styled from "styled-components";
import NavBar from "../web-views/components/NavBar";

const TeacherSubjectPage = () => {
  const navigate = useNavigate();
  const userInfor = useSelector((state: any) => state?.user?.user);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [dataSource, setDataSource] = React.useState<any[]>([]);
  const [fullDataSource, setFullDataSource] = React.useState<any[]>([]);

  const getDataSource = () => {
    setLoading(true);
    fetch("http://localhost:8000/wp-json/wp/v2/subjects")
      .then((res) => res.json())
      .then(
        (result) => {
          const mySubjects = result?.filter(
            (item: any) => Number(item?.acf?.author_id) === userInfor?.id
          );
          const convertData = mySubjects.map((item: any) => ({
            id: item?.id,
            title: item?.acf?.title,
            createdDate: item?.date.slice(0, 10).split("-").reverse().join("-"),
            courseType: item?.acf?.course_type,
            author: item?.acf?.author,
            image: item?.acf?.image,
          }));
          setDataSource(convertData);
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
          navigate(PROTECTED_ROUTES_PATH.ADD_EDIT_TEACHER_COURSE, {
            state: { id: item?.id },
          });
        }}
      >
        <PostItem key={index}>
          <img
            src={
              item?.image ||
              "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Ym9va3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
            }
            style={{
              width: "100%",
              height: 300,
              objectFit: "cover",
              borderRadius: 10,
              cursor: "pointer",
            }}
          />
          <div className="tag-block">{renderCourse(item?.courseType)}</div>
          <div className="info-block">
            <p
              style={{
                color: "white",
                letterSpacing: 1,
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              {item?.title}
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
        <h2 style={{ fontSize: 24, fontWeight: "bold" }}>Môn học của tôi</h2>
        <ButtonAdd
          text="Thêm mới"
          onClickButton={() =>
            navigate(PROTECTED_ROUTES_PATH.ADD_EDIT_TEACHER_COURSE)
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

export default TeacherSubjectPage;
