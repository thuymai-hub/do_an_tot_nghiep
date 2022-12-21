import { Col, Row, Spin } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PUBLIC_ROUTES_PATH } from "routes/RoutesPath";
import NavBar from "../components/NavBar";
import { ContentContainer } from "./DocPagePublic";
import { PageContainer } from "./HomePagePublic";

const AdmissionPage = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [posts, setPosts] = React.useState<any>([]);
  const navigate = useNavigate();

  const getPosts = () => {
    setLoading(true);
    fetch("http://localhost:8000/wp-json/wp/v2/posts?post_status=any")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("result:", result);
          const convertData = result
            .map((item: any) => ({
              id: item?.id,
              titlePost: item?.acf?.title_post,
              createdDate: item?.date
                .slice(0, 10)
                .split("-")
                .reverse()
                .join("-"),
              loveCount: item?.acf?.love_count,
              postType: item?.acf?.post_type.split("-")[1],
              postTypeFull: item?.acf?.post_type,
              status: item?.acf?.is_confirmed,
              image: item?.acf?.image,
            }))
            .filter((item: any) => item?.postType === "Tuyển sinh");
          setPosts(convertData);
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
  }, []);
  return (
    <Spin spinning={loading}>
      <PageContainer>
        <NavBar />
        <ContentContainer style={{ marginTop: 130 }}>
          <p
            style={{
              fontSize: 22,
              color: "#5988de",
              fontWeight: "bold",
              marginLeft: 24,
            }}
          >
            Trang chủ - Tuyển sinh
          </p>

          <Row
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            style={{ width: "93%", marginLeft: 30 }}
          >
            {posts.map((item: any, index: number) => {
              if (index % 2 === 0) {
                return (
                  <Row
                    key={index}
                    style={{ width: "100%", height: 400 }}
                    onClick={() => {
                      navigate(PUBLIC_ROUTES_PATH.POSTPAGEPUBLICDETAIL, {
                        state: { postId: item?.id },
                      });
                    }}
                  >
                    <Col span={11}>
                      <img
                        style={{ height: 400, width: "100%" }}
                        src={item?.image}
                      />
                    </Col>
                    <Col
                      span={11}
                      style={{
                        padding: "30px 40px",
                        backgroundColor: "#ebebeb",
                      }}
                    >
                      <p
                        style={{
                          fontSize: 26,
                          textTransform: "uppercase",
                          fontWeight: "bold",
                        }}
                      >
                        {item?.titlePost}
                      </p>
                      <p style={{ fontSize: 14 }}>{item?.createdDate}</p>

                      <div className="btn">
                        <p className="text">Xem chi tiết</p>
                      </div>
                    </Col>
                  </Row>
                );
              } else {
                return (
                  <Row
                    style={{ width: "100%", height: 400 }}
                    onClick={() => {
                      navigate(PUBLIC_ROUTES_PATH.POSTPAGEPUBLICDETAIL, {
                        state: { postId: item?.id },
                      });
                    }}
                  >
                    <Col
                      span={11}
                      style={{
                        padding: "30px 40px",
                        backgroundColor: "#ebebeb",
                      }}
                    >
                      <p
                        style={{
                          fontSize: 26,
                          textTransform: "uppercase",
                          fontWeight: "bold",
                        }}
                      >
                        {item?.titlePost}
                      </p>
                      <p style={{ fontSize: 14 }}>{item?.createdDate}</p>

                      <div className="btn">
                        <p className="text">Xem chi tiết</p>
                      </div>
                    </Col>
                    <Col span={11}>
                      <img
                        style={{ height: 400, width: "100%" }}
                        src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fG1vbmV5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
                      />
                    </Col>
                  </Row>
                );
              }
            })}
          </Row>
        </ContentContainer>
      </PageContainer>
    </Spin>
  );
};

export default AdmissionPage;
