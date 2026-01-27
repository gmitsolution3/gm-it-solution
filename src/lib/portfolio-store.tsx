import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Project {
    id: number;
    title: string;
    category: string;
    description: string;
    image: string;
    tags: string[];
}

interface PortfolioState {
    projects: Project[];
    addProject: (project: Omit<Project, 'id'>) => void;
    updateProject: (id: number, project: Partial<Project>) => void;
    deleteProject: (id: number) => void;
}

const defaultProjects: Project[] = [
    {
        id: 1,
        title: "FinTech Dashboard",
        category: "Web",
        description: "A comprehensive financial management platform with real-time analytics.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        tags: ["React", "Node.js", "PostgreSQL"],
    },
    {
        id: 2,
        title: "E-Commerce Mobile App",
        category: "Mobile",
        description: "Cross-platform shopping app with seamless checkout experience.",
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
        tags: ["React Native", "Firebase", "Stripe"],
    },
    {
        id: 3,
        title: "Healthcare Portal",
        category: "Design",
        description: "Patient management system with intuitive interface.",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
        tags: ["Figma", "React", "HIPAA"],
    },
    {
        id: 4,
        title: "SaaS Marketing Website",
        category: "Marketing",
        description: "High-converting landing pages that increased sign-ups by 150%.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        tags: ["Next.js", "SEO", "Analytics"],
    },
    {
        id: 5,
        title: "Real Estate Platform",
        category: "Web",
        description: "Property listing and management system with virtual tours.",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
        tags: ["React", "Node.js", "MongoDB"],
    },
    {
        id: 6,
        title: "Fitness Tracking App",
        category: "Mobile",
        description: "Health and fitness app with workout tracking and nutrition plans.",
        image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&h=600&fit=crop",
        tags: ["Flutter", "Firebase", "HealthKit"],
    },
];

export const usePortfolioStore = create<PortfolioState>()(
    persist(
        (set) => ({
            projects: defaultProjects,
            addProject: (project) =>
                set((state) => ({
                    projects: [
                        ...state.projects,
                        { ...project, id: Math.max(0, ...state.projects.map((p) => p.id)) + 1 },
                    ],
                })),
            updateProject: (id, project) =>
                set((state) => ({
                    projects: state.projects.map((p) =>
                        p.id === id ? { ...p, ...project } : p
                    ),
                })),
            deleteProject: (id) =>
                set((state) => ({
                    projects: state.projects.filter((p) => p.id !== id),
                })),
        }),
        {
            name: 'portfolio-storage',
        }
    )
);
