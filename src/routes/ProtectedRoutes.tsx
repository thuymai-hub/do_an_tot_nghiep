import { AccountPage } from "features/account";
import { DetailEvent, EventPage, UpdateEvent } from "features/event_university";
import AddEditEventNews from "features/event_university/pages/AddEditEventNews";
import { ForumPage, UpdateForum } from "features/forum_chat";
import AddEditForumPost from "features/forum_chat/pages/AddEditForumPost";
import AddEditForum from "features/forum_chat/pages/AddEditForum";
import { HomePage } from "features/home";
import { DetailNews, NewsPage, UpdateNews } from "features/news";
import AddEditNews from "features/news/pages/AddEditNews";
import AddEditStudentPostPage from "features/student/AddEditStudentPostPage";
import StudentPage from "features/student/StudentPage";
import { StudyDocumentPage } from "features/study_document";
import AddEditDoc from "features/study_document/pages/AddEditDoc";
import TeacherPage from "features/teacher/TeacherPage";
import React from "react";
import { Navigate, Outlet, RouteObject } from "react-router-dom";
import { CliCookieService, CLI_COOKIE_KEYS } from "shared/services/cli-cookie";
import { PROTECTED_ROUTES_PATH } from "./RoutesPath";
import AddEditTeacherSubject from "features/teacher/AddEditTeacherSubject";
import TeacherSubjectPage from "features/teacher/TeacherSubjectPage";

export const ProtectedRoutes: RouteObject[] = [
  {
    path: PROTECTED_ROUTES_PATH.HOME,
    element: <HomePage />,
  },
  {
    path: PROTECTED_ROUTES_PATH.ADD_EDIT_TEACHER_COURSE,
    element: <AddEditTeacherSubject />,
  },
  {
    path: PROTECTED_ROUTES_PATH.TEACHER_COURSE,
    element: <TeacherSubjectPage />,
  },
  {
    path: PROTECTED_ROUTES_PATH.STUDENT,
    element: <StudentPage />,
  },
  {
    path: PROTECTED_ROUTES_PATH.ADD_EDIT_STUDENT_POST,
    element: <AddEditStudentPostPage />,
  },
  {
    path: PROTECTED_ROUTES_PATH.TEACHER,
    element: <TeacherPage />,
  },
  {
    path: PROTECTED_ROUTES_PATH.ADD_EDIT_FORUM_POST,
    element: <AddEditForumPost />,
  },
  {
    path: PROTECTED_ROUTES_PATH.ADD_EDIT_STUDY_EVENTS,
    element: <AddEditEventNews />,
  },
  // {
  //   path: PROTECTED_ROUTES_PATH.ADD_EDIT_STUDY_FOURM_POSTS,
  //   element: <AddEditForum />,
  // },
  {
    path: PROTECTED_ROUTES_PATH.ADD_EDIT_STUDY_NEWS,
    element: <AddEditNews />,
  },
  {
    path: PROTECTED_ROUTES_PATH.NEWS,
    element: <Outlet />,
    children: [
      {
        path: "",
        element: <NewsPage />,
      },
      {
        path: "add",
        element: <UpdateNews />,
      },
      {
        path: "edit/:id",
        element: <UpdateNews />,
      },
      {
        path: "detail/:id",
        element: <DetailNews />,
      },
    ],
  },
  {
    path: PROTECTED_ROUTES_PATH.EVENTS,
    element: <Outlet />,
    children: [
      {
        path: "",
        element: <EventPage />,
      },
      {
        path: "add",
        element: <UpdateEvent />,
      },
      {
        path: "edit/:id",
        element: <UpdateEvent />,
      },
      {
        path: "detail/:id",
        element: <DetailEvent />,
      },
    ],
  },
  {
    path: PROTECTED_ROUTES_PATH.FORUM,
    element: <Outlet />,
    children: [
      {
        path: "",
        element: <ForumPage />,
      },
      {
        path: "add",
        element: <UpdateForum />,
      },
      {
        path: "edit",
        element: <UpdateForum />,
      },
    ],
  },
  {
    path: PROTECTED_ROUTES_PATH.STUDY_DOCUMENT,
    element: <Outlet />,
    children: [
      {
        path: "",
        element: <StudyDocumentPage />,
      },
    ],
  },
  {
    path: PROTECTED_ROUTES_PATH.ADD_EDIT_STUDY_DOCUMENT,
    element: <AddEditDoc />,
  },
  {
    path: PROTECTED_ROUTES_PATH.ACCOUNT,
    element: <Outlet />,
    children: [
      {
        path: "",
        element: <AccountPage />,
      },
    ],
  },
  {
    path: PROTECTED_ROUTES_PATH.CONFIG,
    element: <StudyDocumentPage />,
  },
];

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = CliCookieService.get(CLI_COOKIE_KEYS.ACCESS_TOKEN);

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};
export default ProtectedRoute;
