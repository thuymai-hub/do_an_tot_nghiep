import { Col, PageHeader, Row, Spin } from "antd";
import Container from "container/Container";
import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { IFormatData } from "../components/interface";
import { totalPostBarChart } from "../components/barChart";
import { totalAccountBarChart } from "../components/accountChart";

const HomePage: React.FC = () => {
  const [accountData, setAccountData] = React.useState<IFormatData[]>([]);
  const [postData, setPostData] = React.useState<any>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const getDataSource = () => {
    setLoading(true);
    fetch("http://localhost:8000/wp-json/wp/v2/posts?post_status=any")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("result:", result);
          const convertData = result.map((item: any) => ({
            id: item?.id,
            postType: item?.acf?.post_type,
          }));
          setPostData([
            {
              name: "Giới thiệu",
              y: convertData.filter((item: any) => item.postType === "1")
                .length,
            },
            {
              name: "Tuyển sinh",
              y: convertData.filter((item: any) => item.postType === "2")
                .length,
            },
            {
              name: "Đào tạo",
              y: convertData.filter((item: any) => item.postType === "3")
                .length,
            },
            {
              name: "Nghiên cứu",
              y: convertData.filter((item: any) => item.postType === "4")
                .length,
            },
          ]);
          setLoading(false);
        },
        (error) => {
          console.log("error", error);
          setLoading(false);
        }
      );
  };

  const getAccountData = () => {
    setLoading(true);
    fetch("http://localhost:8000/wp-json/wp/v2/accounts")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("result:", result);
          const convertData = result.map((item: any) => ({
            id: item?.id,
            accountType: item?.acf?.account_type,
          }));
          setAccountData([
            {
              name: "Quản trị viên",
              y: convertData.filter((item: any) => item.accountType === "1")
                .length,
            },
            {
              name: "Giảng viên",
              y: convertData.filter((item: any) => item.accountType === "2")
                .length,
            },
            {
              name: "Sinh viên",
              y: convertData.filter((item: any) => item.accountType === "3")
                .length,
            },
          ]);
          setLoading(false);
        },
        (error) => {
          console.log("error", error);
          setLoading(false);
        }
      );
  };

  React.useEffect(() => {
    getDataSource();
    getAccountData();
  }, []);

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
                  options={totalAccountBarChart(accountData)}
                  updateArgs={[true]}
                  containerProps={{ style: { height: "100%", width: "100%" } }}
                />
              </Col>
            </Row>
          </div>
        }
      />
    </Spin>
  );
};
export default HomePage;
