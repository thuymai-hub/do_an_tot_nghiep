import { Login } from "features/auth/pages/Login";
import AdmissionPage from "features/web-views/page/AdmissionPage";
import ContactPage from "features/web-views/page/ContactPage";
import DocPagePublic from "features/web-views/page/DocPagePublic";
import ForumPagePublic from "features/web-views/page/ForumPagePublic";
import HomePagePublic from "features/web-views/page/HomePagePublic";
import IntroductionPage from "features/web-views/page/IntroductionPage";
import PostPagePublic from "features/web-views/page/PostPagePublic";
import PostPagePublicDetail from "features/web-views/page/PostPagePublicDetail";
import StudentWebviewPage from "features/web-views/page/StudentWebViewPage";
import { RouteObject } from "react-router-dom";
import { PUBLIC_ROUTES_PATH } from "./RoutesPath";

export const PublicRoutes: RouteObject[] = [
  {
    path: PUBLIC_ROUTES_PATH.LOGIN,
    element: <Login />,
  },
  {
    path: PUBLIC_ROUTES_PATH.INTRODUCTION_PAGE,
    element: <IntroductionPage />,
  },
  {
    path: PUBLIC_ROUTES_PATH.CONTACT_PAGE,
    element: <ContactPage />,
  },
  {
    path: PUBLIC_ROUTES_PATH.ADMISSION_PAGE,
    element: <AdmissionPage />,
  },
  {
    path: PUBLIC_ROUTES_PATH.STUDENT_WEB_VIEW_PAGE,
    element: <StudentWebviewPage />,
  },
  {
    path: PUBLIC_ROUTES_PATH.HOMEPAGEPUBLIC,
    element: <HomePagePublic />,
  },
  {
    path: PUBLIC_ROUTES_PATH.POSTPAGEPUBLIC,
    element: <PostPagePublic />,
  },
  {
    path: PUBLIC_ROUTES_PATH.POSTPAGEPUBLIC,
    element: <PostPagePublicDetail />,
  },
  {
    path: PUBLIC_ROUTES_PATH.FORUMPAGEPUBLIC,
    element: <ForumPagePublic />,
  },
  {
    path: PUBLIC_ROUTES_PATH.DOC_PAGE_PUBLIC,
    element: <DocPagePublic />,
  },
  {
    path: PUBLIC_ROUTES_PATH.DOC_DEATIL_PAGE_PUBLIC,
    element: <DocPagePublic />,
  },
];
