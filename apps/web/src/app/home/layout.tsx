import { Navbar } from "@/components/navbar";
import { MobileBanner } from "@/components/mobile-banner";
import { ScrollToTop } from "@/components/scroll-to-top";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-3xl mx-auto py-12 sm:py-24 px-6 pb-24">
      <ScrollToTop />
      <MobileBanner />
      {children}
      <Navbar />
    </div>
  );
}
