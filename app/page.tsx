import Logo from "./components/Logo";
import FormRoot from "./components/FormRoot";

import "./globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Header";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden w-screen">
      <Navbar />
      <FormRoot />
      <Footer />
    </main>
  );
}
