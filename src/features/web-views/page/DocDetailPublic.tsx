import { Col, Row, Spin } from "antd";
import React from "react";
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
            date: result?.acf?.created_date,
            courseType: Number(result?.acf?.course_type),
            fileDoc: result?.acf?.file_docs.split(","),
          };
          console.log(
            "🚀 ~ file: DocDetailPublic.tsx:41 ~ getDetailData ~ result?.acf?.file_docs.split(",
            ")",
            result?.acf?.file_docs.split(",")
          );
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
        <ContentContainer>
          <Row>
            <Col span={2} />
            <Col span={10}>
              <img
                style={{ height: 500, width: "100%", borderRadius: 10 }}
                src={
                  detailSubject?.image ||
                  "https://images.unsplash.com/photo-1513185041617-8ab03f83d6c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fGJvb2t8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
                }
              />
            </Col>
            <Col span={8}>
              <div
                style={{
                  boxShadow: "5px 0 5px #ededeb",
                  padding: 20,
                  position: "absolute",
                  left: -80,
                  background: "white",
                  top: 100,
                  minWidth: 400,
                }}
              >
                <div style={{ position: "absolute", top: 20, right: 20 }}>
                  <p style={{ fontSize: 12, letterSpacing: 1, color: "gray" }}>
                    {renderCourse(detailSubject?.courseType)}
                  </p>
                </div>
                <h1
                  style={{ fontSize: 20, fontWeight: "bold", letterSpacing: 1 }}
                >
                  {detailSubject?.title}
                </h1>

                <h1 style={{ fontSize: 14, color: "gray" }}>
                  {detailSubject?.author} -{" "}
                  <span
                    style={{ fontSize: 12, fontStyle: "italic", color: "gray" }}
                  >
                    {detailSubject?.date}
                  </span>
                </h1>
                <p style={{ textAlign: "justify", color: "gray" }}>
                  {detailSubject?.description?.replace(/<[^>]+>/g, "")}
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
              </div>
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
