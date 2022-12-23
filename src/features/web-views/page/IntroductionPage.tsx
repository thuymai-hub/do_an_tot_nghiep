import { Col, Row, Spin } from "antd";
import React from "react";
import NavBar from "../components/NavBar";
import { ContentContainer } from "./DocPagePublic";
import { PageContainer } from "./HomePagePublic";

const IntroductionPage = () => {
  const [loading, setLoading] = React.useState(false);
  return (
    <Spin spinning={loading}>
      <PageContainer>
        <NavBar current={1} />
        <ContentContainer style={{ marginTop: 160 }}>
          <p
            style={{
              fontSize: 22,
              color: "#5988de",
              fontWeight: "bold",
              marginLeft: 24,
            }}
          >
            Trang chủ - Giới thiệu
          </p>
          <Row gutter={30} style={{ marginLeft: 24, marginTop: 20 }}>
            <Col
              span={4}
              style={{ borderRightColor: "#e3e3e3", borderRightWidth: 1 }}
            >
              <div>
                <p
                  style={{
                    fontSize: 18,
                    fontWeight: "600",
                    textAlign: "center",
                  }}
                >
                  Năm thành lập
                </p>
                <div style={{ marginTop: -10 }}>
                  <p
                    style={{
                      fontSize: 24,
                      fontWeight: "bold",
                      textAlign: "center",
                      color: "#4D55B7",
                    }}
                  >
                    1959
                  </p>
                </div>
              </div>
              <div>
                <p
                  style={{
                    fontSize: 18,
                    fontWeight: "600",
                    textAlign: "center",
                  }}
                >
                  Đào tạo
                </p>
                <div style={{ marginTop: -10 }}>
                  <p
                    style={{
                      fontSize: 24,
                      fontWeight: "bold",
                      textAlign: "center",
                      color: "#4D55B7",
                    }}
                  >
                    25000 +
                  </p>
                </div>
                <div style={{ marginTop: -20 }}>
                  <p style={{ textAlign: "center" }}>
                    sinh viên, học viên cao học và nghiên cứu sinh{" "}
                    <span
                      style={{
                        fontSize: 16,
                        fontWeight: "600",
                        color: "#4D55B7",
                      }}
                    >
                      65
                    </span>{" "}
                    chuyên ngành đại học,{" "}
                    <span
                      style={{
                        fontSize: 16,
                        fontWeight: "600",
                        color: "#4D55B7",
                      }}
                    >
                      47
                    </span>{" "}
                    chuyên ngành cao học,{" "}
                    <span
                      style={{
                        fontSize: 16,
                        fontWeight: "600",
                        color: "#4D55B7",
                      }}
                    >
                      32
                    </span>{" "}
                    chuyên ngành tiến sĩ{" "}
                  </p>
                </div>
              </div>
              <div>
                <p
                  style={{
                    fontSize: 18,
                    fontWeight: "600",
                    textAlign: "center",
                    paddingTop: 20,
                  }}
                >
                  Hợp tác
                </p>
                <div style={{ marginTop: -10 }}>
                  <p
                    style={{
                      fontSize: 24,
                      fontWeight: "bold",
                      textAlign: "center",
                      color: "#4D55B7",
                    }}
                  >
                    200 +
                  </p>
                </div>
                <div style={{ marginTop: -20 }}>
                  <p style={{ textAlign: "center" }}>
                    trường Đại học, Trung tâm nghiên cứu khoa học và tổ chức
                    Giáo dục của{" "}
                    <span
                      style={{
                        fontSize: 16,
                        fontWeight: "600",
                        color: "#4D55B7",
                      }}
                    >
                      24
                    </span>{" "}
                    quốc gia
                  </p>
                </div>
              </div>
            </Col>
            <Col span={1} />
            <Col span={17}>
              <Row gutter={30}>
                <Col
                  style={{ display: "flex", flexDirection: "row" }}
                  span={12}
                >
                  <div style={{ flex: 1 }}>
                    <img
                      style={{ width: 100, height: 100, borderRadius: 20 }}
                      src={
                        "https://cdn-icons-png.flaticon.com/128/741/741867.png"
                      }
                    />
                  </div>
                  <div style={{ flex: 3 }}>
                    <p style={{ fontSize: 18, fontWeight: "700" }}>
                      Bản tin nội bộ
                    </p>
                    <p>
                      BBT trân trọng kính mời Thầy,Cô, cán bộ, sinh viên Trường
                      tham gia viết bài cho Bản tin nội bộ, bài viết gửi về:{" "}
                      <strong>ccpr@tlu.edu.vn</strong>
                    </p>
                  </div>
                </Col>
                <Col
                  style={{ display: "flex", flexDirection: "row" }}
                  span={12}
                >
                  <div style={{ flex: 1 }}>
                    <img
                      style={{ width: 100, height: 100, borderRadius: 20 }}
                      src={
                        "https://cdn-icons-png.flaticon.com/128/6657/6657909.png"
                      }
                    />
                  </div>
                  <div style={{ flex: 3 }}>
                    <p style={{ fontSize: 18, fontWeight: "700" }}>
                      Hệ thống nhận diện thương hiệu
                    </p>
                    <p>
                      Các tài liệu, ấn phẩm truyền thông nhằm phục vụ công tác
                      quảng bá các hoạt động, xây dựng hình ảnh của trường
                    </p>
                  </div>
                </Col>
              </Row>
              <Row gutter={30} style={{ marginTop: 20 }}>
                <Col
                  style={{ display: "flex", flexDirection: "row" }}
                  span={12}
                >
                  <div style={{ flex: 1 }}>
                    <img
                      style={{ width: 100, height: 100, borderRadius: 20 }}
                      src={
                        "https://cdn-icons-png.flaticon.com/128/5117/5117273.png"
                      }
                    />
                  </div>
                  <div style={{ flex: 3 }}>
                    <p style={{ fontSize: 18, fontWeight: "700" }}>
                      Thư viện ảnh
                    </p>
                    <p>
                      Khám phá khung cảnh và các hình ảnh cập nhật hoạt động của
                      Đại học Thuỷ Lợi.
                    </p>
                  </div>
                </Col>
                <Col
                  style={{ display: "flex", flexDirection: "row" }}
                  span={12}
                >
                  <div style={{ flex: 1 }}>
                    <img
                      style={{ width: 100, height: 100, borderRadius: 20 }}
                      src={
                        "https://cdn-icons-png.flaticon.com/128/4674/4674918.png"
                      }
                    />
                  </div>
                  <div style={{ flex: 3 }}>
                    <p style={{ fontSize: 18, fontWeight: "700" }}>Video</p>
                    <p>
                      Các video giới thiệu về Trường Đại học Thuỷ Lợi trên kênh
                      Youtube chính thức.
                    </p>
                  </div>
                </Col>
              </Row>
              <Row gutter={30} style={{ marginTop: 40 }}>
                <Col
                  style={{ display: "flex", flexDirection: "row" }}
                  span={12}
                >
                  <div style={{ flex: 1 }}>
                    <img
                      style={{ width: 100, height: 100, borderRadius: 20 }}
                      src={
                        "https://cdn-icons-png.flaticon.com/128/2964/2964570.png"
                      }
                    />
                  </div>
                  <div style={{ flex: 3 }}>
                    <p style={{ fontSize: 18, fontWeight: "700" }}>
                      Hoạt động bên lề
                    </p>
                    <p>
                      Các giải đấu, đại hội thể thao quy mô trường với hình thức
                      đa dạng tạo sân chơi lành mành cho sinh viên.
                    </p>
                  </div>
                </Col>
                <Col
                  style={{ display: "flex", flexDirection: "row" }}
                  span={12}
                >
                  <div style={{ flex: 1 }}>
                    <img
                      style={{ width: 100, height: 100, borderRadius: 20 }}
                      src={
                        "https://cdn-icons-png.flaticon.com/128/1055/1055687.png"
                      }
                    />
                  </div>
                  <div style={{ flex: 3 }}>
                    <p style={{ fontSize: 18, fontWeight: "700" }}>Cuộc thi</p>
                    <p>
                      Các cuộc thi lập trình chất lượng cao tạo san chơi tri
                      thức cho sinh viên tham gia và cọ sát.
                    </p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </ContentContainer>
      </PageContainer>
    </Spin>
  );
};

export default IntroductionPage;
