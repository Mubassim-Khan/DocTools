import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { File, Zap, Lock, QrCode } from "lucide-react";

const features = [
  {
    title: "Multiple Formats",
    desc: "Convert across PDF, DOCX, TXT, MD, and PPTX with ease.",
    icon: File,
  },
  {
    title: "Lightning Fast",
    desc: "Get your files converted in seconds, not minutes.",
    icon: Zap,
  },
  {
    title: "Secure",
    desc: "We never store your files — your privacy is protected.",
    icon: Lock,
  },
  {
    title: "QR Generator",
    desc: "Instantly turn text or links into QR codes and download as PNG.",
    icon: QrCode,
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="py-20 container mx-auto px-4 scroll-mt-20"
    >
      <h2 className="text-3xl font-bold text-center mb-12">
        Everything You Need for Effortless Document Conversion
      </h2>
      <div className="grid md:grid-cols-4 gap-8">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="relative rounded-2xl p-[2px] overflow-hidden group"
          >
            {/* Animated border */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-border-snake [background-size:300%_300%]" />

            {/* Card content */}
            <Card className="relative z-10 h-full bg-white dark:bg-gray-900 rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <item.icon className="w-5 h-5 text-blue-600" />
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}
