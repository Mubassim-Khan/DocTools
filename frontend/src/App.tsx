import "./App.css";
import FileUploader from "./components/FileUploader";
import { ToasterProvider } from "./components/ToastProvider";

function App() {
  return (
    <>
      <ToasterProvider />
      <FileUploader />
    </>
  );
}

export default App;
