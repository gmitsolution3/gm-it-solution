import { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowLeft,
  Calendar,
  Eye,
  ExternalLink,
  Mail,
  MapPin,
  DollarSign,
  MoreHorizontal,
  FileText,
  Briefcase,
  Phone,
  User,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGetById } from "@/hooks/tanstack/useGetById";
import { formatDate, formatPrice, getInitials } from "@/utils";
import JobApplicationTableLoader from "@/components/loaders/JobApplicationTableLoader";
import AdminJobApplicationModal from "@/components/modals/AdminJobApplicationDetailModal";

interface IJobApplication {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  jobId: {
    _id: string;
    title: string;
    department: string;
    location: string;
    employmentType: string;
    workplaceType: string;
    experienceLevel: string;
    experienceRequired: string;
    salaryRange: {
      min: number;
      max: number;
      currency: string;
      period: string;
    };
    openings: number;
  };
  coverLetter: string;
  portfolioUrl?: string;
  resume: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminJobApplications() {
  const { id } = useParams();
  const { data, isLoading } = useGetById({
    url: "/job-applications/job",
    id,
  });

  const jobApplications: IJobApplication[] = data?.data || [];
  const job = jobApplications[0]?.jobId;

  const [selectedApplication, setSelectedApplication] =
    useState<IJobApplication | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (application: IJobApplication) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return "";
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  const columns: ColumnDef<IJobApplication>[] = [
    {
      accessorKey: "fullName",
      header: "Applicant",
      size: 200,
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border-2 border-muted">
            <AvatarFallback className="bg-primary/10 text-primary text-sm">
              {getInitials(row.original.fullName)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="font-semibold truncate">
              {row.original.fullName}
            </div>
            <div className="text-xs text-muted-foreground truncate flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {truncateText(row.original.email, 25)}
            </div>
            <div className="text-xs text-muted-foreground truncate flex items-center gap-1 mt-0.5">
              <Phone className="h-3 w-3" />
              {row.original.phone}
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "resume",
      header: "Resume",
      size: 100,
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-xs gap-1"
          onClick={() => window.open(row.original.resume, "_blank")}
        >
          <ExternalLink className="h-3.5 w-3.5" />
          View Resume
        </Button>
      ),
    },
    {
      accessorKey: "portfolioUrl",
      header: "Portfolio",
      size: 100,
      cell: ({ row }) =>
        row.original.portfolioUrl ? (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-xs gap-1"
            onClick={() =>
              window.open(row.original.portfolioUrl, "_blank")
            }
          >
            <ExternalLink className="h-3.5 w-3.5" />
            View Portfolio
          </Button>
        ) : (
          <span className="text-xs text-muted-foreground">
            Not provided
          </span>
        ),
    },
    {
      accessorKey: "coverLetter",
      header: "Cover Letter",
      size: 250,
      cell: ({ row }) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="text-sm cursor-help line-clamp-2">
                {truncateText(row.original.coverLetter, 80)}
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-md">
              <p>{row.original.coverLetter}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Applied On",
      size: 120,
      cell: ({ row }) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1.5 text-sm cursor-help">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                <span>{formatDate(row.original.createdAt)}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Applied:{" "}
                {new Date(row.original.createdAt).toLocaleString()}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
    },
    {
      id: "actions",
      header: "",
      size: 80,
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleViewDetails(row.original)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleViewDetails(row.original)}
              >
                View details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  window.open(row.original.resume, "_blank")
                }
              >
                View resume
              </DropdownMenuItem>
              {row.original.portfolioUrl && (
                <DropdownMenuItem
                  onClick={() =>
                    window.open(row.original.portfolioUrl, "_blank")
                  }
                >
                  View portfolio
                </DropdownMenuItem>
              )}
              <DropdownMenuItem>
                <a href={`mailto:${row.original.email}`}>
                  Send email
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: jobApplications,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <JobApplicationTableLoader />;
  }

  return (
    <>
      <section className="container mx-auto px-5 lg:px-0 py-8">
        {/* Header with back button */}
        <div className="mb-6">
          <Link to="/admin-dashboard/job-posting">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Jobs
            </Button>
          </Link>
        </div>

        {/* Job Summary Card */}
        {job && (
          <Card className="mb-8 p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                  {job.title}
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  {job.department} • {job.location}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  variant="outline"
                  className="px-4 py-2 text-base"
                >
                  {jobApplications.length} Application
                  {jobApplications.length !== 1 ? "s" : ""}
                </Badge>
                <Badge className="px-4 py-2 text-base bg-green-100 text-green-700 hover:bg-green-100">
                  {job.employmentType}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div>
                <p className="text-xs text-muted-foreground">
                  Workplace
                </p>
                <p className="font-medium">{job.workplaceType}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  Experience
                </p>
                <p className="font-medium">
                  {job.experienceLevel} • {job.experienceRequired}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  Salary Range
                </p>
                <p className="font-medium">
                  {formatPrice(job.salaryRange.min)} -{" "}
                  {formatPrice(job.salaryRange.max)}/
                  {job.salaryRange.period}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  Openings
                </p>
                <p className="font-medium">{job.openings}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Applications Table */}
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
                        className="h-11 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider"
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
                      className="hover:bg-muted/50 transition-colors group border-b last:border-0 cursor-pointer"
                      onClick={() => handleViewDetails(row.original)}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          style={{ width: cell.column.getSize() }}
                          className="px-4 py-4"
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
                      className="h-96 text-center"
                    >
                      <div className="flex flex-col items-center justify-center gap-4 py-12">
                        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                          <FileText className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <div className="max-w-md">
                          <h3 className="font-semibold text-xl mb-2">
                            No Applications Yet
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            No one has applied for this position yet.
                            Share the job posting to attract
                            candidates.
                          </p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </section>

      {/* Application Detail Modal */}
      <AdminJobApplicationModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedApplication={selectedApplication}
      />
    </>
  );
}
