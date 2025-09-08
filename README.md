# DocTools

![Preview Image](https://github.com/Mubassim-Khan/DocTools/blob/master/frontend/src/assets/Preview.png)

<div align="center">
    <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="vite" />
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="react" />
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="typescript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="shadcn" />
    <br />
    <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="fastapi" />
    <img src="https://img.shields.io/badge/GPT 4o/4.1-74aa9c?style=for-the-badge&logo=openai&logoColor=white" alt="openai" />
</div>

## 📋 Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Getting Started](#quick-start)
5. [License](#license)
6. [Contributing](#contributing)
7. [Contact](#contact)

## ✨ Introduction

**DocTools** is an all-in-one document utility platform that lets you:

- Convert files across multiple formats
- Extract text from scanned documents and PDFs using **GPT-4o**
- Generate advanced AI-based document summaries using **GPT-4.1**
- Create instant QR codes

It’s powered by a **FastAPI backend** (with OpenAI models) and a **Vite + React (TypeScript)** frontend with a sleek UI built using **Shadcn/UI** and **Tailwind CSS**.

## ⚡ Features

👉 **Multiple format conversion**: Convert between PDF, DOCX, TXT, MD, and PPTX.  
👉 **OCR & text extraction**: Extract content from scanned PDFs and images using **GPT-4o**.  
👉 **AI-powered summarization**: Get deep insights and stronger summaries using **GPT-4.1**.  
👉 **QR code generator**: Turn text/links into downloadable QR codes.  
👉 **Cloud-based**: No installation required — access anytime, anywhere.  
👉 **Secure**: Files are only processed temporarily (not stored).  
👉 **Responsive UI**: Optimized for both desktop and mobile.

## 🛠 Tech Stack

### 💻 Frontend

- [Vite](https://vitejs.dev/) – Lightning-fast build tool
- [React](https://reactjs.org/) – Component-based UI framework
- [TypeScript](https://www.typescriptlang.org/) – Type safety
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS
- [Shadcn/UI](https://ui.shadcn.com/) – Modern UI components

### ⚙️ Backend

- [FastAPI](https://fastapi.tiangolo.com/) – High-performance API framework
- [OpenAI API](https://openai.com/) – AI-powered document analysis
- [Pydantic](https://docs.pydantic.dev/) – Data validation & parsing

## 🚀 Getting Started

Follow these steps to set up **DocTools** locally 👇

### 1. Clone the repository

```bash
git clone https://github.com/Mubassim-Khan/DocTools.git
cd DocTools
```

### 2. Backend Setup (FastAPI)

1. Navigate into the backend folder:

   ```bash
   cd backend
   ```

2. Create a Python virtual environment:

   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:

   - On **Linux/Mac**:

     ```bash
     source venv/bin/activate
     ```

   - On **Windows**:

     ```bash
     venv\Scripts\activate
     ```

4. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

5. Run the FastAPI server:

   ```bash
   uvicorn app.main:app --reload
   ```

✅ Backend runs at: **[http://127.0.0.1:8000](http://127.0.0.1:8000)**

---

### 3. Frontend Setup (Vite + React)

1. Navigate into the frontend folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

✅ Frontend runs at: **[http://localhost:5173](http://localhost:5173)**

---

### 4. Connect Frontend & Backend

Make sure your frontend `.env` file points to the correct backend URL:

```
VITE_API_URL=http://127.0.0.1:8000
```

### 5. Connect Backend with AI Model

Make sure your backend `.env` file points to the correct backend URL:

```
GITHUB_TOKEN_GPT_4_1=your_token
GITHUB_TOKEN_GPT_4o=your_token
```

## 📜 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## 🤝 Contributing

Contributions are welcome! 🎉
If you find bugs 🐞 or have feature suggestions 💡, please open an issue or a pull request.

## 📬 Contact

For questions, suggestions, or feedback:

- LinkedIn: [Mubassim Ahmed Khan](https://www.linkedin.com/in/mubassim)
- Email: [mubassimkhan@gmail.com](mailto:mubassimkhan@gmail.com)
