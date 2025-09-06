import QRGenerator from "./QRGenerator";

export default function QRSection() {
  return (
    <section id="qr" className="py-20 container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center">
        Generate & Share Instantly
      </h2>
      <QRGenerator />
    </section>
  );
}
