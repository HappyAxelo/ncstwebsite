import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import TeamContent from "@/components/TeamContent";
import { getCollaborators, getPartners, getContent } from "@/lib/store";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Team",
  description:
    "Principal investigators and co-investigators from the University of Rwanda and the University of Malawi, with industry and international partners.",
};

export default async function TeamPage() {
  const [collaborators, partnerList, content] = await Promise.all([
    getCollaborators(),
    getPartners(),
    getContent(),
  ]);
  return (
    <>
      <PageHeader
        eyebrow={content.team.headerEyebrow}
        title={content.team.headerTitle}
        lead={content.team.headerLead}
      />
      <TeamContent
        collaborators={collaborators}
        partners={partnerList}
        team={content.team}
      />
    </>
  );
}
