"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const images = [
  "../src/assets/conversion1.jpg",
  "../src/assets/conversion2.png",
  "../src/assets/conversion3.jpg",
  "../src/assets/conversion4.jpg",
];

export default function Showcase() {
  const autoplay = Autoplay({
    delay: 3000,
    stopOnInteraction: true,
    stopOnMouseEnter: true,
  });
  const [emblaRef] = useEmblaCarousel({ loop: true }, [autoplay]);

  return (
    <section className="py-10 bg-gradient-to-b from-gray-100 to-white">
      <h2 className="text-3xl font-bold text-center mb-8">A Glimpse Into the Platform</h2>

      <div className="max-w-3xl mx-auto">
        <Carousel ref={emblaRef} className="w-full">
          <CarouselContent>
            {images.map((src, i) => (
              <CarouselItem key={i} className="flex justify-center">
                <div className="h-[400px] w-[600px] bg-white flex items-center justify-center rounded-xl shadow-md overflow-hidden">
                  <img
                    src={src}
                    alt={`Showcase ${i + 1}`}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
