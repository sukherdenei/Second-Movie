"use client";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React, { useEffect, useState } from "react";
import { MovieType, token } from "../Util";
import Image from "next/image";

export default function BackgroundPhoto() {
  const [movies, setMovies] = useState<MovieType[] | null>(null);
  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        }
      );
      const data = await response.json();
      setMovies(data.results);
    };
    getData();
  }, []);

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-[100vw] h-[600px] p-0 m-0"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="w-[100%] h-[600px] p-0 m-0">
        {movies?.slice(0, 20).map((cover: MovieType, index: number) => {
          return (
            <CarouselItem key={index}>
              <Card>
                <div className="flex items-center justify-center relative">
                  <Image
                    alt=""
                    width={1000}
                    height={1000}
                    className="w-[100%] h-[600px] object-cover"
                    src={
                      "https://image.tmdb.org/t/p/original/" +
                      cover.backdrop_path
                    }
                  />
                  <div className="absolute bottom-50 left-20 text-white">
                    <h1>Now Playing:</h1>
                    <p>{cover.original_title}</p>
                    <div className="flex">
                      <p>{cover.vote_average}/10</p>
                      <img src="Star.svg" alt="" />
                    </div>
                    <p className="w-[302px] h-[80px]">{cover.overview}</p>
                  </div>
                </div>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="left-[50px] absolute" />
      <CarouselNext className="right-[50px] absolute" />
    </Carousel>
  );
}
