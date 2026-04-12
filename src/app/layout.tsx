import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SocialSidebar from "@/components/layout/SocialSidebar";

export const metadata: Metadata = {
  title: "Real Capita Group",
  description: "Corporate website for Real Capita Group",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
  <body
  style={{
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #e8f8ff 0%, #dff4ff 45%, #ecfff4 100%)",
  }}
>
  <Header />
  <SocialSidebar />
  <main
    style={{
      minHeight: "100vh",
      background: "transparent",
    }}
  >
    {children}
  </main>
  <Footer />
</body>
    </html>
  );
}