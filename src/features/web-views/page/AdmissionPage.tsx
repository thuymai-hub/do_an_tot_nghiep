import { Col, Row, Spin } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PUBLIC_ROUTES_PATH } from "routes/RoutesPath";
import NavBar from "../components/NavBar";
import { ContentContainer } from "./DocPagePublic";
import { PageContainer } from "./HomePagePublic";
import "../components/Addmission.Style.css";
import Footer from "../components/Footer";

const AdmissionPage = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [posts, setPosts] = React.useState<any>([]);
  const navigate = useNavigate();

  const renderReadingTime = (content: any) => {
    const result = Math.ceil(content?.length / 60);
    if (result >= 20) return 10;
    return result;
  };

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
              content: item?.acf?.content,
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
      <NavBar current={2} />
      <div className="ad-container">
        <p
          style={{
            fontSize: 22,
            color: "#5988de",
            fontWeight: "bold",
          }}
        >
          Trang chủ - Tuyển sinh
        </p>

        <div className="addmission-content-container">
          {posts.map((item: any, index: number) => {
            if (index % 2 === 0) {
              return (
                <div
                  key={index}
                  className="event-content-block"
                  onClick={() => {
                    navigate(PUBLIC_ROUTES_PATH.POSTPAGEPUBLICDETAIL, {
                      state: { postId: item?.id },
                    });
                  }}
                >
                  <div className="img-block">
                    <img
                      style={{
                        height: "100%",
                        objectFit: "cover",
                        width: "100%",
                      }}
                      src={item?.image}
                    />
                  </div>
                  <div className="content-block">
                    <p className="ad-title">{item?.titlePost}</p>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          marginRight: 30,
                        }}
                      >
                        <img
                          src="https://cdn-icons-png.flaticon.com/128/591/591576.png"
                          style={{ width: 24, height: 24, marginRight: 10 }}
                        />
                        <p className="date">{item?.createdDate}</p>
                      </div>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <img
                          src="https://cdn-icons-png.flaticon.com/128/2784/2784459.png"
                          style={{ width: 24, height: 24, marginRight: 10 }}
                        />
                        <p className="date">
                          {renderReadingTime(item?.content)} phút đọc
                        </p>
                      </div>
                    </div>

                    <div className="btn">
                      <p className="text">Xem chi tiết</p>
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  className="event-content-block"
                  onClick={() => {
                    navigate(PUBLIC_ROUTES_PATH.POSTPAGEPUBLICDETAIL, {
                      state: { postId: item?.id },
                    });
                  }}
                >
                  <div className="content-block">
                    <p className="ad-title">{item?.titlePost}</p>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          marginRight: 30,
                        }}
                      >
                        <img
                          src="https://cdn-icons-png.flaticon.com/128/591/591576.png"
                          style={{ width: 24, height: 24, marginRight: 10 }}
                        />
                        <p className="date">{item?.createdDate}</p>
                      </div>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <img
                          src="https://cdn-icons-png.flaticon.com/128/2784/2784459.png"
                          style={{ width: 24, height: 24, marginRight: 10 }}
                        />
                        <p className="date">
                          {renderReadingTime(item?.content)} phút đọc
                        </p>
                      </div>
                    </div>

                    <div className="btn">
                      <p className="text">Xem chi tiết</p>
                    </div>
                  </div>
                  <div className="img-block">
                    <img
                      style={{
                        height: "100%",
                        objectFit: "cover",
                        width: "100%",
                      }}
                      src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fG1vbmV5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
                    />
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
      <Footer />
    </Spin>
  );
};

export default AdmissionPage;
