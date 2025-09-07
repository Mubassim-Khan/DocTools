import { Github, Linkedin, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t py-10 bg-white" id="contact">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-500">
          &copy; {new Date().getFullYear()} DocTools. All rights reserved.
        </p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="https://mubassim.vercel.app" target="_blank">
            <Globe className="w-5 h-5 hover:text-blue-600" />
          </a>
          <a href="https://github.com/Mubassim-Khan" target="_blank">
            <Github className="w-5 h-5 hover:text-blue-600" />
          </a>
          <a href="https://linkedin.com/in/mubassim" target="_blank">
            <Linkedin className="w-5 h-5 hover:text-blue-600" />
          </a>
        </div>
      </div>
    </footer>
  );
}
