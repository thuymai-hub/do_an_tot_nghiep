import { Col, PageHeader, Row } from "antd";
import Container from "container/Container";
import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { IFormatData } from "../components/interface";
import { totalPostBarChart } from "../components/barChart";
import { totalAccountBarChart } from "../components/accountChart";

const data = [
  {
    name: "Giới thiệu",
    y: 40,
  },
  {
    name: "Tuyển sinh",
    y: 12,
  },
  {
    name: "Đào tạo",
    y: 56,
  },
  {
    name: "Nghiên cứu",
    y: 10,
  },
  {
    name: "Văn bản",
    y: 10,
  },
];

const data2 = [
  { name: "Giảng viên", data: [2, 4, 1, 5, 7, 2] },
  { name: "Sinh viên", data: [9, 1, 3, 4, 2, 9] },
];

const categories = [
  "14/11/2022",
  "15/11/2022",
  "16/11/2022",
  "17/11/2022",
  "18/11/2022",
  "19/11/2022",
];

const HomePage: React.FC = () => {
  const [dataSumBill, setdataSumBill] = React.useState<IFormatData[]>([]);
  return (
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
                options={totalPostBarChart(data)}
                updateArgs={[true]}
                containerProps={{ style: { height: "100%", width: "100%" } }}
              />
            </Col>
            <Col span={12}>
              <HighchartsReact
                highcharts={Highcharts}
                options={totalAccountBarChart(data2, categories)}
                updateArgs={[true]}
                containerProps={{ style: { height: "100%", width: "100%" } }}
              />
            </Col>
          </Row>
        </div>
      }
    />
  );
};
export default HomePage;
