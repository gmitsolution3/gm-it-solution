import { create } from "zustand";
import { persist } from "zustand/middleware";
import ProjectOne from "@/assets/project_one.png";
import ProjectTwo from "@/assets/project_two.png";
import ProjectThree from "@/assets/project_three.png";
import ProjectFour from "@/assets/project_four.png";
import ProjectFive from "@/assets/project_five.png";
import ProjectSix from "@/assets/project_six.png";
import ProjectSeven from "@/assets/project_seven.png";

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  url: string;
}

interface PortfolioState {
  projects: Project[];
  addProject: (project: Omit<Project, "id">) => void;
  updateProject: (id: number, project: Partial<Project>) => void;
  deleteProject: (id: number) => void;
}

const defaultProjects: Project[] = [
  {
    id: 1,
    title: "GM International",
    category: "Service",
    description:
      "M International is a professional service-based consultancy dedicated to helping individuals and businesses connect with opportunities in China. We provide complete guidance and end-to-end support for students, entrepreneurs, and travelers who wish to study, expand business, or explore tourism in China.",
    image: ProjectSix,
    url: "https://gminternational.live",
  },
  {
    id: 2,
    title: "Crab Fashion",
    category: "E-commerce",
    description:
      "Crab Fashion is a modern e-commerce platform dedicated to delivering trendy, high-quality fashion products with a secure and seamless shopping experience. Built with advanced technology and smart systems, Crab Fashion ensures customers shop confidently while enjoying fast delivery and smooth order management.",
    image: ProjectOne,
    url: "https://crabfashionbd.com",
  },
  {
    id: 3,
    title: "Naturax",
    category: "E-commerce",
    description:
      "Naturax is a fully functional organic food e-commerce website developed to provide a seamless and secure platform for selling chemical-free, farm-fresh food products online. The project focuses on combining clean UI/UX design with scalable backend architecture to support business growth and efficient product management.",
    image: ProjectTwo,
    url: "https://naturax.org",
  },
  {
    id: 4,
    title: "SMS Digital Fashion",
    category: "E-commerce",
    description:
      "SMS Digital Fashion is a fully functional fashion e-commerce website developed to provide a secure, scalable, and high-performance online shopping experience. The platform is designed for selling trendy fashion products while ensuring advanced fraud protection, smooth order management, and seamless courier integration.",
    image: ProjectThree,
    url: "https://digitalsmsfashion.com",
  },
  {
    id: 5,
    title: "Doctor Portal",
    category: "Service",
    description:
      "Doctor Portal is a complete e-telemedicine web application designed to digitize healthcare consultation services. The platform allows doctors to manage online appointments, conduct video consultations via Google Meet, receive secure payments through bKash, and generate electronic prescriptions that are automatically sent to patients via email.",
    image: ProjectFour,
    url: "https://gm-doctor-portal.vercel.app",
  },
  {
    id: 6,
    title: "Yello Furniture",
    category: "E-commerce",
    description:
      "Yello Furniture is a fully functional furniture e-commerce website developed to provide a seamless, secure, and scalable online shopping experience for home and office furniture products. The platform is designed with modern UI/UX principles and a powerful backend system to manage products, orders, payments, courier integration, and fraud prevention — similar in structure to advanced fashion e-commerce systems but tailored specifically for furniture retail.",
    image: ProjectFive,
    url: "https://yellowfurniture.xyz",
  },
  {
    id: 7,
    title: "Dr. Serjina",
    category: "Service",
    description:
      "Dr. Serjina is a comprehensive medical portal designed to streamline healthcare services for both patients and doctors. The platform offers features like online appointment booking, secure patient-doctor communication, and electronic prescription generation — all built with a focus on usability and security.",
    image: ProjectSeven,
    url: "https://dr-serjina.vercel.app",
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
            {
              ...project,
              id: Math.max(0, ...state.projects.map((p) => p.id)) + 1,
            },
          ],
        })),
      updateProject: (id, project) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, ...project } : p,
          ),
        })),
      deleteProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
        })),
    }),
    {
      name: "portfolio-storage",
    },
  ),
);
