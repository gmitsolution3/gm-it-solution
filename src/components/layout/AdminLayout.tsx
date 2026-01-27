import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarRail, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Settings, LogOut, Home, FolderGit2 } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";

const AdminLayout = () => {
    const location = useLocation();

    const menuItems = [
        {
            title: "Dashboard",
            url: "/admin/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Portfolio",
            url: "/admin/portfolio",
            icon: FolderGit2,
        },
        {
            title: "Users",
            url: "/admin/users",
            icon: Users,
        },
        {
            title: "Settings",
            url: "/admin/settings",
            icon: Settings,
        },
    ];

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                <Sidebar collapsible="icon">
                    <SidebarHeader>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton size="lg" asChild>
                                    <Link to="/">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                            <Home className="h-4 w-4" />
                                        </div>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-semibold">GM IT</span>
                                            <span className="truncate text-xs">Digital Architects</span>
                                        </div>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupLabel>Admin</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {menuItems.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild isActive={location.pathname === item.url} tooltip={item.title}>
                                                <Link to={item.url}>
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                    <SidebarFooter>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton tooltip="Logout">
                                    <LogOut />
                                    <span>Logout</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarFooter>
                    <SidebarRail />
                </Sidebar>
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                        <SidebarTrigger className="-ml-1" />
                        <div className="h-4 w-px bg-border sm:block hidden" />
                        <div className="flex-1" />
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium">Admin User</span>
                            <div className="h-8 w-8 rounded-full bg-muted/50" />
                        </div>
                    </header>
                    <main className="flex-1 p-6">
                        <Outlet />
                    </main>
                </SidebarInset>
            </div>
            <Toaster />
        </SidebarProvider>
    );
};

export default AdminLayout;
