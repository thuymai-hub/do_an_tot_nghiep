import { Col, Row } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PUBLIC_ROUTES_PATH } from "routes/RoutesPath";
import { SCREEN_WIDTH } from "shared/utils/CONSTANT";
import styled from "styled-components";
import "./Document.Style.css";

interface IDocument {
  subjects: any[];
}

const renderColor = (name: string) => {
  switch (name) {
    case "Công nghệ thông tin":
      return "red";
    case "Thiết kế đồ hoạ":
      return "#180599";
    case "Quản trị kinh doanh":
      return "green";

    default:
      return "purple";
  }
};

const Document = (props: IDocument) => {
  const { subjects } = props;
  const navigate = useNavigate();
  return (
    <div className="document-container">
      <div className="title-container">
        <a href="/web-doc-page">
          <h1 className="title">Tài liệu</h1>
        </a>
      </div>
      <div className="documnet-container-content">
        {subjects.slice(0, 4).map((item: any, index: number) => {
          return (
            <div
              className="document-item-container"
              key={index}
              onClick={() => {
                navigate(PUBLIC_ROUTES_PATH.DOC_DEATIL_PAGE_PUBLIC, {
                  state: { subjectId: item?.id },
                });
              }}
            >
              <div className="course_title_block">
                <p className="course-title">{item?.courseType.split("-")[1]}</p>
              </div>
              <div className="doc-image-block">
                <img
                  src={item?.image}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="course_content_block">
                <p
                  style={{
                    color: renderColor(item?.courseType.split("-")[1]),
                    textAlign: "center",
                    paddingTop: 20,
                  }}
                >
                  {item?.courseType.split("-")[1]}
                </p>
                <p className="subject_title">{item?.title}</p>
                <p style={{ textAlign: "center" }}>
                  Người thêm:{" "}
                  <span style={{ fontWeight: "600" }}>{item?.author}</span>
                </p>
                <p style={{ textAlign: "center", color: "gray" }}>
                  {item?.content || "---"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SubjectItem = styled.div`
  width: 100%;
  min-height: 450px;
  box-shadow: 4px 5px 10px #e6e6e6;
  cursor: pointer;

  .course_title_block {
    align-items: center;
    justify-content: center;
    padding: 20px 0;
    height: 60px;
    border-top: 2px solid black;

    .title {
      text-align: center;
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`;

const TitleBlock = styled.div`
  width: 140px;
  height: 70px;
  border-bottom: 4px solid #5c5c5c;

  .title {
    font-size: 40px;
    font-weight: bold;
    color: "#5C5C5C";
  }
`;

export default Document;
