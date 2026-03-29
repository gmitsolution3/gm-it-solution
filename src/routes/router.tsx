import { createBrowserRouter } from "react-router";
import RootLayout from "@/layouts/RootLayout";

import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import Services from "@/pages/Services";
import Portfolio from "@/pages/Portfolio";
import About from "@/pages/About";
import Blog from "@/pages/Blog";
import Contact from "@/pages/Contact";
import CaseStudies from "@/pages/CaseStudies";
import CaseStudyDetail from "@/pages/CaseStudyDetail";
import PrivacyAndPolicy from "@/pages/PrivacyAndPolicy";
import TermsAndConditions from "@/pages/TermsAndConditions";
import Carrier from "@/pages/Carrier";
import CarrierDetail from "@/pages/CarrierDetail";

// Admin Routes
import AdminDashboardLayout from "@/layouts/AdminLayout";
import Dashboard from "@/pages/admin/Dashboard";
import AdminPortfolio from "@/pages/admin/AdminPortfolio";
import AdminPortfolioCaseStudy from "@/pages/admin/AdminPortfolioCaseStudy";
import AdminServices from "@/pages/admin/AdminServices";
import AdminSliders from "@/pages/admin/AdminSliders";
import AdminTeamMembers from "@/pages/admin/AdminTeamMembers";
import AdminLeadershipMessage from "@/pages/admin/AdminLeadershipMessage";
import AdminBlogs from "@/pages/admin/AdminBlogs";
import BlogDetail from "@/pages/BlogDetail";
import AdminJobPosting from "@/pages/admin/AdminJobPosting";
import AdminJobApplications from "@/pages/admin/AdminJobApplications";
import Register from "@/pages/Register";
import LoginPage from "./../pages/Login";
import AdminUsers from "./../pages/admin/AdminUsers";
import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/portfolio",
        element: <Portfolio />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/blog/:id",
        element: <BlogDetail />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/case-studies",
        element: <CaseStudies />,
      },
      {
        path: "/case-studies/:id",
        element: <CaseStudyDetail />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyAndPolicy />,
      },
      {
        path: "/terms-and-conditions",
        element: <TermsAndConditions />,
      },
      {
        path: "/carrier",
        element: <Carrier />,
      },
      {
        path: "/carrier/:id",
        element: <CarrierDetail />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/admin-dashboard",
    element: (
      <AdminRoute>
        <AdminDashboardLayout />
      </AdminRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "sliders",
        element: <AdminSliders />,
      },
      {
        path: "portfolio",
        element: <AdminPortfolio />,
      },
      {
        path: "case-study",
        element: <AdminPortfolioCaseStudy />,
      },
      {
        path: "services",
        element: <AdminServices />,
      },
      {
        path: "leadership-messages",
        element: <AdminLeadershipMessage />,
      },
      {
        path: "team-members",
        element: <AdminTeamMembers />,
      },
      {
        path: "blogs",
        element: <AdminBlogs />,
      },
      {
        path: "job-postings",
        element: <AdminJobPosting />,
      },
      {
        path: "job-postings/applications/:id",
        element: <AdminJobApplications />,
      },
      {
        path: "users",
        element: <AdminUsers />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
