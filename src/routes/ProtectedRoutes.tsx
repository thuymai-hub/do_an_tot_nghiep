import { AccountPage } from 'features/account';
import { DetailEvent, EventPage, UpdateEvent } from 'features/event_university';
import { ForumPage, UpdateForum } from 'features/forum_chat';
import { HomePage } from 'features/home';
import { DetailNews, NewsPage, UpdateNews } from 'features/news';
import { StudyDocumentPage } from 'features/study_document';
import React from 'react';
import { Navigate, Outlet, RouteObject } from 'react-router-dom';
import { CliCookieService, CLI_COOKIE_KEYS } from 'shared/services/cli-cookie';
import { PROTECTED_ROUTES_PATH } from './RoutesPath';

export const ProtectedRoutes: RouteObject[] = [
  {
    path: PROTECTED_ROUTES_PATH.HOME,
    element: <HomePage />
  },
  {
    path: PROTECTED_ROUTES_PATH.NEWS,
    element: <Outlet />,
    children: [
      {
        path: '',
        element: <NewsPage />
      },
      {
        path: 'add',
        element: <UpdateNews />
      },
      {
        path: 'edit/:id',
        element: <UpdateNews />
      },
      {
        path: 'detail/:id',
        element: <DetailNews />
      }
    ]
  },
  {
    path: PROTECTED_ROUTES_PATH.EVENTS,
    element: <Outlet />,
    children: [
      {
        path: '',
        element: <EventPage />
      },
      {
        path: 'add',
        element: <UpdateEvent />
      },
      {
        path: 'edit/:id',
        element: <UpdateEvent />
      },
      {
        path: 'detail/:id',
        element: <DetailEvent />
      }
    ]
  },
  {
    path: PROTECTED_ROUTES_PATH.FORUM,
    element: <Outlet />,
    children: [
      {
        path: '',
        element: <ForumPage />
      },
      {
        path: 'add',
        element: <UpdateForum />
      },
      {
        path: 'edit',
        element: <UpdateForum />
      }
    ]
  },
  {
    path: PROTECTED_ROUTES_PATH.STUDY_DOCUMENT,
    element: <Outlet />,
    children: [
      {
        path: '',
        element: <StudyDocumentPage />
      }
    ]
  },
  {
    path: PROTECTED_ROUTES_PATH.ACCOUNT,
    element: <Outlet />,
    children: [
      {
        path: '',
        element: <AccountPage />
      }
    ]
  },
  {
    path: PROTECTED_ROUTES_PATH.CONFIG,
    element: <StudyDocumentPage />
  }
];

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = CliCookieService.get(CLI_COOKIE_KEYS.ACCESS_TOKEN);

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};
export default ProtectedRoute;
