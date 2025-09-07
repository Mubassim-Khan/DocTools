import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="py-20 text-center bg-gradient-to-b from-blue-100 to-white">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        Convert Documents Seamlessly
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
        Upload and convert between{" "}
        <span className="font-semibold">PDF, DOCX, TXT, MD, and PPTX</span> in
        seconds. <br />
        Plus, unlock extra tools with{" "}
        <span className="font-semibold">OCR text extraction</span> and{" "}
        <span className="font-semibold">QR code generation</span>. <br />
        Simple. Fast. Reliable.
      </p>
      
      <div className="flex justify-center gap-4">
        <Button size="lg" asChild>
          <a href="#upload">Start Converting</a>
        </Button>

        <Button
          size="lg"
          variant="secondary"
          className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
          asChild
        >
          <a href="#ocr">
            <Sparkles className="w-5 h-5" />
            Try OCR
          </a>
        </Button>
      </div>
    </section>
  );
}
