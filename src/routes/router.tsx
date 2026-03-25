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

// Admin Routes
import AdminDashboardLayout from "@/layouts/AdminLayout";
import Dashboard from "@/pages/admin/Dashboard";
import AdminPortfolio from "@/pages/admin/AdminPortfolio";
import AdminPortfolioCaseStudy from "@/pages/admin/AdminPortfolioCaseStudy";
import AdminServices from "@/pages/admin/AdminServices";
import AdminSliders from "@/pages/admin/AdminSliders";
import AdminTeamMembers from "@/pages/admin/AdminTeamMembers";
import AdminLeadershipMessage from "@/pages/admin/AdminLeadershipMessage";
import AdminBlogs from '@/pages/admin/AdminBlogs';

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
    ],
  },
  {
    path: "/admin-dashboard",
    element: <AdminDashboardLayout />,
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
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
