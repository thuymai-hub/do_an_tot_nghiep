import { Col, Row } from "antd";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "./style.css";
import { SCREEN_WIDTH } from "shared/utils/CONSTANT";

const Header = () => {
  return (
    <div className="carousel-container">
      <div className="media-container">
        <div className="media_block">
          <div className="media_item_block">
            <img
              style={{ width: 26, height: 26 }}
              className="zoom"
              src="https://cdn-icons-png.flaticon.com/128/2504/2504903.png"
            />
          </div>
          <div className="media_item_block">
            <img
              style={{ width: 26, height: 26 }}
              className="zoom"
              src="https://cdn-icons-png.flaticon.com/128/2111/2111463.png"
            />
          </div>
          <div className="media_item_block">
            <img
              style={{ width: 26, height: 26 }}
              className="zoom"
              src="https://cdn-icons-png.flaticon.com/128/3536/3536505.png"
            />
          </div>
        </div>
        <div className="typewriter">
          <h1>Website tin tức khoa CNTT - Đại học Thủy Lợi</h1>
        </div>
        <Carousel
          autoPlay
          showIndicators={false}
          showThumbs={false}
          infiniteLoop
          transitionTime={500}
        >
          <div className="image-carousel-block">
            <img
              className="img-carousel"
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dW5pdmVyaXR5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
            />
          </div>
          <div className="image-carousel-block">
            <img
              className="img-carousel"
              src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3R1ZGVudHN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
            />
          </div>
          <div className="image-carousel-block">
            <img
              className="img-carousel"
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c3R1ZGVudHN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
            />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Header;
