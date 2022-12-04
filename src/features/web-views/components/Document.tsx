import { Col, Row } from "antd";
import { renderCourseType } from "features/study_document/pages/StudyDocumentPage";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PUBLIC_ROUTES_PATH } from "routes/RoutesPath";
import styled from "styled-components";

interface IDocument {
  subjects: any[];
}

const renderColor = (id: string) => {
  switch (id) {
    case "1":
      return "red";
    case "2":
      return "#180599";
    case "3":
      return "green";
    case "4":
      return "purple";

    default:
      break;
  }
};

const Document = (props: IDocument) => {
  const { subjects } = props;
  const navigate = useNavigate();
  return (
    <div style={{ marginTop: 100 }}>
      <div>
        <Row
          style={{ justifyContent: "center", marginBottom: 50, width: "90%" }}
        >
          <TitleBlock>
            <a href="/web-doc-page">
              <h1 className="title">Tài liệu</h1>
            </a>
          </TitleBlock>
        </Row>
      </div>
      <Row
        gutter={26}
        style={{ width: "88%", padding: "0 45px", marginTop: 30 }}
      >
        {subjects.slice(0, 4).map((item: any, index: number) => {
          return (
            <Col className="gutter-row" span={6}>
              <SubjectItem
                key={index}
                onClick={() => {
                  navigate(PUBLIC_ROUTES_PATH.DOC_DEATIL_PAGE_PUBLIC, {
                    state: { subjectId: item?.id },
                  });
                }}
              >
                <div
                  className="course_title_block"
                  style={{
                    borderTopColor: renderColor(item?.courseType),
                    borderTopWidth: 2,
                  }}
                >
                  <p className="title">{renderCourseType(item?.courseType)}</p>
                </div>
                <div className="course_content_block">
                  <img
                    src={item?.image}
                    style={{ width: "100%", height: 200 }}
                  />
                  <p
                    style={{
                      color: renderColor(item?.courseType),
                      textAlign: "center",
                      paddingTop: 20,
                    }}
                  >
                    {renderCourseType(item?.courseType)}
                  </p>
                  <p className="subject_title">{item?.title}</p>
                  <p style={{ textAlign: "center" }}>
                    Người thêm:{" "}
                    <span style={{ fontWeight: "600" }}>{item?.author}</span>
                  </p>
                  <p style={{ textAlign: "center", color: "gray" }}>
                    {item?.content}
                  </p>
                </div>
              </SubjectItem>
            </Col>
          );
        })}
      </Row>
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

    .title {
      text-align: center;
      font-weight: 700;
      text-transform: uppercase;
    }
  }

  .course_content_block {
    background-color: #f2f2f2;
    padding: 16px;
    align-items: center;
    align-content: center;

    .subject_title {
      font-size: 20px;
      text-align: center;
      font-weight: bold;
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
