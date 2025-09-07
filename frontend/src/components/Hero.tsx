import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="py-20 text-center bg-gradient-to-b from-blue-50 to-white">
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
      <Button size="lg" asChild>
        <a href="#upload">Start Converting</a>
      </Button>
    </section>
  );
}
