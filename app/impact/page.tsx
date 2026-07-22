import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ImpactContent from "@/components/ImpactContent";
import { getContent } from "@/lib/store";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Impact",
  description:
    "Expected impact and research outputs: faster inspection, less waste, safer food, lower costs, publications, datasets and new research labs in Rwanda and Malawi.",
};

export default async function ImpactPage() {
  const { impact } = await getContent();
  return (
    <>
      <PageHeader
        eyebrow={impact.headerEyebrow}
        title={impact.headerTitle}
        lead={impact.headerLead}
      />
      <ImpactContent impact={impact} />
    </>
  );
}
