// app/admin/leadership-message/page.tsx (adjust path as needed)
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
  Video,
  User,
  Quote,
  Calendar,
} from "lucide-react";
import Swal from "sweetalert2";
import AdminPortfolioTableLoader from "@/components/loaders/AdminPortfolioTableLoder";
import { formatDate } from "@/utils";
import { ILeadershipMessage } from "@/types";
import AdminLeadershipMessageDetailModal from "@/components/modals/AdminLeadershipMessageDetailModal";
import AdminCreateLeadershipMessageModal from "@/components/modals/AdminCreateLeadershipMessageModal";
import AdminEditLeadershipMessageModal from "@/components/modals/AdminEditLeadershipMessageModal";

export default function AdminLeadershipMessage() {
  const { data, isLoading, refetch } = useFetch({
    queryKey: ["leadership-message"],
    url: "/leadership-message",
  });

  // Initialize delete hook
  const deleteMutation = useDelete({
    url: "/leadership-message",
  });

  const messages: ILeadershipMessage[] = data?.data || [];

  const [selectedMessage, setSelectedMessage] =
    useState<ILeadershipMessage | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [messageToEdit, setMessageToEdit] =
    useState<ILeadershipMessage | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleViewMessage = (item: ILeadershipMessage) => {
    setSelectedMessage(item);
    setIsDetailModalOpen(true);
  };

  const handleEditMessage = (item: ILeadershipMessage) => {
    setMessageToEdit(item);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: string, role: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert deleting this ${role} message!`,
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
            text: "Leadership message has been deleted successfully.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        } catch (error: any) {
          Swal.fire({
            title: "Error",
            text:
              error.response?.data?.message ||
              "Failed to delete leadership message",
            icon: "error",
          });
        }
      }
    });
  };

  // Define table columns
  const columns: ColumnDef<ILeadershipMessage>[] = [
    {
      accessorKey: "role",
      header: "Leadership",
      size: 250,
      cell: ({ row }) => (
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
            {row.original.image ? (
              <img
                src={row.original.image}
                alt={row.original.role}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-lg font-semibold text-primary uppercase">
                {row.original.role.charAt(0)}
              </span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-semibold capitalize truncate">
              {row.getValue("role")}
            </div>
            {row.original.quote && (
              <div className="text-sm text-muted-foreground line-clamp-2 flex items-start gap-1 mt-1">
                <Quote className="h-3 w-3 flex-shrink-0 mt-0.5" />
                <span>{row.original.quote}</span>
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "message",
      header: "Message Preview",
      size: 300,
      cell: ({ row }) => (
        <div className="line-clamp-2 text-sm">
          {row.original.message}
        </div>
      ),
    },
    {
      accessorKey: "videoUrl",
      header: "Video",
      size: 100,
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Video className="h-3 w-3 text-muted-foreground" />
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
            onClick={() => handleViewMessage(row.original)}
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
                onSelect={() => handleEditMessage(row.original)}
                className="hover:text-white!"
                disabled={deleteMutation.isPending}
              >
                Edit item
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  handleDelete(row.original._id, row.original.role)
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
    data: messages,
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
              Leadership Messages
            </h1>
            <p className="text-sm text-muted-foreground mt-1.5">
              Manage leadership messages, quotes, and videos
            </p>
          </div>
          <Button
            className="w-full sm:w-auto shadow-sm text-white"
            onClick={() => setIsCreateModalOpen(true)}
            disabled={deleteMutation.isPending}
          >
            Add New Message
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
                          <span className="text-2xl">💬</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">
                            No leadership messages found
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Get started by adding your first
                            leadership message
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          className="mt-2"
                          onClick={() => setIsCreateModalOpen(true)}
                          disabled={deleteMutation.isPending}
                        >
                          Add Message
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

      {/* Placeholder modals - to be implemented */}
      {isDetailModalOpen && selectedMessage && (
        <AdminLeadershipMessageDetailModal
          isModalOpen={isDetailModalOpen}
          setIsModalOpen={setIsDetailModalOpen}
          selectedMessage={selectedMessage}
        />
      )}

      {isCreateModalOpen && (
        <AdminCreateLeadershipMessageModal
          isModalOpen={isCreateModalOpen}
          setIsModalOpen={setIsCreateModalOpen}
          onSuccess={refetch}
        />
      )}

      {isEditModalOpen && messageToEdit && (
        <AdminEditLeadershipMessageModal
          isModalOpen={isEditModalOpen}
          setIsModalOpen={setIsEditModalOpen}
          messageData={messageToEdit}
          onSuccess={refetch}
        />
      )}
    </>
  );
}
