import { IPortfolioItem } from "@/types";

export interface ICaseStudy {
  _id: string;
  portfolioId: IPortfolioItem;
  overview: string;
  challenge: string;
  solution: string;
  features: string[];
  technologies: string[];
  results: string;
  createdAt: string;
  updatedAt: string;
}
