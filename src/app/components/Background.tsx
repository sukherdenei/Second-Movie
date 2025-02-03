import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MovieType, token } from "../Util";
import Image from "next/image";

export default async function BackgroundPhoto() {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
    {
      headers: {
        Authorization: `Bearer:${token}`,
        "Content-type": "application/json",
      },
    }
  );
  const data = await response.json();

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-xs"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {data.results.slice(0, 20).map((cover: MovieType, index: number) => {
          <CarouselItem key={index}>
            <Card>
              <div className="flex items-center justify-center">
                <Image
                  alt=""
                  width={1000}
                  height={1000}
                  className="w-[100vw] h-[600px] object-cover"
                  src={
                    "https://image.tmdb.org/t/p/original/" + cover.backdrop_path
                  }
                />
              </div>
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <span className="text-4xl font-semibold">{index + 1}</span>
              </CardContent>
            </Card>
          </CarouselItem>;
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
