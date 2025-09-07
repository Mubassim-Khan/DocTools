import "./App.css";
import Features from "./components/Features";
import FileUploader from "./components/FileUploader";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorkts";
import Navbar from "./components/Navbar";
import OCR from "./components/OCR";
import QRSection from "./components/QRSection";
import Showcase from "./components/Showcase";
import { ToasterProvider } from "./components/ToastProvider";

function App() {
  return (
    <>
      <ToasterProvider />
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <section id="upload" className="py-10 w-full bg-gradient-to-b from-blue-50 via-purple-100 to-gray-100">
        <FileUploader />
        <QRSection />
        <OCR />
      </section>
      <Showcase />
      <Footer />
    </>
  );
}

export default App;
