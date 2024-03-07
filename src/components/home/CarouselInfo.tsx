import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';

const ImageArray = [
  '/asset/photo/coffee1.jpg',
  '/asset/photo/coffee2.jpg',
  '/asset/photo/coffee3.jpg',
  '/asset/photo/coffee4.jpg',
  '/asset/photo/coffee5.jpg',
  '/asset/photo/coffee6.jpg',
  '/asset/photo/coffee7.jpg',
  '/asset/photo/coffee8.jpg',
];

const CarouselInfo = () => {
  return (
    <Carousel
      className="w-full"
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent className="">
        {ImageArray.map((img, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="relative h-[600px]">
              <Image src={img} fill alt="img" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CarouselInfo;
