import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import TeamContent from "@/components/TeamContent";
import { getCollaborators, getPartners } from "@/lib/store";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Team",
  description:
    "Principal investigators and co-investigators from the University of Rwanda and the University of Malawi, with industry and international partners.",
};

export default async function TeamPage() {
  const [collaborators, partnerList] = await Promise.all([
    getCollaborators(),
    getPartners(),
  ]);
  return (
    <>
      <PageHeader
        eyebrow="Team"
        title="The people behind the project"
        lead="Led by the University of Rwanda with the University of Malawi, supported by industry partners, international institutions and government agencies."
      />
      <TeamContent collaborators={collaborators} partners={partnerList} />
    </>
  );
}
