import { Row } from "antd";
import React from "react";

const EmptyComp = () => {
  return (
    <Row>
      <img
        style={{ width: 50, height: 50 }}
        src="https://cdn-icons-png.flaticon.com/128/5089/5089767.png"
      />
      <p>Danh sách trống!</p>
    </Row>
  );
};

export default EmptyComp;
