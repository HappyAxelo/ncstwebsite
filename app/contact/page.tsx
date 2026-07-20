import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ContactContent from "@/components/ContactContent";
import { getSettings } from "@/lib/store";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact the research team at the University of Rwanda (Kigali) and the University of Malawi (Zomba).",
};

export default async function ContactPage() {
  const settings = await getSettings();
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        lead="We welcome funding agencies, government offices, universities, investors and food manufacturers."
      />
      <ContactContent email={settings.contactEmail} />
    </>
  );
}
