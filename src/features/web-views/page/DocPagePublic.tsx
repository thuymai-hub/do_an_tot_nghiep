import { Button, Col, Dropdown, MenuProps, Row, Select, Spin } from "antd";
import { renderPostType } from "features/news/pages/NewsPage";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PUBLIC_ROUTES_PATH } from "routes/RoutesPath";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import { PageContainer } from "./HomePagePublic";

export const renderCourse = (id: string) => {
  switch (id) {
    case "1":
      return "Công nghệ thông tin";
    case "2":
      return "Thiết kế đồ hoạ";
    case "3":
      return "Quản trị kinh doanh";
    default:
      break;
  }
};

const DocPagePublic = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [courseType, setCourseType] = React.useState<number>();
  const [dataSource, setDataSource] = React.useState<any>([]);
  const [fullDataSource, setFullDataSource] = React.useState<any>([]);

  const handleChange = (value: number | undefined) => {
    setCourseType(value);
  };

  const renderPostItem = (item: any, index: number) => {
    return (
      <Col
        className="gutter-row"
        span={6}
        onClick={() => {
          navigate(PUBLIC_ROUTES_PATH.DOC_DEATIL_PAGE_PUBLIC, {
            state: { subjectId: item?.id },
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

  const getDataSource = () => {
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

  const onSearch = () => {
    setLoading(true);
    if (courseType) {
      const matchedData = fullDataSource.filter(
        (item: any) => Number(item.courseType) === courseType
      );

      setTimeout(() => {
        setLoading(false);
        setDataSource(matchedData);
      }, 500);
    } else {
      setTimeout(() => {
        setLoading(false);
        setDataSource(fullDataSource);
      }, 500);
    }
  };

  React.useEffect(() => {
    getDataSource();
  }, []);

  React.useEffect(() => {
    onSearch();
  }, [courseType]);

  return (
    <Spin spinning={loading}>
      <PageContainer>
        <NavBar />
        <ContentContainer>
          <Row style={{ width: "100%", marginTop: 160 }}>
            <p
              style={{
                fontSize: 22,
                color: "#5988de",
                fontWeight: "bold",
                marginLeft: 24,
              }}
            >
              Trang chủ - Tài liệu
            </p>
          </Row>
          <Select
            style={{ width: 200 }}
            placeholder="Chọn khoá học"
            onChange={handleChange}
            allowClear
            options={[
              { label: "Công nghệ thông tin", value: 1 },
              { label: "Thiết kế đồ hoạ", value: 2 },
              { label: "Quản trị kinh doanh", value: 3 },
            ]}
          />
          <br />
          <br />
          <Row
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            style={{ width: "93%" }}
          >
            {dataSource.map((item: any, index: number) =>
              renderPostItem(item, index)
            )}
          </Row>
        </ContentContainer>
      </PageContainer>
    </Spin>
  );
};

export const ContentContainer = styled.div`
  width: 1500px;
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

export default DocPagePublic;
