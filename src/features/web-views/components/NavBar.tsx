import React from "react";

const NavBar = () => {
  return (
    <div className="w3-top">
      <div className="w3-bar w3-white w3-wide w3-padding w3-card">
        <a href="/web-view" className="w3-bar-item w3-button">
          <b>Thuỷ Lợi</b> University
        </a>
        <div className="w3-right w3-hide-small">
          <a href="/web-view-post" className="w3-bar-item w3-button">
            Bài viết
          </a>
          <a href="/web-view-forum" className="w3-bar-item w3-button">
            Diễn đàn
          </a>
          <a href="/login" className="w3-bar-item w3-button">
            Cá nhân
          </a>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
