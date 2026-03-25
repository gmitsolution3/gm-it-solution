"use client";

import { motion } from "framer-motion";
import { CTASection } from "@/components/home/CTASection";
import AboutChairmanSection from "./../components/About/AboutChairmanSection";
import AboutCeoSection from "./../components/About/AboutCeoSection";
import AboutTeamMembersSection from "./../components/About/AboutTeamMembersSection";
import { useFetch } from "@/hooks/tanstack/useFetch";
import AboutLoader from "./../components/loaders/AboutLoader";

const About = () => {
  const {
    data: teamMembersData,
    isLoading: isLoadingTeamMembers,
    error: teamMembersError,
  } = useFetch({
    queryKey: ["team-members"],
    url: "/team-members",
  });

  const {
    data: leadershipMessageData,
    isLoading: isLoadingLeadership,
    error: leadershipError,
  } = useFetch({
    queryKey: ["leadership-message"],
    url: "/leadership-message",
  });

  const isLoading = isLoadingTeamMembers || isLoadingLeadership;

  const hasError = teamMembersError || leadershipError;

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Content
          </h2>
          <p className="text-muted-foreground">
            {teamMembersError?.message ||
              leadershipError?.message ||
              "Failed to load data. Please try again later."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <AboutLoader />;
  }

  const chairmanLeadershipMessage = leadershipMessageData?.data.find(
    (leader: any) => leader.role === "chairman",
  );
  const ceoLeadershipMessage = leadershipMessageData?.data.find(
    (leader: any) => leader.role === "ceo",
  );

  return (
    <>
      {/* Hero Section - Responsive */}
      <section className="pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-16 sm:pb-20 md:pb-24 lg:pb-28 bg-gradient-to-b from-background to-muted/30 text-center relative overflow-hidden">
        {/* Background Decorative Elements - Hidden on mobile */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-48 sm:w-56 md:w-64 lg:w-72 h-48 sm:h-56 md:h-64 lg:h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-48 sm:w-56 md:w-64 lg:w-72 h-48 sm:h-56 md:h-64 lg:h-72 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="uppercase tracking-widest text-xs sm:text-sm text-primary font-medium mb-3 sm:mb-4">
              Who We Are
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4 sm:mb-5 md:mb-6 px-4 sm:px-0">
              Driving Digital Transformation at <br />
              <span className="text-primary block sm:inline">
                Global Scale
              </span>
            </h1>

            <div className="w-16 sm:w-20 md:w-24 h-1 bg-primary mx-auto mb-6 sm:mb-7 md:mb-8 rounded-full" />

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto px-4 sm:px-6 md:px-0">
              GM IT Solution is a leadership-driven technology firm
              delivering scalable, secure, and future-ready digital
              ecosystems for modern enterprises worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Chairman Section - Responsive */}
      <AboutChairmanSection
        leadershipData={chairmanLeadershipMessage}
      />

      {/* CEO Section - Responsive */}
      <AboutCeoSection leadershipData={ceoLeadershipMessage} />

      {/* Team Section - Responsive */}
      <AboutTeamMembersSection teamMembers={teamMembersData?.data} />

      <CTASection />
    </>
  );
};

export default About;
