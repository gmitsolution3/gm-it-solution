
export interface ISalaryRange {
  min: number;
  max: number;
  currency: string;
  period: string;
}


export interface IJobPosting {
  _id: string;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  workplaceType: string;
  experienceLevel: string;
  experienceRequired: string;
  salaryRange: ISalaryRange;
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  benefits: string[];
  applicationDeadline: string;
  openings: number;
  isActive: boolean;
  contactEmail: string;
  createdAt: string;
  updatedAt: string;
}
