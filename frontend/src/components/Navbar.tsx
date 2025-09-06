"use client";

import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="border-b bg-white/70 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <a href="/" className="flex items-center gap-2">
          <img
            src="../src/assets/Logo.png"
            alt="DocTools Logo"
            className="h-[130px] w-[150px] object-contain p-2"
          />
        </a>
        <nav className="hidden md:flex gap-6 text-lg font-medium">
          <a href="#features" className="hover:text-blue-600">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-blue-600">
            Getting Started
          </a>
          <a href="#qr" className="hover:text-blue-600">
            QR Generator
          </a>
          <a href="#contact" className="hover:text-blue-600">
            Contact
          </a>
        </nav>
        <Button asChild>
          <a href="#upload">Try Now</a>
        </Button>
      </div>
    </header>
  );
}
