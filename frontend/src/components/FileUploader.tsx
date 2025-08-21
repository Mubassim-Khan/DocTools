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
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

export default function FileUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState<string>("docx");
  const [loading, setLoading] = useState<boolean>(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("output_format", format);

    try {
      const res = await axios.post("http://localhost:8000/convert", formData, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      setDownloadUrl(url);
    } catch (err) {
      console.error(err);
      alert("Conversion failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-lg font-bold">Document Converter</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <Select value={format} onValueChange={setFormat}>
          <SelectTrigger>
            <SelectValue placeholder="Choose output format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="docx">PDF → DOCX</SelectItem>
            <SelectItem value="pdf">DOCX → PDF</SelectItem>
            <SelectItem value="pptx">PDF → PPTX</SelectItem>
            <SelectItem value="txt">DOCX → TXT</SelectItem>
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
          <a
            href={downloadUrl}
            download={`converted.${format}`}
            className="text-blue-600 underline text-center"
          >
            Download File
          </a>
        )}
      </CardContent>
    </Card>
  );
}
