import { IPortfolioItem } from "@/types";
import FeaturedProjectsClient from "./FeaturedProjectsClient";

interface IProps {
  portfoliosPromise: Promise<IPortfolioItem[]>;
}

export default async function FeaturedProjectsWrapper({ portfoliosPromise }: IProps) {
  const portfolios = await portfoliosPromise;

  return <FeaturedProjectsClient portfolios={portfolios.slice(0, 4)} />;
}