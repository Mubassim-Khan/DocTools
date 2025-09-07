"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, Loader2, FileText } from "lucide-react";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";

export default function OCR() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const allowedTypes = ["application/pdf"];
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;

    if (selected) {
      if (!allowedTypes.includes(selected.type)) {
        toast.error("Only PDF files are allowed.");
        return;
      }
      if (selected.size > maxSize) {
        toast.error("File size exceeds 5MB. Please upload a smaller PDF.");
        return;
      }
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

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      toast.success("Copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy.");
    }
  };

  return (
    <section id="ocr" className="py-20 bg-gradient-to-t">
      <h2 className="text-3xl font-bold text-center mb-8">
        PDF Text Summarizer
      </h2>
      <Card className="w-full max-w-2xl mx-auto shadow-xl border border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-bold">
            <FileText className="w-5 h-5 text-blue-500" /> PDF Analysis & OCR
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Input type="file" accept=".pdf" onChange={handleFileChange} />
          <small className="text-gray-500">
            Only PDF files are supported. Max size: 5MB
          </small>

          <Button onClick={handleUpload} disabled={loading || !file}>
            {loading ? (
              <>
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
                Analyzing...
              </>
            ) : (
              "Extract & Summarize"
            )}
          </Button>

          {result && (
            <div className="prose max-w-none border border-gray-300 bg-gray-50 p-3 rounded">
              <ReactMarkdown>{result}</ReactMarkdown>

              <Button
                variant="outline"
                size="sm"
                className="self-end flex items-center gap-2 py-3 mt-5"
                onClick={handleCopy}
              >
                <Copy className="w-4 h-4" /> Copy Text
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
