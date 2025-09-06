"use client";

import { useState, useRef } from "react";
import QRCode from "react-qr-code";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, QrCode } from "lucide-react";

export default function QRGenerator() {
  const [text, setText] = useState("");
  const qrRef = useRef<SVGSVGElement | null>(null);

  const downloadQR = () => {
    if (!qrRef.current) return;

    const svg = qrRef.current;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);

    // Convert SVG → PNG
    const img = new Image();
    img.src = "data:image/svg+xml;base64," + btoa(source);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0);
      const pngUrl = canvas.toDataURL("image/png");

      // Trigger download
      const link = document.createElement("a");
      link.href = pngUrl;
      link.download = "qrcode.png";
      link.click();
    };
  };

  return (
    <section id="qr-generator" className="py-10 container mx-auto px-4">
      <Card className="max-w-md mx-auto shadow-xl border border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-bold">
            <QrCode className="w-5 h-5 text-blue-600" />
            QR Code Generator
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-6 items-center">
          <Input
            type="text"
            placeholder="Enter text or URL"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full"
          />

          {text && (
            <div className="bg-white p-4 rounded-lg shadow border">
              <div className="qr-svg-wrapper">
                <QRCode value={text} size={200} ref={undefined} />
                <svg
                  ref={(el) => {
                    if (el && qrRef) {
                      const svg = el.parentElement?.querySelector("svg");
                      if (svg) {
                        // @ts-ignore
                        qrRef.current = svg as SVGSVGElement;
                      }
                    }
                  }}
                  style={{ display: "none" }}
                />
              </div>
            </div>
          )}

          {text && (
            <Button
              onClick={downloadQR}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <Download className="w-4 h-4" />
              Download PNG
            </Button>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
