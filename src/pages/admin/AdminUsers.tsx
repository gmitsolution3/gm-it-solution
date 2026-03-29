import { useState } from "react";
import { useFetch } from "@/hooks/tanstack/useFetch";
import { useDelete } from "@/hooks/tanstack/useDelete";
import { axiosInstance } from "@/lib/axios";
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
  Eye,
  MoreHorizontal,
  Calendar,
  Mail,
  User,
  Shield,
  Crown,
  Trash2,
} from "lucide-react";
import Swal from "sweetalert2";
import AdminPortfolioTableLoader from "@/components/loaders/AdminPortfolioTableLoder";
import { formatDate, getInitials } from "@/utils";

// Define the User interface (omitting __v)
interface IUser {
  _id: string;
  email: string;
  userName: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminUsers() {
  const { data, isLoading, refetch } = useFetch({
    queryKey: ["admin-users"],
    url: "/users",
  });

  // Initialize delete hook
  const deleteMutation = useDelete({
    url: "/users",
  });

  const [isMakingAdmin, setIsMakingAdmin] = useState(false);
  const users: IUser[] = data?.data || [];

  const [selectedUser, setSelectedUser] = useState<IUser | null>(
    null,
  );
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<IUser | null>(null);

  const handleViewUser = (item: IUser) => {
    setSelectedUser(item);
    setIsDetailModalOpen(true);
  };

  const handleEditUser = (item: IUser) => {
    setUserToEdit(item);
    setIsEditModalOpen(true);
  };

  const handleMakeAdmin = async (user: IUser) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Make "${user.userName}" an admin? They will have full access to the admin panel.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#232156",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make admin!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsMakingAdmin(true);
        try {
          Swal.fire({
            title: "Updating...",
            text: "Please wait",
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
              Swal.showLoading();
            },
          });

          await axiosInstance.patch(
            `/users/${user.email}/make-admin`,
          );

          Swal.fire({
            title: "Success!",
            text: `${user.userName} is now an admin.`,
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });

          refetch();
        } catch (error: any) {
          Swal.fire({
            title: "Error",
            text:
              error.response?.data?.message ||
              "Failed to make user admin",
            icon: "error",
          });
        } finally {
          setIsMakingAdmin(false);
        }
      }
    });
  };

  const handleRemoveAdmin = async (user: IUser) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Remove admin privileges from "${user.userName}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#232156",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove admin!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsMakingAdmin(true);
        try {
          Swal.fire({
            title: "Updating...",
            text: "Please wait",
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
              Swal.showLoading();
            },
          });

          await axiosInstance.patch(
            `/users/${user.email}/remove-admin`,
          );

          Swal.fire({
            title: "Success!",
            text: `Admin privileges removed from ${user.userName}.`,
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });

          refetch();
        } catch (error: any) {
          Swal.fire({
            title: "Error",
            text:
              error.response?.data?.message ||
              "Failed to remove admin privileges",
            icon: "error",
          });
        } finally {
          setIsMakingAdmin(false);
        }
      }
    });
  };

  const handleDelete = (user: IUser) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert deleting "${user.userName}"!`,
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

          await deleteMutation.mutateAsync(user.email);

          Swal.fire({
            title: "Deleted!",
            text: "User has been deleted successfully.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });

          refetch();
        } catch (error: any) {
          Swal.fire({
            title: "Error",
            text:
              error.response?.data?.message ||
              "Failed to delete user",
            icon: "error",
          });
        }
      }
    });
  };

  // Get role badge color
  const getRoleBadgeVariant = (role: string) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "default";
      case "user":
        return "secondary";
      default:
        return "outline";
    }
  };

  // Define table columns
  const columns: ColumnDef<IUser>[] = [
    {
      accessorKey: "userName",
      header: "User",
      size: 250,
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-muted">
            <AvatarFallback className="bg-primary/10 text-primary">
              {getInitials(row.original.userName)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="font-semibold truncate">
              {row.original.userName}
            </div>
            <div className="text-xs text-muted-foreground truncate flex items-center gap-1 mt-0.5">
              <Mail className="h-3 w-3" />
              {row.original.email}
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      size: 100,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {row.original.role === "admin" && (
            <Crown className="h-3.5 w-3.5 text-yellow-500" />
          )}
          <Badge
            variant={getRoleBadgeVariant(row.original.role)}
            className="capitalize"
          >
            {row.original.role}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Joined",
      size: 150,
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5 text-sm">
          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
          <span>{formatDate(row.getValue("createdAt"))}</span>
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
            onClick={() => handleViewUser(row.original)}
            disabled={deleteMutation.isPending || isMakingAdmin}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:text-white"
                disabled={deleteMutation.isPending || isMakingAdmin}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={() => handleViewUser(row.original)}
              >
                <Eye className="h-4 w-4 mr-2" />
                View details
              </DropdownMenuItem>

              {/* Role management options */}
              {row.original.role === "user" ? (
                <DropdownMenuItem
                  onSelect={() => handleMakeAdmin(row.original)}
                  className="text-primary"
                  disabled={isMakingAdmin}
                >
                  <Crown className="h-4 w-4 mr-2" />
                  Make Admin
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onSelect={() => handleRemoveAdmin(row.original)}
                  className="text-yellow-600"
                  disabled={isMakingAdmin}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Remove Admin
                </DropdownMenuItem>
              )}

              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleDelete(row.original)}
                className="text-destructive"
                disabled={deleteMutation.isPending || isMakingAdmin}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete user
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: users,
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
              Users
            </h1>
            <p className="text-sm text-muted-foreground mt-1.5">
              Manage your registered users and their roles
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="px-3 py-1 text-base">
              Total: {users.length} users
            </Badge>
          </div>
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
                          className="px-6 py-4"
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
                          <User className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">
                            No users found
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Users will appear here once they register
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
    </>
  );
}
