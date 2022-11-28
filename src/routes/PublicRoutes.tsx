import { Login } from "features/auth/pages/Login";
import ForumPagePublic from "features/web-views/page/ForumPagePublic";
import HomePagePublic from "features/web-views/page/HomePagePublic";
import PostPagePublic from "features/web-views/page/PostPagePublic";
import PostPagePublicDetail from "features/web-views/page/PostPagePublicDetail";
import { RouteObject } from "react-router-dom";
import { PUBLIC_ROUTES_PATH } from "./RoutesPath";

export const PublicRoutes: RouteObject[] = [
  {
    path: PUBLIC_ROUTES_PATH.LOGIN,
    element: <Login />,
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
];