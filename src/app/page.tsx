import CTASelectionLP from "@/shared/ui/components/atoms/CTASelectionLP";
import FeatureSelectionLP from "@/shared/ui/components/atoms/FeatureSelectionLP";
import Footer from "@/shared/ui/components/atoms/Footer";
import HeroSectionLP from "@/shared/ui/components/atoms/HeroSectionLP";
import NavbarLP from "@/shared/ui/components/atoms/NavbarLP";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Navbar */}
      <NavbarLP />

      {/* Hero Section */}
      <HeroSectionLP />

      {/* Features Section */}
      <FeatureSelectionLP />

      {/* CTA Section */}
      <CTASelectionLP />

      {/* Footer */}
      <Footer />
    </main>
  );
}
