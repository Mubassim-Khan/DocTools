"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, FileText } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";

export default function OCR() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const allowedTypes = ["application/pdf", "image/png", "image/jpeg"];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    if (selected && !allowedTypes.includes(selected.type)) {
      toast.error("Only PDF, PNG, or JPEG files are allowed.");
      return;
    }
    setFile(selected);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first.");
      return;
    }

    setLoading(true);
    setResult("");

    const formData = new FormData();
    formData.append("file", file);   

    try {
      const res = await fetch(`${import.meta.env.VITE_HOST_URL}/analyze`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        toast.error("Server error while analyzing document.");
      }

      const data = await res.json();
      setResult(data.result || "No text extracted");
    } catch (err: any) {
      if (err.name === "AbortError") {
        console.warn("Request aborted due to timeout.");
      } else {
        toast.error("Failed to analyze document.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="ocr"
      className="py-20 bg-gradient-to-t from-blue-50 to-purple-100"
    >
      <h2 className="text-3xl font-bold text-center mb-8">Try OCR</h2>
      <Card className="w-full max-w-2xl mx-auto shadow-xl border border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <FileText className="w-5 h-5" /> OCR Extraction
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Input
            type="file"
            accept=".png,.jpg,.jpeg,.pdf"
            onChange={handleFileChange}
          />

          <Button onClick={handleUpload} disabled={loading || !file}>
            {loading ? (
              <>
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
                Analyzing...
              </>
            ) : (
              "Extract Text"
            )}
          </Button>

          {result && (
            <Textarea
              value={result}
              readOnly
              className="h-40 resize-none border border-gray-300 bg-gray-50"
            />
          )}
        </CardContent>
      </Card>
    </section>
  );
}
