import CaseStudyDetailClient from "./CaseStudyDetailClient";

type CaseStudyDetailProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CaseStudyDetail({
  params,
}: CaseStudyDetailProps) {
  const { id } = await params;

  return <CaseStudyDetailClient id={id} />;
}
