import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ImpactContent from "@/components/ImpactContent";

export const metadata: Metadata = {
  title: "Impact",
  description:
    "Expected impact and research outputs: faster inspection, less waste, safer food, lower costs, publications, datasets and new research labs in Rwanda and Malawi.",
};

export default function ImpactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Impact"
        title="What the project changes"
        lead="Better sorting means less wasted grain and safer flour. Predictive maintenance means mills keep running. The numbers below come from the project proposal and the studies it cites."
      />
      <ImpactContent />
    </>
  );
}
