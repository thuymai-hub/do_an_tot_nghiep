import { Col, Row, Spin } from "antd";
import ButtonAdd from "components/Button/ButtonAdd";
import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { PUBLIC_ROUTES_PATH } from "routes/RoutesPath";
import { CliCookieService, CLI_COOKIE_KEYS } from "shared/services/cli-cookie";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import { PageContainer } from "./HomePagePublic";
import { ContentContainer } from "./PostPagePublic";
import { convert } from "html-to-text";
import Footer from "../components/Footer";
import "../components/DetailPostPage.Style.css";

const PostPagePublicDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const targetId = location?.state?.postId;
  const [loading, setLoading] = React.useState<boolean>(false);
  const [detailPost, setDetailPost] = React.useState<any>();
  const [content, setContent] = React.useState<any>();
  const [otherPosts, setOtherPosts] = React.useState<any[]>([]);

  const renderReadingTime = () => {
    const result = Math.ceil(content?.length / 60);
    if (result >= 20) return 10;
    return result;
  };

  const renderPostItem = (item: any, index: number) => {
    return (
      <div
        className="other-post-item"
        key={index}
        onClick={() => {
          navigate(PUBLIC_ROUTES_PATH.POSTPAGEPUBLICDETAIL, {
            state: { postId: item?.id },
          });
          window.location.reload();
        }}
      >
        <div className="other-post-item-image-block ">
          <img
            src={item.image}
            style={{
              width: "100%",
              borderRadius: 10,
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
        <div className="other-post-item-info-block">
          {item.titlePost.length >= 60 ? (
            <span className="other-post-item-info-title">
              {item.titlePost.slice(0, 60)}...
            </span>
          ) : (
            <span className="other-post-item-info-title">{item.titlePost}</span>
          )}
          <p className="other-post-item-info-date">{item.date}</p>
        </div>
      </div>
    );
  };

  const getPosts = () => {
    setLoading(true);
    fetch("http://localhost:8000/wp-json/wp/v2/posts?post_status=any")
      .then((res) => res.json())
      .then(
        (result) => {
          const data = result.map((item: any) => ({
            id: item?.id,
            titlePost: item?.acf?.title_post,
            date: item?.date.slice(0, 10).split("-").reverse().join("-"),
            image: item?.acf?.image,
          }));
          const finalData = data.filter(
            (item: any) => Number(item.id) !== targetId
          );
          setOtherPosts(finalData.slice(0, 4));
          setLoading(false);
        },
        (error) => {
          console.log("error", error);
          setLoading(false);
        }
      );
  };

  const getDetailData = () => {
    setLoading(true);
    fetch(`http://localhost:8000/wp-json/wp/v2/posts/${targetId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CliCookieService.get(
          CLI_COOKIE_KEYS.ACCESS_TOKEN
        )}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result: any) => {
          setLoading(false);
          const data = {
            id: result?.acf?.id,
            titlePost: result?.acf?.title_post,
            content: result?.acf?.content,
            image: result?.acf?.image,
            date: result?.acf?.date,
            author: result?.acf?.author,
            newsType: result?.acf?.post_type.split("-")[1],
            isSentNoti: Number(result?.acf?.is_send_noti) === 1 ? true : false,
          };
          setContent(result?.acf?.content);
          setDetailPost(data);
        },
        (error) => {
          console.log("error", error);
          setLoading(false);
        }
      );
  };

  React.useEffect(() => {
    getDetailData();
    getPosts();
  }, []);

  return (
    <Spin spinning={loading}>
      <PageContainer>
        <NavBar />
        <div className="detail-post-container">
          <div>
            <div>
              <p style={{ fontSize: 12, color: "gray" }}>
                Trang chủ - {detailPost?.newsType} - {detailPost?.titlePost}
              </p>
            </div>
            <Tag>
              <p
                style={{
                  textTransform: "uppercase",
                  color: "white",
                  fontWeight: "400",
                  textAlign: "center",
                }}
              >
                {detailPost?.newsType}
              </p>
            </Tag>
            <div>
              <span style={{ fontSize: 30, fontWeight: "bold" }}>
                {detailPost?.titlePost}
              </span>
              <p style={{ color: "gray", fontSize: 16, marginTop: 10 }}>
                Chúc bạn một ngày tốt lành!
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <img
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 100,
                  objectFit: "cover",
                  marginRight: 10,
                }}
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
              />
              <p
                style={{
                  color: "gray",
                  marginRight: 26,
                  lineHeight: "30px",
                  fontSize: 12,
                }}
              >
                Tác giả:{" "}
                <span style={{ color: "black" }}>
                  {detailPost?.author || "---"}
                </span>
              </p>
              <p
                style={{
                  color: "gray",
                  marginRight: 10,
                  lineHeight: "30px",
                  fontSize: 12,
                }}
              >
                {detailPost?.date}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: 16,
                }}
              >
                <img
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 100,
                    objectFit: "cover",
                    marginRight: 8,
                    marginTop: 5,
                    color: "gray",
                  }}
                  src="https://cdn-icons-png.flaticon.com/128/9127/9127069.png"
                />
                <p style={{ color: "gray", lineHeight: "30px", fontSize: 12 }}>
                  {renderReadingTime()} phút đọc
                </p>
              </div>
            </div>
            <div
              style={{ display: "flex", flexDirection: "row", marginTop: 20 }}
            >
              <Block style={{ backgroundColor: "#4267B2" }}>
                <img
                  style={{ width: 20, height: 20, marginRight: 10 }}
                  src="https://cdn-icons-png.flaticon.com/128/5968/5968764.png"
                />
                <span style={{ color: "white" }}>Facebook</span>
              </Block>
              <Block style={{ backgroundColor: "#cf2c23" }}>
                <img
                  style={{ width: 20, height: 20, marginRight: 10 }}
                  src="https://cdn-icons-png.flaticon.com/128/3536/3536559.png"
                />
                <span style={{ color: "white" }}>Pinterest</span>
              </Block>
              <Block
                style={{
                  borderWidth: 1,
                  borderColor: "lightgray",
                  borderRadius: 4,
                  width: 50,
                  cursor: "pointer",
                }}
              >
                <img
                  style={{ width: 20, height: 20, color: "lightgray" }}
                  src="https://cdn-icons-png.flaticon.com/128/2958/2958783.png"
                />
              </Block>
            </div>
            <div style={{ marginTop: 20, width: "95%" }}>
              <img className="image-title" src={detailPost?.image} />
              {/* <p style={{ textAlign: "justify" }}>
                  {convert(detailPost?.content, { wordwrap: 1000 })}
                </p> */}
              <div dangerouslySetInnerHTML={{ __html: detailPost?.content }} />
            </div>
          </div>
          <div className="more-options-block">
            <div
              style={{
                width: "100%",
                height: 250,
                objectFit: "cover",
                position: "relative",
              }}
            >
              <div className="move-to-forum-block">
                <img
                  style={{ width: "100%", height: "100%" }}
                  src="https://images.unsplash.com/photo-1543269664-7eef42226a21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nzd8fHN0dWRlbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
                />
                <div style={{ position: "absolute", left: 20, bottom: 30 }}>
                  <p
                    style={{ fontSize: 20, fontWeight: "700", color: "white" }}
                  >
                    Khám phá những bài viết từ sinh viên khác
                  </p>
                  <ButtonAdd
                    text={"Khám phá"}
                    onClickButton={() =>
                      navigate(PUBLIC_ROUTES_PATH.FORUMPAGEPUBLIC)
                    }
                  />
                </div>
              </div>
              <div>
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    paddingTop: 30,
                  }}
                >
                  Bài viết khác
                </p>
                <div className="other-post-section">
                  {otherPosts.map((item: any, index: number) =>
                    renderPostItem(item, index)
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space" />
        <Footer />
      </PageContainer>
    </Spin>
  );
};

const Tag = styled.div`
  padding: 4px;
  border-radius: 8px;
  background-color: #7482c4;
  max-width: 100px;
  height: 30px;
  margin-top: 20px;
  margin-bottom: 30px;
`;

const Block = styled.div`
  border-radius: 2px;
  width: 150px;
  height: 40px;
  padding: 8px 16px;
  margin-right: 8px;
  display: flex;
  flex-direction: row;
`;

const PostItem = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  cursor: pointer;

  .image-block {
    flex: 1;
    object-fit: cover;

    .image {
      width: 100%;
      height: 80px;
    }
  }

  .info-block {
    flex: 2;
    padding: 0 14px;
    margin-left: 10px;

    .other-post-title {
      font-weight: 700;
      text-align: justify;
      font-size: 13px;
      color: black;
    }

    .date {
      color: gray;
      font-size: 12px;
      padding-top: 4px;
    }
  }
`;

export default PostPagePublicDetail;
