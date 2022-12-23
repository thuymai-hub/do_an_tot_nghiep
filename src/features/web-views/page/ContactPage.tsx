import {
  EditOutlined,
  FileDoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Col, Input, Row, Spin } from "antd";
import React from "react";
import NavBar from "../components/NavBar";
import { ContentContainer } from "./DocPagePublic";
import { PageContainer } from "./HomePagePublic";

const data1 = [
  {
    icon: "https://cdn-icons-png.flaticon.com/128/2991/2991231.png",
    label: "Địa chỉ",
    value: "Nhà C1-114, 215, 217",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/128/2208/2208224.png",
    label: "Điện thoại",
    value: "0243. 8696099/0243.8692222",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/128/3062/3062634.png",
    label: "Email",
    value: "hcth@tlu.edu.vn",
  },
];
const data2 = [
  {
    icon: "https://cdn-icons-png.flaticon.com/128/2991/2991231.png",
    label: "Địa chỉ",
    value: "Nhà C1-212",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/128/2208/2208224.png",
    label: "Điện thoại",
    value: "04.38:69 3796, 3868 3197",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/128/3062/3062634.png",
    label: "Email",
    value: "hcth@tlu.edu.vn",
  },
];
const data3 = [
  {
    icon: "https://cdn-icons-png.flaticon.com/128/2991/2991231.png",
    label: "Địa chỉ",
    value: "P321 - Thư viện Tạ Quang Bửu",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/128/2208/2208224.png",
    label: "Điện thoại",
    value: "04.3.868 0898/ 04.3 623 1732",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/128/3062/3062634.png",
    label: "Email",
    value: " ccpr@hust.edu.vn",
  },
];

const ContactPage = () => {
  const [loading, setLoading] = React.useState(false);
  return (
    <Spin spinning={loading}>
      <PageContainer>
        <NavBar />
        <ContentContainer style={{ marginTop: 160 }}>
          <p
            style={{
              fontSize: 22,
              color: "#5988de",
              fontWeight: "bold",
              marginLeft: 24,
            }}
          >
            Trang chủ - Liên hệ
          </p>
          <div>
            <p
              style={{
                fontSize: 16,
                marginLeft: 24,
              }}
            >
              Nếu bạn cần hỗ trợ, hãy gửi thông tin vào biểu mẫu. Chúng tôi sẽ
              cố gắng phản hồi sớm nhất !
            </p>
            <Row gutter={16} style={{ marginLeft: 20 }}>
              <Col className="gutter-row" span={13}>
                <>
                  <div
                    style={{
                      paddingLeft: 20,
                      background: "#4D55B7",
                      height: 60,
                    }}
                  >
                    <p
                      style={{
                        fontSize: 16,
                        textTransform: "uppercase",
                        fontWeight: "bold",
                        lineHeight: "60px",
                        color: "white",
                      }}
                    >
                      Phòng hành chính tổng hợp
                    </p>
                  </div>
                  <div style={{ padding: "20px 10px" }}>
                    {data2.map((item: any, index: number) => (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          marginBottom: 10,
                        }}
                      >
                        <img
                          src={item?.icon}
                          style={{ width: 26, height: 26, marginRight: 16 }}
                        />
                        <p style={{ lineHeight: "26px" }}>
                          {item?.label}: {item?.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
                <>
                  <div
                    style={{
                      paddingLeft: 20,
                      background: "#4D55B7",
                      height: 60,
                    }}
                  >
                    <p
                      style={{
                        fontSize: 16,
                        textTransform: "uppercase",
                        fontWeight: "bold",
                        lineHeight: "60px",
                        color: "white",
                      }}
                    >
                      Phòng hợp tác đối ngoại
                    </p>
                  </div>
                  <div style={{ padding: "20px 10px" }}>
                    {data1.map((item: any, index: number) => (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          marginBottom: 16,
                        }}
                      >
                        <img
                          src={item?.icon}
                          style={{ width: 26, height: 26, marginRight: 16 }}
                        />
                        <p style={{ lineHeight: "26px" }}>
                          {item?.label}: {item?.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
                <>
                  <div
                    style={{
                      paddingLeft: 20,
                      background: "#4D55B7",
                      height: 60,
                    }}
                  >
                    <p
                      style={{
                        fontSize: 16,
                        textTransform: "uppercase",
                        fontWeight: "bold",
                        lineHeight: "60px",
                        color: "white",
                      }}
                    >
                      Phòng truyền thông và Quản trị thương hiệu
                    </p>
                  </div>
                  <div style={{ padding: "20px 10px" }}>
                    {data3.map((item: any, index: number) => (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          marginBottom: 16,
                        }}
                      >
                        <img
                          src={item?.icon}
                          style={{ width: 26, height: 26, marginRight: 16 }}
                        />
                        <p style={{ lineHeight: "26px" }}>
                          {item?.label}: {item?.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              </Col>
              <Col className="gutter-row" span={8}>
                <div>
                  <div
                    style={{
                      backgroundColor: "#4D55B7",
                      height: 60,
                      paddingLeft: 20,
                    }}
                  >
                    <p
                      style={{
                        color: "white",
                        lineHeight: "60px",
                        fontWeight: "600",
                        fontSize: 16,
                      }}
                    >
                      GỬI PHẢN HỒI
                    </p>
                  </div>
                  <div>
                    <Input
                      placeholder="Tiêu đề"
                      prefix={<EditOutlined />}
                      style={{ margin: "10px 0", borderRadius: 8 }}
                      allowClear
                    />
                    <Input
                      placeholder="Họ tên"
                      prefix={<UserOutlined />}
                      style={{ margin: "10px 0", borderRadius: 8 }}
                      allowClear
                    />
                    <Input
                      placeholder="Email"
                      prefix={<FileDoneOutlined />}
                      style={{ margin: "10px 0", borderRadius: 8 }}
                      allowClear
                    />
                    <Input.TextArea
                      placeholder="Nội dung"
                      rows={6}
                      allowClear
                    />
                    <Row justify={"center"}>
                      <div className="btn">
                        <p className="text">Gửi phản hồi</p>
                      </div>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </ContentContainer>
      </PageContainer>
    </Spin>
  );
};

export default ContactPage;
