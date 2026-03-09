import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CaseStudy {
  id: number;
  overview: string;
  challenge: string;
  solution: string;
  features: string[];
  technologies: string[];
  results: string;
}

interface CaseStudyState {
  caseStudies: CaseStudy[];
  addCaseStudy: (study: Omit<CaseStudy, "id">) => void;
  updateCaseStudy: (id: number, study: Partial<CaseStudy>) => void;
  deleteCaseStudy: (id: number) => void;
}

const defaultCaseStudies: CaseStudy[] = [
  {
    id: 1,
    overview:
      "GM International is a consultancy platform that connects students, entrepreneurs, and travelers with opportunities in China. The platform helps users understand study programs, business opportunities, and tourism support services through a clear and structured digital experience.",

    challenge:
      "The main challenge was presenting multiple services—education consulting, business assistance, and tourism support—within one platform without confusing visitors. The website needed to communicate complex information clearly while building trust with international clients.",

    solution:
      "We designed a service-focused website with clear content hierarchy and structured sections for each type of service. The platform emphasizes clarity, credibility, and strong call-to-actions that guide users toward consultation.",

    features: [
      "Service-based website structure",
      "Clear consultation workflow",
      "Responsive mobile-friendly design",
      "Fast performance optimization",
      "Professional brand presentation",
    ],

    technologies: ["React", "Tailwind CSS", "Vercel"],

    results:
      "The platform improved GM International's credibility and allowed them to communicate their services clearly to international clients, increasing consultation inquiries.",
  },

  {
    id: 2,
    overview:
      "Crab Fashion is a modern e-commerce platform built to deliver a secure and seamless shopping experience for fashion products.",

    challenge:
      "The main challenge was building an e-commerce system capable of managing products, orders, payments, and courier integration while maintaining strong performance and security.",

    solution:
      "We developed a scalable e-commerce platform with smooth UI/UX, secure payment processing, and a powerful admin system for product and order management.",

    features: [
      "Secure checkout process",
      "Product catalog management",
      "Order and delivery tracking",
      "Mobile-friendly shopping experience",
      "Admin dashboard for store management",
    ],

    technologies: ["React", "Node.js", "MongoDB", "Payment Gateway"],

    results:
      "The platform enabled the business to sell fashion products online with a reliable and scalable e-commerce infrastructure.",
  },

  {
    id: 5,
    overview:
      "Doctor Portal is a telemedicine platform designed to digitize healthcare consultation services and allow doctors to manage appointments, prescriptions, and patient interactions online.",

    challenge:
      "Traditional healthcare consultations often require physical visits, making it difficult for patients to access doctors quickly. The challenge was to create a digital platform that simplifies consultations.",

    solution:
      "We built a telemedicine web application where patients can book appointments, attend consultations via video calls, and receive prescriptions digitally.",

    features: [
      "Online appointment booking",
      "Google Meet consultation integration",
      "bKash payment system",
      "Automatic prescription generation",
      "Email prescription delivery",
    ],

    technologies: [
      "React",
      "Node.js",
      "MongoDB",
      "Google Meet API",
      "bKash API",
    ],

    results:
      "The platform allowed doctors to conduct remote consultations while maintaining organized patient records and improving accessibility to healthcare services.",
  },
];

export const useCaseStudyStore = create<CaseStudyState>()(
  persist(
    (set) => ({
      caseStudies: defaultCaseStudies,

      addCaseStudy: (study) =>
        set((state) => ({
          caseStudies: [
            ...state.caseStudies,
            {
              ...study,
              id:
                Math.max(0, ...state.caseStudies.map((s) => s.id)) +
                1,
            },
          ],
        })),

      updateCaseStudy: (id, study) =>
        set((state) => ({
          caseStudies: state.caseStudies.map((s) =>
            s.id === id ? { ...s, ...study } : s,
          ),
        })),

      deleteCaseStudy: (id) =>
        set((state) => ({
          caseStudies: state.caseStudies.filter((s) => s.id !== id),
        })),
    }),
    {
      name: "case-study-storage",
    },
  ),
);
