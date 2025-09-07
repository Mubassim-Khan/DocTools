"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Download, FileText, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function FileUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState<string>("docx");
  const [loading, setLoading] = useState<boolean>(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const allowedExtensions: Record<string, string[]> = {
    "pdf-to-docx": ["pdf"], // PDF → DOCX
    "docx-to-pdf": ["docx"], // DOCX → PDF
    "pdf-to-pptx": ["pdf"], // PDF → PPTX
    "md-to-pdf": ["md"], // MD → PDF
    "docx-to-txt": ["docx"], // DOCX → TXT
    "txt-to-docx": ["txt"], // TXT → DOCX
  };

  const handleUpload = async () => {
    if (!file) return;

    const requiredExts = allowedExtensions[format];
    const fileExt = file.name.split(".").pop()?.toLowerCase();

    if (!requiredExts.includes(fileExt || "")) {
      toast.error(
        `Invalid file. Expected: ${requiredExts
          .map((ext) => `.${ext}`)
          .join(", ")}`
      );
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("output_format", format);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_HOST_URL}/convert`,
        formData,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      setDownloadUrl(url);

      toast.success(`File converted successfully to ${format.toUpperCase()}`);
    } catch (err) {
      console.error(err);
      toast.error("Conversion failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-5 container mx-auto px-4 scroll-mt-20">
      <h2 className="text-3xl font-bold text-center mb-8">
        Convert Your Files
      </h2>
      <Card className="py-10 w-full max-w-md mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-bold">
            <FileText className="w-5 h-5 text-blue-600" />
            Document Converter
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Input
            type="file"
            onChange={(e) => {
              setFile(e.target.files?.[0] || null);
              setDownloadUrl(null);
            }}
          />

          <Select value={format} onValueChange={setFormat}>
            <SelectTrigger>
              <span className="font-semibold text-sm">
                Choose output format
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf-to-docx">PDF → DOCX</SelectItem>
              <SelectItem value="docx-to-pdf">DOCX → PDF</SelectItem>
              <SelectItem value="pdf-to-pptx">PDF → PPTX</SelectItem>
              <SelectItem value="md-to-pdf">MD → PDF</SelectItem>
              <SelectItem value="docx-to-txt">DOCX → TXT</SelectItem>
              <SelectItem value="txt-to-docx">TXT → DOCX</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={handleUpload} disabled={loading || !file}>
            {loading ? (
              <Loader2 className="animate-spin w-4 h-4 mr-2" />
            ) : (
              "Convert"
            )}
          </Button>

          {downloadUrl && (
            <Button
              asChild
              className="w-full flex items-center justify-center gap-2"
              variant="outline"
            >
              <a href={downloadUrl} download={`converted.${format}`}>
                <Download className="w-4 h-4" />
                Download File
              </a>
            </Button>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
