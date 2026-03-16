import { Outlet } from "react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

export default function RootLayout() {
  return (
    <main>
      <Navbar />
      <Outlet />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
