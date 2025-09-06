import "./App.css";
import Features from "./components/Features";
import FileUploader from "./components/FileUploader";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorkts";
import Navbar from "./components/Navbar";
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
      <section id="upload" className="py-20 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Convert Your Files
        </h2>
        <FileUploader />
      </section>
      <Showcase />
      <Footer />
    </>
  );
}

export default App;
