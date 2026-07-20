import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import MaintenanceDashboard from "@/components/MaintenanceDashboard";
import MaintenanceStory from "@/components/MaintenanceStory";

export const metadata: Metadata = {
  title: "Predictive Maintenance",
  description:
    "IoT sensors and LSTM networks forecast machine failures in food processing facilities before they happen, replacing reactive repairs with planned maintenance.",
};

export default function MaintenancePage() {
  return (
    <>
      <PageHeader
        eyebrow="Predictive maintenance"
        title="Fixing machines before they fail"
        lead="Most small facilities repair equipment only after it breaks, losing production time and raw material with every stoppage. This project uses IoT sensors and LSTM networks to forecast failures and schedule service in advance."
      />
      <MaintenanceDashboard />
      <MaintenanceStory />
    </>
  );
}
