"use client";

import PortfolioCard from "@/components/portfolio/PortfolioCard";
import PortfolioEmpty from "@/components/portfolio/PortfolioEmpty";
import PortfolioLoading from "@/components/portfolio/PortfolioLoading";
import { useFetch } from "@/hooks/swr/useFetch";
import { IPortfolioItem } from "@/types/portfolio.type";
import { AnimatePresence, motion } from "framer-motion";
import { memo, useMemo } from "react";

const PortfolioPage = () => {
  const { data, isLoading } = useFetch("/portfolios");

  const portfolioList = useMemo(
    () => (data?.data || []) as IPortfolioItem[],
    [data],
  );

  return (
    <>
      <section className="relative pt-36 pb-24 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[150px] rounded-full" />

          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/10 blur-[120px] rounded-full" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="max-w-3xl mx-auto"
          >
            <span className="text-primary font-semibold uppercase tracking-widest text-sm">
              Portfolio
            </span>

            <h1 className="mt-6 text-4xl md:text-5xl font-bold leading-tight">
              Crafting Digital
              <span className="block gradient-text">
                Experiences That Matter
              </span>
            </h1>

            <p className="mt-6 text-base text-muted-foreground">
              We design and build products that help brands grow,
              connect, and dominate digitally.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-28 mt-10">
        <div className="container mx-auto px-4 lg:px-8">
          {isLoading ? (
            <PortfolioLoading />
          ) : portfolioList.length === 0 ? (
            <PortfolioEmpty />
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 px-4 sm:px-0"
            >
              <AnimatePresence mode="popLayout">
                {portfolioList.map((project, index) => (
                  <PortfolioCard
                    key={project._id}
                    project={project}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
};

export default memo(PortfolioPage);
