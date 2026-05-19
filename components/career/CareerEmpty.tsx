import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

export default function CareerEmpty() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      className="max-w-2xl mx-auto text-center py-20"
    >
      <div className="bg-muted/30 rounded-2xl p-12">
        <Briefcase className="w-16 h-16 mx-auto text-muted-foreground mb-4" />

        <h3 className="text-xl font-semibold mb-2">
          No Open Positions
        </h3>

        <p className="text-muted-foreground">
          There are currently no active job openings. Please check
          back later for opportunities to join our team.
        </p>
      </div>
    </motion.div>
  );
}
