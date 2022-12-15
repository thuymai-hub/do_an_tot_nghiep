import LocalStorage from "apis/LocalStorage";
import { Login } from "features/auth/pages/Login";
import Page404 from "features/Page404";
import DocDetailPublic from "features/web-views/page/DocDetailPublic";
import DocPagePublic from "features/web-views/page/DocPagePublic";
import EventPagePublic from "features/web-views/page/EventPagePublic";
import ForumPagePublic from "features/web-views/page/ForumPagePublic";
import HomePagePublic from "features/web-views/page/HomePagePublic";
import PostPagePublic from "features/web-views/page/PostPagePublic";
import PostPagePublicDetail from "features/web-views/page/PostPagePublicDetail";
import StudentWebviewPage from "features/web-views/page/StudentWebViewPage";
import React from "react";
import { useDispatch } from "react-redux";
import { Route, RouteObject, Routes, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { getMe } from "redux/slice/user.slice";
import { Container } from "shared/container/Container";
import { magicRoutes } from "shared/utils/magicRoutes";
import ProtectedRoute, { ProtectedRoutes } from "./ProtectedRoutes";
import { PROTECTED_ROUTES_PATH } from "./RoutesPath";

const Body = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-screen h-screen bg-body-main flex">{children}</div>;
};

export const AppRoutes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // React.useLayoutEffect(() => {
  //   if (LocalStorage.getToken()) {
  //     dispatch(getMe());
  //     navigate(PROTECTED_ROUTES_PATH.HOME);
  //   }
  // }, []);

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
        <Route path={"/web-doc-page"} element={<DocPagePublic />} />
        <Route
          path={"/web-view-student-page"}
          element={<StudentWebviewPage />}
        />
        <Route
          path={"/web-view-post-detail"}
          element={<PostPagePublicDetail />}
        />
        <Route path={"/web-view-forum"} element={<ForumPagePublic />} />
        <Route path={"/web-doc-detail-page"} element={<DocDetailPublic />} />
      </Routes>
    </Body>
  );
};
