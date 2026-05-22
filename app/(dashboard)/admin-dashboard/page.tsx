"use client";

import {
  Users,
  Package,
  GalleryVerticalEnd,
  FileStack,
  TrendingUp,
  TrendingDown,
  ClipboardCheck,
  Images,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

import { useFetch } from "@/hooks/swr/useFetch";

export default function DashboardPage() {
  const { data: userData, isLoading: userLoading } = useFetch<{ data: any[] }>(
    "/users"
  );

  const { data: servicesData, isLoading: servicesLoading } = useFetch<{ data: any[] }>(
    "/services"
  );

  const { data: teamData, isLoading: teamLoading } = useFetch<{ data: any[] }>(
    "/team-members"
  );

  const { data: jobsData, isLoading: jobsLoading } = useFetch<{ data: any[] }>(
    "/job-postings"
  );

  const servicesList = servicesData?.data || [];
  const teamMembers = teamData?.data || [];
  const jobPostings = jobsData?.data || [];
  const userList = userData?.data || [];

  const statsData = [
    {
      title: "Total Users",
      value: `${userList.length}`,
      change: userLoading ? "Loading..." : "",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Services",
      value: `${servicesList.length}`,
      change: servicesLoading ? "Loading..." : "",
      trend: "up",
      icon: Package,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Team Members",
      value: `${teamMembers.length}`,
      change: teamLoading ? "Loading..." : "",
      trend: "up",
      icon: GalleryVerticalEnd,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Job Postings",
      value: `${jobPostings.length}`,
      change: jobsLoading ? "Loading..." : "",
      trend: "up",
      icon: FileStack,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Dashboard Overview
        </h1>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, index) => (
          <Card
            key={index}
            className="transition-all duration-300 hover:shadow-lg"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`rounded-lg ${stat.bgColor} p-2`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-green-600" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-600" />
                )}
                <span
                  className={
                    stat.trend === "up"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {stat.change}
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* User List & Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* User List */}
        <Card>
          <CardHeader>
            <CardTitle>Active Users</CardTitle>
            <CardDescription>
              List of registered users
            </CardDescription>
          </CardHeader>
          <CardContent>
            {userLoading ? (
              <p className="text-sm text-muted-foreground">
                Loading users...
              </p>
            ) : userList.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No users found.
              </p>
            ) : (
              <div className="space-y-4">
                {userList.slice(0, 5).map((user: any) => {
                  const joinedDate = user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "Unknown";

                  return (
                    <div
                      key={user._id || user.id || user.email}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user.name || "Unknown"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {user.email || "No email"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Joined {joinedDate}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge
                          variant={
                            user.role === "admin"
                              ? "default"
                              : "secondary"
                          }
                          className={
                            user.role === "admin"
                              ? "bg-green-500 hover:bg-green-600"
                              : "bg-blue-500 hover:bg-blue-600"
                          }
                        >
                          {user.role || "user"}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common administrative tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="justify-start h-auto p-4 hover:text-white"
                asChild
              >
                <Link href="/admin-dashboard/services">
                  <div className="flex flex-col items-start">
                    <ClipboardCheck className="h-5 w-5 mb-2" />
                    <span className="font-medium">
                      Add New Service
                    </span>
                    <span className="text-xs">
                      Create a new service offering
                    </span>
                  </div>
                </Link>
              </Button>
              <Button
                variant="outline"
                className="justify-start h-auto p-4 hover:text-white"
                asChild
              >
                <Link href="/admin-dashboard/portfolios">
                  <div className="flex flex-col items-start">
                    <GalleryVerticalEnd className="h-5 w-5 mb-2" />
                    <span className="font-medium">Add Portfolio</span>
                    <span className="text-xs">
                      Add a new portfolio item
                    </span>
                  </div>
                </Link>
              </Button>
              <Button
                variant="outline"
                className="justify-start h-auto p-4 hover:text-white"
                asChild
              >
                <Link href="/admin-dashboard/sliders">
                  <div className="flex flex-col items-start">
                    <Images className="h-5 w-5 mb-2" />
                    <span className="font-medium">Manage Slider</span>
                    <span className="text-xs">
                      Add or edit sliders
                    </span>
                  </div>
                </Link>
              </Button>
              <Button
                variant="outline"
                className="justify-start h-auto p-4 hover:text-white"
                asChild
              >
                <Link href="/admin-dashboard/job-postings">
                  <div className="flex flex-col items-start">
                    <FileStack className="h-5 w-5 mb-2" />
                    <span className="font-medium">Job Post</span>
                    <span className="text-xs">
                      Create a new job posting
                    </span>
                  </div>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}