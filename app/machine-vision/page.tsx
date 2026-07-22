import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import VisionContent from "@/components/VisionContent";
import { getContent } from "@/lib/store";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Machine Vision",
  description:
    "How the machine vision system works: image acquisition, preprocessing, CNN feature extraction, YOLOv8 detection, classification and automated sorting of maize grain.",
};

export default async function MachineVisionPage() {
  const { machineVision } = await getContent();
  return (
    <>
      <PageHeader
        eyebrow={machineVision.headerEyebrow}
        title={machineVision.headerTitle}
        lead={machineVision.headerLead}
      />
      <VisionContent mv={machineVision} />
    </>
  );
}
