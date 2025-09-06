import { Card, CardContent } from "@/components/ui/card";
import { Upload, FileCog, Loader, Download } from "lucide-react";

const steps = [
  {
    icon: <Upload className="w-8 h-8 text-blue-600" />,
    title: "1. Upload File",
    desc: "Choose your document from your computer.",
  },
  {
    icon: <FileCog className="w-8 h-8 text-yellow-500" />,
    title: "2. Select Format",
    desc: "Pick your desired output format.",
  },
  {
    icon: <Loader className="w-8 h-8 text-green-600 animate-spin-slow" />,
    title: "3. Convert Instantly",
    desc: "We process and convert your file in seconds.",
  },
  {
    icon: <Download className="w-8 h-8 text-purple-600" />,
    title: "4. Download File",
    desc: "Get your converted document right away.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20 bg-gradient-to-b from-white to-blue-50"
    >
      <h2 className="text-3xl font-bold text-center mb-12">Follow These Quick Steps</h2>
      <div className="grid gap-8 md:grid-cols-4 container mx-auto px-4">
        {steps.map((step, i) => (
          <Card
            key={i}
            className="text-center shadow-lg hover:shadow-xl transition"
          >
            <CardContent className="p-6 flex flex-col items-center">
              <div className="mb-4">{step.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
