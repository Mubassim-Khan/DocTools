import { Card, CardContent } from "@/components/ui/card";
import { Upload, FileCog, Loader, Download, Type, QrCode } from "lucide-react";

const features = [
  {
    name: "Document Conversion",
    steps: [
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
    ],
  },
  {
    name: "OCR (Text Extraction)",
    steps: [
      {
        icon: <Upload className="w-8 h-8 text-blue-600" />,
        title: "1. Upload PDF",
        desc: "Choose a pdf document containing text.",
      },
      {
        icon: <Type className="w-8 h-8 text-green-600" />,
        title: "2. Extract Text",
        desc: "Our OCR engine processes and extracts the text.",
      },
      {
        icon: <Download className="w-8 h-8 text-purple-600" />,
        title: "3. Copy/Download",
        desc: "Save or copy the extracted text instantly.",
      },
    ],
  },
  {
    name: "QR Code Generator",
    steps: [
      {
        icon: <Type className="w-8 h-8 text-blue-600" />,
        title: "1. Enter Data",
        desc: "Type or paste your text/URL.",
      },
      {
        icon: <QrCode className="w-8 h-8 text-green-600" />,
        title: "2. Generate Code",
        desc: "We instantly generate a QR code for you.",
      },
      {
        icon: <Download className="w-8 h-8 text-purple-600" />,
        title: "3. Download QR",
        desc: "Save the QR code as an image.",
      },
    ],
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20 bg-gradient-to-b from-white to-blue-50"
    >
      <h2 className="text-3xl font-bold text-center mb-12">
        How Our Tools Work
      </h2>

      <div className="space-y-16 container mx-auto px-4">
        {features.map((feature, i) => (
          <div key={i}>
            <h3 className="text-2xl font-semibold text-center mb-8">
              {feature.name}
            </h3>
            <div className="flex flex-wrap justify-center gap-8">
              {feature.steps.map((step, j) => (
                <Card
                  key={j}
                  className="text-center shadow-lg hover:shadow-xl transition w-64"
                >
                  <CardContent className="p-6 flex flex-col items-center">
                    <div className="mb-4">{step.icon}</div>
                    <h4 className="font-semibold text-lg mb-2">{step.title}</h4>
                    <p className="text-gray-600">{step.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
