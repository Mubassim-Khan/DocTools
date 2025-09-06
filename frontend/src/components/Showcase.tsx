"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const images = [
  "/assets/conversion1.png",
  "/assets/conversion2.png",
  "/assets/conversion3.png",
];

export default function Showcase() {
  return (
    <section className="py-3 bg-gradient-to-b from-purple-100 to-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8">See It in Action</h2>
      <Carousel className="max-w-xl mx-auto">
        <CarouselContent>
          {images.map((src, i) => (
            <CarouselItem key={i}>
              <img
                src={src}
                alt={`Showcase ${i + 1}`}
                width={600}
                height={400}
                className="rounded-xl shadow-md"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
