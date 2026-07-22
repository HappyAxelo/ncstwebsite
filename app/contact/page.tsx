import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ContactContent from "@/components/ContactContent";
import { getContent } from "@/lib/store";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact the research team at the University of Rwanda (Kigali) and the University of Malawi (Zomba).",
};

export default async function ContactPage() {
  const { contact } = await getContent();
  return (
    <>
      <PageHeader
        eyebrow={contact.headerEyebrow}
        title={contact.headerTitle}
        lead={contact.headerLead}
      />
      <ContactContent contact={contact} />
    </>
  );
}
