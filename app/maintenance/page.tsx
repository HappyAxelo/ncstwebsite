import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import MaintenanceDashboard from "@/components/MaintenanceDashboard";
import MaintenanceStory from "@/components/MaintenanceStory";
import { getContent } from "@/lib/store";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Predictive Maintenance",
  description:
    "IoT sensors and LSTM networks forecast machine failures in food processing facilities before they happen, replacing reactive repairs with planned maintenance.",
};

export default async function MaintenancePage() {
  const { maintenance } = await getContent();
  return (
    <>
      <PageHeader
        eyebrow={maintenance.headerEyebrow}
        title={maintenance.headerTitle}
        lead={maintenance.headerLead}
      />
      <MaintenanceDashboard
        eyebrow={maintenance.dashboardEyebrow}
        title={maintenance.dashboardTitle}
        lead={maintenance.dashboardLead}
      />
      <MaintenanceStory m={maintenance} />
    </>
  );
}
