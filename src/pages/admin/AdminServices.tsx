// app/admin/services/page.tsx (adjust path as needed)
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
  Code2,
  ListChecks,
  ImageIcon,
} from "lucide-react";
import Swal from "sweetalert2";
import AdminPortfolioTableLoader from "@/components/loaders/AdminPortfolioTableLoder";
import { formatDate } from "@/utils";
import { IService } from "@/types";
import AdminCreateServiceModal from "@/components/modals/AdminCreateServiceModal";
import AdminEditServiceModal from "@/components/modals/AdminEditServiceModal";
import AdminServiceDetailModal from '@/components/modals/AdminServiceDetailModal';

export default function AdminServices() {
  const { data, isLoading, refetch } = useFetch({
    queryKey: ["services"],
    url: "/services",
  });

  // Initialize delete hook
  const deleteMutation = useDelete({
    url: "/services",
  });

  const services: IService[] = data?.data || [];

  const [selectedService, setSelectedService] =
    useState<IService | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState<IService | null>(
    null,
  );
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleViewService = (item: IService) => {
    setSelectedService(item);
    setIsDetailModalOpen(true);
  };

  const handleEditService = (item: IService) => {
    setServiceToEdit(item);
    setIsEditModalOpen(true);
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
            text: "Service has been deleted successfully.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        } catch (error: any) {
          Swal.fire({
            title: "Error",
            text:
              error.response?.data?.message ||
              "Failed to delete service",
            icon: "error",
          });
        }
      }
    });
  };

  // Define table columns
  const columns: ColumnDef<IService>[] = [
    {
      accessorKey: "title",
      header: "Service",
      size: 350,
      cell: ({ row }) => (
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center overflow-hidden">
            {row.original.icon ? (
              <img
                src={row.original.icon}
                alt={row.original.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-lg font-semibold text-primary">
                {row.original.title.charAt(0)}
              </span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="font-semibold truncate">
                {row.getValue("title")}
              </div>
              {row.original.image && (
                <Badge variant="outline" className="gap-1 text-xs">
                  <ImageIcon className="h-3 w-3" />
                  Has Image
                </Badge>
              )}
            </div>
            <div className="text-sm text-muted-foreground line-clamp-2">
              {row.original.description}
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "features",
      header: "Features",
      size: 180,
      cell: ({ row }) => (
        <div>
          <div className="flex items-center gap-1">
            <ListChecks className="h-3 w-3 text-muted-foreground" />
            <span className="text-sm">
              {row.original.features?.length || 0} features
            </span>
          </div>
          <div className="flex flex-wrap gap-1 mt-1">
            {row.original.features
              ?.slice(0, 2)
              .map((feature, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs"
                >
                  {feature.length > 15
                    ? feature.substring(0, 15) + "..."
                    : feature}
                </Badge>
              ))}
            {(row.original.features?.length || 0) > 2 && (
              <Badge variant="secondary" className="text-xs">
                +{row.original.features.length - 2}
              </Badge>
            )}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "technologies",
      header: "Technologies",
      size: 180,
      cell: ({ row }) => (
        <div>
          <div className="flex items-center gap-1">
            <Code2 className="h-3 w-3 text-muted-foreground" />
            <span className="text-sm">
              {row.original.technologies?.length || 0} tech
            </span>
          </div>
          <div className="flex flex-wrap gap-1 mt-1">
            {row.original.technologies
              ?.slice(0, 2)
              .map((tech, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs"
                >
                  {tech}
                </Badge>
              ))}
            {(row.original.technologies?.length || 0) > 2 && (
              <Badge variant="outline" className="text-xs">
                +{row.original.technologies.length - 2}
              </Badge>
            )}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      size: 150,
      cell: ({ row }) => (
        <div>
          <div className="flex items-center text-sm font-medium">
            <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
            {formatDate(row.getValue("createdAt"))}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            ID: {row.original._id.slice(-6)}
          </div>
        </div>
      ),
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
            onClick={() => handleViewService(row.original)}
            disabled={deleteMutation.isPending}
          >
            <Eye className="h-4 w-4" />
          </Button>
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
                onSelect={() => handleEditService(row.original)}
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
    data: services,
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
              Services
            </h1>
            <p className="text-sm text-muted-foreground mt-1.5">
              Manage your service offerings and showcase what you
              provide
            </p>
          </div>
          <Button
            className="w-full sm:w-auto shadow-sm text-white"
            onClick={() => setIsCreateModalOpen(true)}
            disabled={deleteMutation.isPending}
          >
            Add New Service
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
                          <span className="text-2xl">🛠️</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">
                            No services found
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Get started by adding your first service
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          className="mt-2"
                          onClick={() => setIsCreateModalOpen(true)}
                          disabled={deleteMutation.isPending}
                        >
                          Add Service
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

      {isCreateModalOpen && (
        <AdminCreateServiceModal
          isModalOpen={isCreateModalOpen}
          setIsModalOpen={setIsCreateModalOpen}
          onSuccess={refetch}
        />
      )}

      {isEditModalOpen && serviceToEdit && (
        <AdminEditServiceModal
          isModalOpen={isEditModalOpen}
          setIsModalOpen={setIsEditModalOpen}
          serviceData={serviceToEdit}
          onSuccess={refetch}
        />
      )}

      {isDetailModalOpen && selectedService && (
        <AdminServiceDetailModal
          isModalOpen={isDetailModalOpen}
          setIsModalOpen={setIsDetailModalOpen}
          selectedService={selectedService}
        />
      )}
    </>
  );
}
