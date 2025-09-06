import "./App.css";
import Features from "./components/Features";
import FileUploader from "./components/FileUploader";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorkts";
import Navbar from "./components/Navbar";
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
      <section id="upload" className="py-10 container mx-auto px-5 w-full bg-gradient-to-b from-blue-50 to-purple-100">
        <h2 className="text-3xl font-bold text-center mb-8">
          Convert Your Files
        </h2>
        <FileUploader />
        <QRSection />
      </section>
      <Showcase />
      <Footer />
    </>
  );
}

export default App;
