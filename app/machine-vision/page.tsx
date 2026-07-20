import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import VisionContent from "@/components/VisionContent";

export const metadata: Metadata = {
  title: "Machine Vision",
  description:
    "How the machine vision system works: image acquisition, preprocessing, CNN feature extraction, YOLOv8 detection, classification and automated sorting of maize grain.",
};

export default function MachineVisionPage() {
  return (
    <>
      <PageHeader
        eyebrow="Machine vision"
        title="Automated grain inspection"
        lead="Cameras and neural networks check every maize grain on the line. A worker inspects about 100 kg per hour; this system inspects over 1,000 kg per hour with consistent results."
      />
      <VisionContent />
    </>
  );
}
