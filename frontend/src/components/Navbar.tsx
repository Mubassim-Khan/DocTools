"use client";

import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "Getting Started" },
  { href: "#qr", label: "QR Generator" },
  { href: "#ocr", label: "OCR" },
];

export default function Navbar() {
  return (
    <header className="border-b bg-white/70 backdrop-blur-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <a href="/" className="flex items-center gap-2">
          <img
            src="./Logo.png"
            alt="DocTools Logo"
            className="h-[130px] w-[150px] object-contain p-2"
          />
        </a>
        <nav className="hidden md:flex gap-6 text-lg font-medium">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-blue-600">
              {link.label}
            </a>
          ))}
        </nav>
        <Button asChild>
          <a href="#upload">Try Now</a>
        </Button>
      </div>
    </header>
  );
}
