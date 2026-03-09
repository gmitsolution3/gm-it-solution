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
      "GM International is a consultancy platform built to help individuals and businesses connect with opportunities in China. The website was designed to clearly present services related to education consulting, business expansion, and tourism guidance while building trust with international clients.",

    challenge:
      "The biggest challenge was presenting multiple complex services in a way that is easy to understand. The platform needed to build credibility for an international consultancy while providing clear guidance for users interested in studying, doing business, or traveling to China.",

    solution:
      "We designed a professional service-based website with clear information architecture and structured service sections. The platform focuses on simple navigation, strong branding, and optimized content presentation.",

    features: [
      "Service-focused website structure",
      "Clear consultation process",
      "Mobile-responsive design",
      "Optimized information layout",
      "Fast loading and SEO-friendly pages",
    ],

    technologies: ["React", "Tailwind CSS", "Vercel"],

    results:
      "The platform improved the company's digital presence and allowed GM International to communicate its services clearly to potential clients worldwide.",
  },

  {
    id: 2,
    overview:
      "Crab Fashion is a modern e-commerce platform designed to deliver trendy fashion products through a secure and user-friendly online store.",

    challenge:
      "The challenge was creating a scalable fashion e-commerce system capable of handling product management, payments, order processing, and delivery integration while maintaining excellent performance.",

    solution:
      "We developed a modern e-commerce architecture with optimized UI/UX, secure payment systems, and an efficient backend for product and order management.",

    features: [
      "Secure checkout system",
      "Product catalog management",
      "Order tracking system",
      "Courier integration",
      "Mobile-friendly shopping experience",
    ],

    technologies: [
      "React",
      "Node.js",
      "MongoDB",
      "Payment Gateway",
      "Courier API",
    ],

    results:
      "Crab Fashion successfully launched a secure and scalable e-commerce platform that supports online fashion retail operations.",
  },

  {
    id: 3,
    overview:
      "Naturax is an organic food e-commerce platform created to sell natural and chemical-free food products online.",

    challenge:
      "The platform needed to build trust with health-conscious consumers while providing a clean, reliable shopping experience for organic products.",

    solution:
      "We designed a clean and modern online store with strong product presentation and a reliable backend system capable of managing orders and inventory efficiently.",

    features: [
      "Organic product catalog system",
      "Secure online checkout",
      "Inventory management",
      "Customer-friendly shopping interface",
      "Mobile optimized experience",
    ],

    technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS"],

    results:
      "Naturax now provides a reliable platform for customers to purchase organic products online while allowing the business to scale its digital operations.",
  },

  {
    id: 4,
    overview:
      "SMS Digital Fashion is a full-scale fashion e-commerce platform built for selling modern fashion products online with strong performance and security.",

    challenge:
      "The main challenge was creating a high-performance fashion e-commerce platform capable of managing products, orders, and delivery systems without compromising security.",

    solution:
      "We built a scalable e-commerce system with integrated courier services, secure checkout, and fraud protection mechanisms.",

    features: [
      "Advanced order management system",
      "Secure payment processing",
      "Courier delivery integration",
      "Fraud protection mechanisms",
      "Mobile-first responsive design",
    ],

    technologies: ["React", "Node.js", "MongoDB", "Payment Gateway"],

    results:
      "The platform provides a reliable fashion e-commerce infrastructure capable of supporting business growth and online retail operations.",
  },

  {
    id: 5,
    overview:
      "Doctor Portal is a telemedicine platform that enables doctors to provide consultations online while managing patient records and appointments digitally.",

    challenge:
      "Traditional healthcare consultation requires physical visits. The goal was to simplify healthcare access through digital appointments and online consultations.",

    solution:
      "We developed a telemedicine system that allows patients to book appointments, attend video consultations, and receive prescriptions digitally.",

    features: [
      "Online appointment booking",
      "Google Meet video consultation integration",
      "bKash payment system",
      "Electronic prescription generation",
      "Automatic prescription email delivery",
    ],

    technologies: [
      "React",
      "Node.js",
      "MongoDB",
      "Google Meet API",
      "bKash API",
    ],

    results:
      "Doctor Portal allows healthcare professionals to provide digital consultations while improving accessibility for patients.",
  },

  {
    id: 6,
    overview:
      "FS Creation is a 2D animation production platform focused on creating animated content for YouTube while also providing training for aspiring animators.",

    challenge:
      "The challenge was building a digital platform that represents both a creative animation studio and an educational training institute.",

    solution:
      "We developed a visually engaging website that showcases animation services while also promoting the company's training programs.",

    features: [
      "Animation studio portfolio showcase",
      "Course promotion system",
      "Student learning information pages",
      "Creative content presentation",
    ],

    technologies: [
      "React",
      "Tailwind CSS",
      "Modern animation UI design",
    ],

    results:
      "The platform successfully represents FS Creation's animation services and helps attract students interested in learning animation.",
  },

  {
    id: 7,
    overview:
      "Yello Furniture is an e-commerce platform designed to sell home and office furniture through a modern digital store.",

    challenge:
      "Furniture e-commerce requires strong product presentation and efficient order processing due to large product variations and delivery logistics.",

    solution:
      "We developed a scalable furniture e-commerce platform with optimized product pages and integrated order management systems.",

    features: [
      "Furniture product catalog system",
      "Secure payment system",
      "Order tracking and management",
      "Courier integration",
      "Mobile optimized UI",
    ],

    technologies: ["React", "Node.js", "MongoDB", "Payment Gateway"],

    results:
      "Yello Furniture now operates a scalable digital store capable of handling furniture product sales and delivery management.",
  },

  {
    id: 8,
    overview:
      "Dr. Serjina is a medical service platform created to simplify patient interaction and appointment scheduling.",

    challenge:
      "The challenge was designing a system that allows patients to book appointments and communicate with doctors securely while maintaining a professional healthcare experience.",

    solution:
      "We built a streamlined medical portal with appointment booking, secure communication, and prescription management features.",

    features: [
      "Online appointment booking",
      "Doctor–patient communication system",
      "Electronic prescription generation",
      "Secure patient data handling",
      "Mobile responsive design",
    ],

    technologies: ["React", "Node.js", "MongoDB"],

    results:
      "The platform improves patient access to healthcare services while helping doctors manage appointments and communication efficiently.",
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
