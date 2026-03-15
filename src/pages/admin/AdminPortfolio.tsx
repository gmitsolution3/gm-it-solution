"use client";

import { useState } from "react";
import { useFetch } from "@/hooks/tanstack/useFetch";
import { useDelete } from "@/hooks/tanstack/useDelete"; // Import the delete hook
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
import AdminPortfolioDetailModal from "@/components/modals/AdminPortfolioDetailModal";
import AdminCreatePortfolioModal from "@/components/modals/AdminCreatePortfolioModal";
import AdminEditPortfolioModal from "@/components/modals/AdminEditPortfolioModal";

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
import { Eye, MoreHorizontal, Globe, Calendar } from "lucide-react";

import Swal from "sweetalert2";
import AdminPortfolioTableLoader from "@/components/loaders/AdminPortfolioTableLoder";
import { IPortfolioItem } from "@/types";
import { formatDate } from "@/utils";

export default function AdminPortfolio() {
  const { data, isLoading, refetch } = useFetch({
    queryKey: ["portfolios"],
    url: "/portfolios",
  });

  // Initialize delete hook
  const deleteMutation = useDelete({
    url: "/portfolios",
  });

  const portfolioList: IPortfolioItem[] = data?.data || [];

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] =
    useState<IPortfolioItem | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [portfolioToEdit, setPortfolioToEdit] =
    useState<IPortfolioItem | null>(null);

  const handleViewPortfolio = (item: IPortfolioItem) => {
    setSelectedPortfolio(item);
    setIsDetailModalOpen(true);
  };

  const handleEditPortfolio = (item: IPortfolioItem) => {
    setPortfolioToEdit(item);
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
          // Show loading state
          Swal.fire({
            title: "Deleting...",
            text: "Please wait",
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
              Swal.showLoading();
            },
          });

          // Call the delete mutation
          await deleteMutation.mutateAsync(id);

          // Success message (if not already handled by the hook)
          Swal.fire({
            title: "Deleted!",
            text: "Portfolio item has been deleted successfully.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        } catch (error: any) {
          // Error message
          Swal.fire({
            title: "Error",
            text:
              error.response?.data?.message ||
              "Failed to delete portfolio item",
            icon: "error",
          });
        }
      }
    });
  };

  // Define table columns with equal sizing
  const columns: ColumnDef<IPortfolioItem>[] = [
    {
      accessorKey: "title",
      header: "Portfolio Item",
      size: 350,
      cell: ({ row }) => (
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center overflow-hidden">
            {row.original.image ? (
              <img
                src={row.original.image}
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
              <Badge
                variant="secondary"
                className="capitalize shrink-0"
              >
                {row.original.category}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground line-clamp-2">
              {row.original.description}
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "url",
      header: () => <div className="text-left">URL</div>,
      size: 200,
      cell: ({ row }) => (
        <div>
          <a
            href={row.getValue("url")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:underline group"
            onClick={(e) => e.stopPropagation()}
          >
            <Globe className="h-3 w-3 mr-1 flex-shrink-0" />
            <span className="truncate text-sm">
              {new URL(row.getValue("url")).hostname}
            </span>
          </a>
          <div className="text-xs text-muted-foreground truncate mt-0.5">
            {row.getValue("url")}
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
            onClick={() => handleViewPortfolio(row.original)}
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
                onSelect={() => handleEditPortfolio(row.original)}
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
    data: portfolioList,
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
              Portfolio
            </h1>
            <p className="text-sm text-muted-foreground mt-1.5">
              Manage your portfolio items and showcase your work
            </p>
          </div>
          <Button
            className="w-full sm:w-auto shadow-sm text-white"
            onClick={() => setIsCreateModalOpen(true)}
            disabled={deleteMutation.isPending}
          >
            Add New Item
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
                          <span className="text-2xl">🎨</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">
                            No portfolio items found
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Get started by adding your first portfolio
                            item
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          className="mt-2"
                          onClick={() => setIsCreateModalOpen(true)}
                          disabled={deleteMutation.isPending}
                        >
                          Add Portfolio Item
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
        <AdminCreatePortfolioModal
          isModalOpen={isCreateModalOpen}
          setIsModalOpen={setIsCreateModalOpen}
          onSuccess={refetch}
        />
      )}

      {isEditModalOpen && portfolioToEdit && (
        <AdminEditPortfolioModal
          isModalOpen={isEditModalOpen}
          setIsModalOpen={setIsEditModalOpen}
          portfolioData={portfolioToEdit}
          onSuccess={refetch}
        />
      )}

      {isDetailModalOpen && selectedPortfolio && (
        <AdminPortfolioDetailModal
          isModalOpen={isDetailModalOpen}
          setIsModalOpen={setIsDetailModalOpen}
          selectedPortfolio={selectedPortfolio}
        />
      )}
    </>
  );
}
