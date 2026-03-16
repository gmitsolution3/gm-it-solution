import { useParams, Link } from "react-router";
import { motion } from "framer-motion";
import Logo from "@/assets/logo.png";
import { useCaseStudyStore } from "@/lib/casestudy-store";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>

      <div className="text-muted-foreground leading-relaxed">
        {children}
      </div>
    </motion.section>
  );
}

// export default function CaseStudyDetail() {
//   const { id } = useParams();

//   const project = usePortfolioStore((state) =>
//     state.projects.find((p) => p.id === Number(id)),
//   );

//   const caseStudy = useCaseStudyStore((state) =>
//     state.caseStudies.find((c) => c.id === Number(id)),
//   );

//   console.log(caseStudy);

//   if (!project || !caseStudy) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-muted-foreground">Case study not found.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="pt-32 pb-20 bg-background text-foreground">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         {/* Logo */}
//         <div className="flex justify-center mb-10">
//           <Link to="/">
//             <img src={Logo} className="h-14" />
//           </Link>
//         </div>

//         {/* Title */}
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="max-w-3xl mx-auto text-center mb-12"
//         >
//           <p className="text-primary font-medium mb-2">
//             {project.category}
//           </p>

//           <h1 className="text-4xl font-bold mb-4">{project.title}</h1>

//           <p className="text-muted-foreground">
//             {project.description}
//           </p>
//         </motion.div>

//         {/* Hero Image */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.6 }}
//           className="max-w-5xl mx-auto mb-16"
//         >
//           <img
//             src={project.image}
//             alt={project.title}
//             className="rounded-xl w-full object-cover shadow-lg"
//           />
//         </motion.div>

//         {/* Content */}
//         <div className="max-w-4xl mx-auto space-y-12">
//           {/* Overview */}
//           <Section title="Overview">{caseStudy.overview}</Section>

//           {/* Challenge */}
//           <Section title="The Challenge">
//             {caseStudy.challenge}
//           </Section>

//           {/* Solution */}
//           <Section title="The Solution">{caseStudy.solution}</Section>

//           {/* Features */}
//           <Section title="Key Features">
//             <ul className="list-disc ml-6 space-y-2">
//               {caseStudy.features.map((feature, i) => (
//                 <li key={i}>{feature}</li>
//               ))}
//             </ul>
//           </Section>

//           {/* Technologies */}
//           <Section title="Technologies Used">
//             <div className="flex flex-wrap gap-3">
//               {caseStudy.technologies.map((tech, i) => (
//                 <span
//                   key={i}
//                   className="bg-muted px-3 py-1 rounded-full text-sm"
//                 >
//                   {tech}
//                 </span>
//               ))}
//             </div>
//           </Section>

//           {/* Results */}
//           <Section title="Results">{caseStudy.results}</Section>

//           {/* Visit Website */}
//           <div className="text-center pt-8">
//             <a
//               href={project.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:opacity-90 transition text-white"
//             >
//               Visit Website →
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


export default function CaseStudyDetail(){}