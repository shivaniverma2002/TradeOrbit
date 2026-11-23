import BrandMark from "@/components/auth/BrandMark";
import Container from "@/components/common/Container";
import MainNavigation from "./MainNavigation";
import MobileNavigation from "./MobileNavigation";
import SearchBar from "./SearchBar";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-950/5 bg-white/85 backdrop-blur-xl">
      <Container className="flex flex-wrap items-center gap-4 py-4 lg:flex-nowrap lg:py-5">
        <BrandMark compact />
        <SearchBar />
        <MainNavigation />
        <MobileNavigation />
      </Container>
    </header>
  );
}
