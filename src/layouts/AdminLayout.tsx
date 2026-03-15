import { useState } from "react";
import { Outlet } from "react-router";
import { Sidebar } from "@/components/admin-dashboard/DashboardSidebar";
import { Header } from "@/components/admin-dashboard/DashboardHeader";

const AdminDashboardLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div
        className="transition-all duration-300 ease-in-out"
        style={{
          marginLeft: sidebarCollapsed
            ? "var(--sidebar-width-icon)"
            : "var(--sidebar-width)",
        }}
      >
        <Header />
        <main className="container py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
