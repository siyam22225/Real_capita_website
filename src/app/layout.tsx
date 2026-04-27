import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SocialSidebar from "@/components/layout/SocialSidebar";
import PublicContentProtection from "@/components/common/PublicContentProtection";
import { prisma } from "@/lib/prisma";

export const revalidate = 300;

const fallbackSeo = {
  siteTitle: "Real Capita Group",
  metaDescription: "Corporate website for Real Capita Group",
  metaKeywords: "",
  ogTitle: "Real Capita Group",
  ogDescription: "Corporate website for Real Capita Group",
  ogImage: "",
  googleVerificationCode: "",
  allowIndexing: true,
};

async function getSeoSetting() {
  try {
    const rows = await prisma.$queryRaw<
      {
        siteTitle: string;
        metaDescription: string;
        metaKeywords: string;
        ogTitle: string;
        ogDescription: string;
        ogImage: string;
        googleVerificationCode: string;
        allowIndexing: boolean;
      }[]
    >`
      SELECT
        "siteTitle",
        "metaDescription",
        "metaKeywords",
        "ogTitle",
        "ogDescription",
        "ogImage",
        "googleVerificationCode",
        "allowIndexing"
      FROM "SeoSetting"
      WHERE "id" = 'main'
      LIMIT 1
    `;

    return rows[0] || fallbackSeo;
  } catch (error) {
    console.error("ROOT_SEO_METADATA_ERROR", error);
    return fallbackSeo;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSetting();

  const title = seo.siteTitle || fallbackSeo.siteTitle;
  const description = seo.metaDescription || fallbackSeo.metaDescription;
  const ogTitle = seo.ogTitle || title;
  const ogDescription = seo.ogDescription || description;
  const keywords = seo.metaKeywords
    ? seo.metaKeywords
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    : undefined;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      images: seo.ogImage ? [seo.ogImage] : undefined,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: seo.ogImage ? [seo.ogImage] : undefined,
    },
    verification: seo.googleVerificationCode
      ? {
          google: seo.googleVerificationCode,
        }
      : undefined,
    robots: seo.allowIndexing
      ? {
          index: true,
          follow: true,
        }
      : {
          index: false,
          follow: false,
        },
  };
}

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
        <PublicContentProtection />
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