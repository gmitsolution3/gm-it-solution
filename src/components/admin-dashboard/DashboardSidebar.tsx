import { NavLink } from "react-router";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  Package,
  ShoppingCart,
  LogOut,
  ChevronLeft,
  ChevronRight,
  UserCircle,
  FileText,
  MessageSquare,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Link } from "react-router";

import Logo from "@/assets/logo.png";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const menuItems = [
  {
    path: "/admin-dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  { path: "/admin-dashboard/users", icon: Users, label: "Users" },
  {
    path: "/admin-dashboard/analytics",
    icon: BarChart3,
    label: "Analytics",
  },
  {
    path: "/admin-dashboard/portfolio",
    icon: Package,
    label: "Portfolios",
  },
  {
    path: "/admin-dashboard/orders",
    icon: ShoppingCart,
    label: "Orders",
  },
  {
    path: "/admin-dashboard/reports",
    icon: FileText,
    label: "Reports",
  },
  {
    path: "/admin-dashboard/messages",
    icon: MessageSquare,
    label: "Messages",
  },
  {
    path: "/admin-dashboard/settings",
    icon: Settings,
    label: "Settings",
  },
  { path: "/admin-dashboard/help", icon: HelpCircle, label: "Help" },
];

export const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className="fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out"
        style={{
          width: collapsed
            ? "var(--sidebar-width-icon)"
            : "var(--sidebar-width)",
        }}
      >
        {/* Logo Area */}
        <div className="p-4">
          <Link to="/">
            <div
              className={`${!collapsed ? "w-20" : "w-8"} rounded-lg bg-gradient-primary mx-auto`}
            >
              <img className="w-full" src={Logo} alt="Logo" />
            </div>
          </Link>
        </div>

        <Separator className="bg-sidebar-border" />

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end
                  className={({ isActive }) =>
                    `flex space-x-3 rounded-lg px-3 py-2.5 transition-all group ${
                      isActive
                        ? "bg-sidebar-primary text-white"
                        : "text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent"
                    }`
                  }
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {!collapsed && (
                    <span className="text-sm font-medium flex-1 whitespace-nowrap">
                      {item.label}
                    </span>
                  )}
                  <div className="flex space-x-3"></div>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Section - Profile & Logout */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-sidebar-border bg-sidebar p-4">
          {!collapsed ? (
            <>
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-10 w-10 border-2 border-primary/20">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    <UserCircle className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-sidebar-foreground truncate">
                    John Doe
                  </p>
                  <p className="text-xs text-sidebar-foreground/60 truncate">
                    admin@gmit.com
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Avatar className="h-9 w-9 border-2 border-primary/20 cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      JD
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>John Doe</p>
                  <p className="text-xs text-muted-foreground">
                    admin@gmit.com
                  </p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-sidebar-foreground hover:bg-sidebar-accent"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Logout</TooltipContent>
              </Tooltip>
            </div>
          )}
        </div>

        {/* Collapse Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-3 top-20 h-6 w-6 rounded-full border bg-background shadow-md hover:bg-accent"
          onClick={onToggle}
        >
          {collapsed ? (
            <ChevronRight className="h-3 w-3" />
          ) : (
            <ChevronLeft className="h-3 w-3" />
          )}
        </Button>
      </aside>
    </TooltipProvider>
  );
};
