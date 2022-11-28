import { Login } from "features/auth/pages/Login";
import Page404 from "features/Page404";
import EventPagePublic from "features/web-views/page/EventPagePublic";
import ForumPagePublic from "features/web-views/page/ForumPagePublic";
import HomePagePublic from "features/web-views/page/HomePagePublic";
import PostPagePublic from "features/web-views/page/PostPagePublic";
import PostPagePublicDetail from "features/web-views/page/PostPagePublicDetail";
import React from "react";
import { Route, RouteObject, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "shared/container/Container";
import { magicRoutes } from "shared/utils/magicRoutes";
import ProtectedRoute, { ProtectedRoutes } from "./ProtectedRoutes";

const Body = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-screen h-screen bg-body-main flex">{children}</div>;
};

export const AppRoutes = () => {
  return (
    <Body>
      <Routes>
        {ProtectedRoutes.map((item: RouteObject) => (
          <Route
            key={item.path}
            path={item.path}
            element={
              <ProtectedRoute>
                <Container>{item.element}</Container>
              </ProtectedRoute>
            }
          >
            {item.children && magicRoutes(item.children)}
          </Route>
        ))}
        <Route path="*" element={<Page404 />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/web-view"} element={<HomePagePublic />} />
        <Route path={"/web-view-post"} element={<PostPagePublic />} />
        <Route path={"/event-view"} element={<EventPagePublic />} />
        <Route
          path={"/web-view-post-detail"}
          element={<PostPagePublicDetail />}
        />
        <Route path={"/web-view-forum"} element={<ForumPagePublic />} />
      </Routes>
    </Body>
  );
};
