import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      "AI-Driven Machine Vision for Quality Control and Waste Reduction | University of Rwanda × University of Malawi",
    template: "%s | UR × UNIMA Machine Vision Research",
  },
  description:
    "A research project of the University of Rwanda and the University of Malawi applying AI machine vision, IoT monitoring and predictive maintenance to small-scale food processing in Rwanda and Malawi.",
  keywords: [
    "machine vision",
    "quality control",
    "food processing",
    "Rwanda",
    "Malawi",
    "IoT",
    "YOLOv8",
    "predictive maintenance",
    "University of Rwanda",
    "University of Malawi",
  ],
};

export const viewport: Viewport = {
  themeColor: "#16263f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <SmoothScroll />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
