import React from "react";

const Header = () => {
  return (
    <div
      className="w3-display-container w3-wide"
      style={{ maxWidth: 1500 }}
      id="home"
    >
      <img
        className="w3-image"
        src="https://vtv1.mediacdn.vn/thumb_w/650/2019/4/5/thong-tin-tuyen-sinh-dai-hoc-thuy-loi-1554466815358369773159.jpg"
        alt="Ảnh trường"
        style={{ height: 800, width: "100%" }}
      />
      <div className="w3-display-middle w3-margin-top w3-center">
        <h1 className="w3-xxlarge w3-text-white">
          <span className="w3-padding w3-black w3-opacity-min">
            <b>THUỶ LỢI</b>
          </span>{" "}
          <span className="w3-hide-small w3-text-light-grey">UNIVERSITY</span>
        </h1>
      </div>
    </div>
  );
};

export default Header;
