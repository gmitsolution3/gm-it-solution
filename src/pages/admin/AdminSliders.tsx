// app/admin/sliders/page.tsx (adjust path as needed)
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
  ImageIcon,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import Swal from "sweetalert2";
import AdminPortfolioTableLoader from "@/components/loaders/AdminPortfolioTableLoder";
import { formatDate } from "@/utils";
import AdminCreateSliderModal from "@/components/modals/AdminCreateSliderModal";
import { ISlider } from "@/types";
import AdminEditSliderModal from "@/components/modals/AdminEditSliderModal";
import AdminSliderDetailModal from "@/components/modals/AdminSliderDetailModal";

export default function AdminSliders() {
  const { data, isLoading, refetch } = useFetch({
    queryKey: ["sliders"],
    url: "/sliders",
  });

  // Initialize delete hook
  const deleteMutation = useDelete({
    url: "/sliders",
  });

  const sliders: ISlider[] = data?.data || [];

  const [selectedSlider, setSelectedSlider] =
    useState<ISlider | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [sliderToEdit, setSliderToEdit] = useState<ISlider | null>(
    null,
  );
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleViewSlider = (item: ISlider) => {
    setSelectedSlider(item);
    setIsDetailModalOpen(true);
  };

  const handleEditSlider = (item: ISlider) => {
    setSliderToEdit(item);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: string, title: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert deleting "${title}" slider!`,
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
            text: "Slider has been deleted successfully.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        } catch (error: any) {
          Swal.fire({
            title: "Error",
            text:
              error.response?.data?.message ||
              "Failed to delete slider",
            icon: "error",
          });
        }
      }
    });
  };

  // Define table columns
  const columns: ColumnDef<ISlider>[] = [
    {
      accessorKey: "title",
      header: "Slider",
      size: 350,
      cell: ({ row }) => (
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-16 h-12 rounded-lg bg-primary/10 flex items-center justify-center overflow-hidden">
            {row.original.image ? (
              <img
                src={row.original.image}
                alt={row.original.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/64x48?text=Image";
                }}
              />
            ) : (
              <span className="text-lg font-semibold text-primary">
                {row.original.title.charAt(0)}
              </span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-semibold truncate">
              {row.getValue("title")}
            </div>
            <div className="text-sm text-muted-foreground line-clamp-2">
              {row.original.description}
            </div>
            {row.original.highlight && (
              <Badge variant="outline" className="mt-1 text-xs">
                Highlight: {row.original.highlight}
              </Badge>
            )}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "ctaPrimary",
      header: "Call to Action",
      size: 200,
      cell: ({ row }) => (
        <div>
          <div className="flex items-center gap-2">
            <ArrowRight className="h-3 w-3 text-muted-foreground" />
            <span className="text-sm font-medium">
              {row.original.ctaPrimary}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <MessageCircle className="h-3 w-3 text-muted-foreground" />
            <span className="text-sm">
              {row.original.ctaSecondary}
            </span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "image",
      header: "Image",
      size: 100,
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <ImageIcon className="h-3 w-3 text-muted-foreground" />
          <span className="text-sm">Available</span>
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
            onClick={() => handleViewSlider(row.original)}
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
                onSelect={() => handleEditSlider(row.original)}
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
    data: sliders,
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
              Hero Sliders
            </h1>
            <p className="text-sm text-muted-foreground mt-1.5">
              Manage your homepage hero sliders and banners
            </p>
          </div>
          <Button
            className="w-full sm:w-auto shadow-sm text-white"
            onClick={() => setIsCreateModalOpen(true)}
            disabled={deleteMutation.isPending}
          >
            Add New Slider
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
                          <span className="text-2xl">🎯</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">
                            No sliders found
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Get started by adding your first hero
                            slider
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          className="mt-2"
                          onClick={() => setIsCreateModalOpen(true)}
                          disabled={deleteMutation.isPending}
                        >
                          Add Slider
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
        <AdminCreateSliderModal
          isModalOpen={isCreateModalOpen}
          setIsModalOpen={setIsCreateModalOpen}
          onSuccess={refetch}
        />
      )}

      {isEditModalOpen && sliderToEdit && (
        <AdminEditSliderModal
          isModalOpen={isEditModalOpen}
          setIsModalOpen={setIsEditModalOpen}
          sliderData={sliderToEdit}
          onSuccess={refetch}
        />
      )}

      {isDetailModalOpen && selectedSlider && (
        <AdminSliderDetailModal
          isModalOpen={isDetailModalOpen}
          setIsModalOpen={setIsDetailModalOpen}
          selectedSlider={selectedSlider}
        />
      )}
    </>
  );
}
