import { Col, PageHeader, Row, Spin } from "antd";
import Container from "container/Container";
import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { IFormatData } from "../components/interface";
import {
  totalPostBarChart,
  totalSubjectBarChart,
} from "../components/barChart";
import { totalAccountBarChart } from "../components/accountChart";

const HomePage: React.FC = () => {
  const [postData, setPostData] = React.useState<any>();
  const [subjectData, setSubjectData] = React.useState<any>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [listNewsType, setListNewsTypes] = React.useState<any[]>([]);
  const [listCourse, setListCourse] = React.useState<any[]>([]);

  const getListNewsTypes = () => {
    setLoading(true);
    fetch("http://localhost:8000/wp-json/wp/v2/news_types")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("result:", result);
          const convertData = result.map((item: any) => ({
            id: item?.id,
            title: item?.acf?.title,
            date: item?.acf?.created_date,
          }));
          setListNewsTypes(convertData);
          setLoading(false);
        },
        (error) => {
          console.log("error", error);
          setLoading(false);
        }
      );
  };

  const getListCourse = () => {
    setLoading(true);
    fetch("http://localhost:8000/wp-json/wp/v2/courses")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("result:", result);
          const convertData = result.map((item: any) => ({
            id: item?.id,
            title: item?.acf?.title,
            date: item?.acf?.created_date,
          }));
          setListCourse(convertData);
          setLoading(false);
        },
        (error) => {
          console.log("error", error);
          setLoading(false);
        }
      );
  };

  const getDataSource = () => {
    setLoading(true);
    fetch("http://localhost:8000/wp-json/wp/v2/posts")
      .then((res) => res.json())
      .then(
        (result) => {
          const convertData = result.map((item: any) => ({
            id: item?.id,
            postType: item?.acf?.post_type.split("-")[0],
          }));
          const data = listNewsType.map((item: any) => ({
            name: item?.title,
            y: convertData.filter(
              (itemData: any) => Number(itemData.postType) == Number(item.id)
            ).length,
          }));
          setPostData(data);
          setLoading(false);
        },
        (error) => {
          console.log("error", error);
          setLoading(false);
        }
      );
  };

  const getSubjectData = () => {
    setLoading(true);
    fetch("http://localhost:8000/wp-json/wp/v2/subjects")
      .then((res) => res.json())
      .then(
        (result) => {
          const convertData = result.map((item: any) => ({
            id: item?.id,
            courseType: item?.acf?.course_type.split("-")[0],
          }));
          const data = listCourse.map((item: any) => ({
            name: item?.title,
            y: convertData.filter(
              (itemData: any) => Number(itemData.courseType) == Number(item.id)
            ).length,
          }));
          setSubjectData(data);
          setLoading(false);
        },
        (error) => {
          console.log("error", error);
          setLoading(false);
        }
      );
  };

  React.useEffect(() => {
    getListNewsTypes();
    getListCourse();
  }, []);

  React.useEffect(() => {
    if (listNewsType.length !== 0) {
      getDataSource();
    }
  }, [listNewsType]);

  React.useEffect(() => {
    if (listCourse.length !== 0) {
      getSubjectData();
    }
  }, [listCourse]);

  return (
    <Spin spinning={loading}>
      <Container
        header={
          <PageHeader
            style={{ borderRadius: 8 }}
            title="Tổng quan"
            // extra={[
            //   <ButtonAdd
            //     key={1}
            //     text="Thêm mới"
            //     onClickButton={() => {
            //       navigate(PROTECTED_ROUTES_PATH.ADD_EDIT_STUDY_NEWS);
            //     }}
            //   />,
            // ]}
          />
        }
        contentComponent={
          <div>
            <Row>
              <Col span={12}>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={totalPostBarChart(postData)}
                  updateArgs={[true]}
                  containerProps={{ style: { height: "100%", width: "100%" } }}
                />
              </Col>
              <Col span={12}>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={totalSubjectBarChart(
                    subjectData,
                    "SỐ LƯỢNG MÔN HỌC"
                  )}
                  updateArgs={[true]}
                  containerProps={{ style: { height: "100%", width: "100%" } }}
                />
              </Col>
              {/* <Col span={12}>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={totalAccountBarChart(accountData)}
                  updateArgs={[true]}
                  containerProps={{ style: { height: "100%", width: "100%" } }}
                />
              </Col> */}
            </Row>
          </div>
        }
      />
    </Spin>
  );
};
export default HomePage;
