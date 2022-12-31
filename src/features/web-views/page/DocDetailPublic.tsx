import { Col, Row, Spin } from "antd";
import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
import { CliCookieService, CLI_COOKIE_KEYS } from "shared/services/cli-cookie";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import { renderCourse } from "./DocPagePublic";
import { PageContainer } from "./HomePagePublic";

const DocDetailPublic = () => {
  const location = useLocation();
  const [loading, setLoading] = React.useState<boolean>(false);
  const targetId = location?.state?.subjectId;
  const [detailSubject, setDetailSubject] = React.useState<any>();
  const [listImages, setListImages] = React.useState<Array<any>>([]);
  const [listFiles, setListFiles] = React.useState<Array<any>>([]);

  const getDetailData = () => {
    setLoading(true);
    fetch(`http://localhost:8000/wp-json/wp/v2/subjects/${targetId}`, {
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
            title: result?.acf?.title,
            description: result?.acf?.content,
            image: result?.acf?.image,
            author: result?.acf?.author,
            date: result?.acf?.created_date.slice(0, 10),
            courseType: result?.acf?.course_type.split("-")[1],
            fileDoc: result?.acf?.file_docs.split(","),
          };
          setDetailSubject(data);
          setListImages([result?.acf?.image]);
          setListFiles(result?.acf?.file_docs.split(","));
        },
        (error) => {
          console.log("error", error);
          setLoading(false);
        }
      );
  };

  React.useEffect(() => {
    getDetailData();
  }, []);

  return (
    <Spin spinning={loading}>
      <PageContainer>
        <NavBar />
        <ContentContainer style={{ marginTop: 180 }}>
          <Row>
            <Col span={2} />
            <Col span={9}>
              <img
                style={{
                  height: 440,
                  width: 440,
                  borderRadius: 10,
                  objectFit: "cover",
                }}
                src={
                  detailSubject?.image ||
                  "https://images.unsplash.com/photo-1513185041617-8ab03f83d6c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fGJvb2t8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
                }
              />
            </Col>
            <Col span={8}>
              <h1
                style={{ fontSize: 30, fontWeight: "bold", letterSpacing: 1 }}
              >
                {detailSubject?.title}
              </h1>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <img
                    style={{ width: 20, height: 20, marginRight: 8 }}
                    src="https://cdn-icons-png.flaticon.com/128/2103/2103423.png"
                  />
                  <p style={{ fontSize: 14, color: "gray" }}>
                    {detailSubject?.courseType}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <img
                    style={{ width: 20, height: 20, marginRight: 8 }}
                    src="https://cdn-icons-png.flaticon.com/128/1155/1155211.png"
                  />

                  <h1 style={{ fontSize: 14, color: "gray" }}>
                    {detailSubject?.author}
                  </h1>
                </div>

                <div style={{ display: "flex", flexDirection: "row" }}>
                  <img
                    style={{ width: 20, height: 20, marginRight: 8 }}
                    src="https://cdn-icons-png.flaticon.com/128/3652/3652191.png"
                  />
                  <p style={{ fontSize: 14, color: "gray" }}>
                    {detailSubject?.date}
                  </p>
                </div>
              </div>

              <p style={{ textAlign: "justify", color: "darkgray" }}>
                Mô tả:{" "}
                <span
                  style={{ color: "gray", fontStyle: "italic" }}
                >{`"${detailSubject?.description?.replace(
                  /<[^>]+>/g,
                  ""
                )}"`}</span>
              </p>
              <br />
              <p style={{ fontSize: 14, color: "black" }}>
                Link tài liệu:{" "}
                {listFiles.map((item: any, index: number) => (
                  <li>
                    <a
                      key={index}
                      target="_blank"
                      rel="noopener noreferrer"
                      href={item}
                      style={{ color: "black" }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </p>
            </Col>
            <Col span={4} />
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
  margin-top: 100px;
`;

export default DocDetailPublic;
