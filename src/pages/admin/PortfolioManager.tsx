import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { usePortfolioStore, Project } from "@/lib/portfolio-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

const formSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters"),
    category: z.string().min(2, "Category must be at least 2 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    image: z.string().min(1, "Image is required"),
    tags: z.string().min(2, "Enter tags separated by commas"),
});

const PortfolioManager = () => {
    const { projects, addProject, updateProject, deleteProject } = usePortfolioStore();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            category: "",
            description: "",
            image: "",
            tags: "",
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const projectData: any = {
            ...values,
            tags: values.tags.split(",").map((tag) => tag.trim()),
        };


        console.log({projectData: projectData})

        if (editingProject) {
            updateProject(editingProject.id, projectData);
            toast.success("Project updated successfully");
        } else {
            addProject(projectData);
            toast.success("Project added successfully");
        }
        handleCloseDialog();
    };

    const handleEdit = (project: Project) => {
        setEditingProject(project);
        form.reset({
            title: project.title,
            category: project.category,
            description: project.description,
            image: project.image,
            tags: project.tags.join(", "),
        });
        setIsDialogOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this project?")) {
            deleteProject(id);
            toast.success("Project deleted successfully");
        }
    };

    const handlePhotoupload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // const reader = new FileReader();
            // reader.onloadend = () => {
            //     form.setValue("image", reader.result as string);
            // };
            // reader.readAsDataURL(file);

            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "gmit-digital-architects");
            formData.append("cloud_name", "dqyfwfeed");

            const response = await fetch("https://api.cloudinary.com/v1_1/dqyfwfeed/image/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            if (!response.ok) {
                console.log("UPLOAD ERROR 👉", data);
                return;
            }
            form.setValue("image", data.secure_url);

            console.log({
                data: data.secure_url
            });
        }
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setEditingProject(null);
        form.reset({
            title: "",
            category: "",
            description: "",
            image: "",
            tags: "",
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Portfolio Manager</h2>
                    <p className="text-muted-foreground">
                        Manage your portfolio projects efficiently.
                    </p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => setEditingProject(null)}>
                            <Plus className="mr-2 h-4 w-4" /> Add Project
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>
                                {editingProject ? "Edit Project" : "Add New Project"}
                            </DialogTitle>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Project Title" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Web, Mobile, Design..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="image"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Project Image</FormLabel>
                                            <FormControl>
                                                <div className="space-y-4">
                                                    <Input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => handlePhotoupload(e)}
                                                    />
                                                    {field.value && (
                                                        <div className="relative aspect-video w-full max-w-[200px] overflow-hidden rounded-lg border">
                                                            <img
                                                                src={field.value}
                                                                alt="Preview"
                                                                className="h-full w-full object-cover"
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="tags"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tags (comma separated)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="React, Node.js, ..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Project description..."
                                                    className="resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex justify-end gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleCloseDialog}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit">
                                        {editingProject ? "Update" : "Create"}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Projects</CardTitle>
                    <CardDescription>
                        A list of all projects in your portfolio.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Tags</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {projects.map((project) => (
                                <TableRow key={project.id}>
                                    <TableCell>
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="h-10 w-16 object-cover rounded"
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">{project.title}</TableCell>
                                    <TableCell>{project.category}</TableCell>
                                    <TableCell>{project.tags.join(", ")}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleEdit(project)}
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(project.id)}
                                                className="text-destructive hover:text-destructive"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default PortfolioManager;
