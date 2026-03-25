// app/admin/team-members/page.tsx (adjust path as needed)
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
import { Eye, MoreHorizontal, Linkedin, Mail } from "lucide-react";
import Swal from "sweetalert2";
import AdminPortfolioTableLoader from "@/components/loaders/AdminPortfolioTableLoder";
import { ITeamMember } from "@/types";
import AdminCreateTeamMemberModal from "@/components/modals/AdminCreateTeamMemberModal";
import AdminEditTeamMemberModal from "@/components/modals/AdminEditTeamMemberModal";
import AdminTeamMemberDetailModal from "@/components/modals/AdminTeamMemberDetailModal";

export default function AdminTeamMembers() {
  const { data, isLoading, refetch } = useFetch({
    queryKey: ["team-members"],
    url: "/team-members",
  });

  // Initialize delete hook
  const deleteMutation = useDelete({
    url: "/team-members",
  });

  const teamMembers: ITeamMember[] = data?.data || [];

  const [selectedMember, setSelectedMember] =
    useState<ITeamMember | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [memberToEdit, setMemberToEdit] =
    useState<ITeamMember | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleViewMember = (item: ITeamMember) => {
    setSelectedMember(item);
    setIsDetailModalOpen(true);
  };

  const handleEditMember = (item: ITeamMember) => {
    setMemberToEdit(item);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert deleting "${name}"!`,
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
            text: "Team member has been deleted successfully.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        } catch (error: any) {
          Swal.fire({
            title: "Error",
            text:
              error.response?.data?.message ||
              "Failed to delete team member",
            icon: "error",
          });
        }
      }
    });
  };

  // Define table columns
  const columns: ColumnDef<ITeamMember>[] = [
    {
      accessorKey: "name",
      header: "Team Member",
      size: 300,
      cell: ({ row }) => (
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
            {row.original.image ? (
              <img
                src={row.original.image}
                alt={row.original.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-lg font-semibold text-primary">
                {row.original.name.charAt(0)}
              </span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-semibold truncate">
              {row.getValue("name")}
            </div>
            <div className="text-sm text-muted-foreground">
              {row.original.role}
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "linkedin",
      header: "LinkedIn",
      size: 200,
      cell: ({ row }) => (
        <div>
          <a
            href={row.getValue("linkedin")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:underline group"
            onClick={(e) => e.stopPropagation()}
          >
            <Linkedin className="h-4 w-4 mr-1" />
            <span className="truncate text-sm">
              {row.getValue("linkedin")
                ? "View Profile"
                : "Not provided"}
            </span>
          </a>
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
            onClick={() => handleViewMember(row.original)}
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
                onSelect={() => handleEditMember(row.original)}
                className="hover:text-white!"
                disabled={deleteMutation.isPending}
              >
                Edit item
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  handleDelete(row.original._id, row.original.name)
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
    data: teamMembers,
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
              Team Members
            </h1>
            <p className="text-sm text-muted-foreground mt-1.5">
              Manage your team members and their profiles
            </p>
          </div>
          <Button
            className="w-full sm:w-auto shadow-sm text-white"
            onClick={() => setIsCreateModalOpen(true)}
            disabled={deleteMutation.isPending}
          >
            Add New Member
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
                          <span className="text-2xl">👥</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">
                            No team members found
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Get started by adding your first team
                            member
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          className="mt-2"
                          onClick={() => setIsCreateModalOpen(true)}
                          disabled={deleteMutation.isPending}
                        >
                          Add Team Member
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
      {isDetailModalOpen && selectedMember && (
        <AdminTeamMemberDetailModal
          isModalOpen={isDetailModalOpen}
          setIsModalOpen={setIsDetailModalOpen}
          selectedMember={selectedMember}
        />
      )}

      {isCreateModalOpen && (
        <AdminCreateTeamMemberModal
          isModalOpen={isCreateModalOpen}
          setIsModalOpen={setIsCreateModalOpen}
          onSuccess={refetch}
        />
      )}

      {isEditModalOpen && memberToEdit && (
        <AdminEditTeamMemberModal
          isModalOpen={isEditModalOpen}
          setIsModalOpen={setIsEditModalOpen}
          memberData={memberToEdit}
          onSuccess={refetch}
        />
      )}
    </>
  );
}
