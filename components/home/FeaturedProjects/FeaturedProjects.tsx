import { Suspense } from "react";
import { getPortfolios } from "@/services/getPortfolios";
import FeaturedProjectsLoader from "./FeaturedProjectsLoader";
import FeaturedProjectsWrapper from "./FeaturedProjectsWrapper";

export default function FeaturedProjects() {
  const portfoliosPromise = getPortfolios();

  return (
    <Suspense fallback={<FeaturedProjectsLoader />}>
      <FeaturedProjectsWrapper portfoliosPromise={portfoliosPromise} />
    </Suspense>
  );
}