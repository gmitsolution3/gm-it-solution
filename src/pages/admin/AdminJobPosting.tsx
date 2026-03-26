// app/admin/careers/page.tsx (adjust path as needed)
"use client";

import { useState } from "react";
import { useFetch } from "@/hooks/tanstack/useFetch";
import { useDelete } from "@/hooks/tanstack/useDelete";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Eye,
  MoreHorizontal,
  Calendar,
  MapPin,
  Briefcase,
  DollarSign,
  Users,
  Clock,
} from "lucide-react";
import Swal from "sweetalert2";
import AdminPortfolioTableLoader from "@/components/loaders/AdminPortfolioTableLoder";
import { formatDate, formatSalary } from "@/utils";
import { IJobPosting } from "@/types";
import AdminJobDetailModal from "@/components/modals/AdminJobDetailModal";
import AdminCreateJobModal from "@/components/modals/AdminCreateJobModal";
import AdminEditJobModal from "@/components/modals/AdminEditJobModal";
import { axiosInstance } from "@/lib/axios";
import { useNavigate } from "react-router";

export default function AdminCareers() {
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const { data, isLoading, refetch } = useFetch({
    queryKey: ["job-postings"],
    url: "/job-postings",
  });

  const deleteMutation = useDelete({
    url: "/job-postings",
  });

  const jobs: IJobPosting[] = data?.data || [];

  const [selectedJob, setSelectedJob] = useState<IJobPosting | null>(
    null,
  );
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [jobToEdit, setJobToEdit] = useState<IJobPosting | null>(
    null,
  );
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleViewJob = (item: IJobPosting) => {
    setSelectedJob(item);
    setIsDetailModalOpen(true);
  };

  const handleEditJob = (item: IJobPosting) => {
    setJobToEdit(item);
    setIsEditModalOpen(true);
  };

  const handleToggleStatus = async (job: IJobPosting) => {
    setTogglingId(job._id);

    try {
      await axiosInstance.patch(
        `/job-postings/${job._id}/toggle-status`,
      );

      refetch(); // refresh table data
    } catch (error) {
      console.error("Failed to toggle status", error);
    } finally {
      setTogglingId(null);
    }
  };

  const handleDelete = (id: string, title: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert deleting "${title}"!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#232156",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          Swal.fire({
            title: "Deleting...",
            text: "Please wait",
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
              Swal.showLoading();
            },
          });

          await deleteMutation.mutateAsync(id);

          Swal.fire({
            title: "Deleted!",
            text: "Job posting has been deleted successfully.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        } catch (error: any) {
          Swal.fire({
            title: "Error",
            text:
              error.response?.data?.message ||
              "Failed to delete job posting",
            icon: "error",
          });
        }
      }
    });
  };

  // Define table columns
  const columns: ColumnDef<IJobPosting>[] = [
    {
      accessorKey: "title",
      header: "Job Title",
      size: 300,
      cell: ({ row }) => (
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="font-semibold truncate">
              {row.getValue("title")}
            </div>
            {!row.original.isActive && (
              <Badge variant="destructive" className="text-xs">
                Inactive
              </Badge>
            )}
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            {row.original.department}
          </div>
          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {row.original.location}
            </span>
            <span className="flex items-center gap-1">
              <Briefcase className="h-3 w-3" />
              {row.original.employmentType}
            </span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "salaryRange",
      header: "Salary",
      size: 150,
      cell: ({ row }) => (
        <div>
          <div className="flex items-center gap-1 text-sm font-medium">
            <DollarSign className="h-3 w-3 text-muted-foreground" />
            {formatSalary(row.original.salaryRange)}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {row.original.experienceRequired}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "openings",
      header: "Openings",
      size: 100,
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Users className="h-3 w-3 text-muted-foreground" />
          <span>{row.original.openings}</span>
        </div>
      ),
    },
    {
      accessorKey: "applicationDeadline",
      header: "Deadline",
      size: 150,
      cell: ({ row }) => {
        const deadline = new Date(
          row.getValue("applicationDeadline"),
        );
        const isExpired = deadline < new Date();
        return (
          <div>
            <div className="flex items-center text-sm">
              <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
              <span className={isExpired ? "text-destructive" : ""}>
                {formatDate(row.getValue("applicationDeadline"))}
              </span>
            </div>
            {isExpired && (
              <Badge variant="destructive" className="text-xs mt-1">
                Expired
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "",
      size: 100,
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:text-white"
            onClick={() => handleViewJob(row.original)}
            disabled={deleteMutation.isPending}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Switch
              checked={row.original.isActive}
              disabled={togglingId === row.original._id}
              onCheckedChange={() => handleToggleStatus(row.original)}
            />

            <span className="text-sm">
              {row.original.isActive ? "Active" : "Inactive"}
            </span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:text-white"
                disabled={deleteMutation.isPending}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={() =>
                  navigate(
                    `/admin-dashboard/job-postings/applications/${row.original._id}`,
                  )
                }
                className="hover:text-white!"
                disabled={deleteMutation.isPending}
              >
                View Applications
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => handleEditJob(row.original)}
                className="hover:text-white!"
                disabled={deleteMutation.isPending}
              >
                Edit item
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  handleDelete(row.original._id, row.original.title)
                }
                className="text-destructive hover:text-white!"
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: jobs,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <AdminPortfolioTableLoader />;
  }

  return (
    <>
      <section className="container mx-auto px-5 lg:px-0 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Job Postings
            </h1>
            <p className="text-sm text-muted-foreground mt-1.5">
              Manage your career opportunities and job listings
            </p>
          </div>
          <Button
            className="w-full sm:w-auto shadow-sm text-white"
            onClick={() => setIsCreateModalOpen(true)}
            disabled={deleteMutation.isPending}
          >
            Add New Job
          </Button>
        </div>

        {/* Table */}
        <Card className="overflow-hidden border shadow-sm p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className="hover:bg-transparent"
                  >
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        style={{ width: header.getSize() }}
                        className="h-11 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className="hover:bg-muted/50 transition-colors group border-b last:border-0"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          style={{ width: cell.column.getSize() }}
                          className="px-6 py-5"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-60 text-center"
                    >
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                          <span className="text-2xl">💼</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">
                            No job postings found
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Get started by adding your first job
                            posting
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          className="mt-2"
                          onClick={() => setIsCreateModalOpen(true)}
                          disabled={deleteMutation.isPending}
                        >
                          Add Job Posting
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </section>

      {isDetailModalOpen && selectedJob && (
        <AdminJobDetailModal
          isModalOpen={isDetailModalOpen}
          setIsModalOpen={setIsDetailModalOpen}
          selectedJob={selectedJob}
        />
      )}

      {isCreateModalOpen && (
        <AdminCreateJobModal
          isModalOpen={isCreateModalOpen}
          setIsModalOpen={setIsCreateModalOpen}
          onSuccess={refetch}
        />
      )}

      {isEditModalOpen && jobToEdit && (
        <AdminEditJobModal
          isModalOpen={isEditModalOpen}
          setIsModalOpen={setIsEditModalOpen}
          jobData={jobToEdit}
          onSuccess={refetch}
        />
      )}
    </>
  );
}
