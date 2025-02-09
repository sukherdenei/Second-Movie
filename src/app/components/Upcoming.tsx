import Image from "next/image";
import { MovieType, token } from "../Util";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default async function Upcoming() {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    }
  );
  const data = await response.json();

  return (
    <div className="flex flex-wrap w-[1280px] mx-[auto]">
      <div className="flex justify-between w-[1280px] h-[36px] items-center mb-5 mt-5">
        <h1>Upcoming</h1>
        <Link href={"/similar/similarId"}>
          <div className="text-[14px]">See more </div>
        </Link>
      </div>
      <div className="flex flex-wrap gap-[31px] justify-between">
        {data.results.slice(0, 10).map((pics: MovieType, index: number) => {
          return (
            <div key={index} className="rounded-b-xl">
              <div key={index} className="h-[439px] w-[230px] flex flex-wrap">
                <Link href={`/cardinfo/${pics.id}`}>
                  <Image
                    width={1000}
                    height={1000}
                    alt=""
                    src={
                      "https://image.tmdb.org/t/p/original" + pics.poster_path
                    }
                    className="h-[340px] w-[230px] rounded-t-xl transition-all hover:opacity-60"
                  />
                  <div className="p-2">
                    <div className="flex gap-2">
                      <img
                        src="./Star.svg"
                        alt=""
                        className="w-[16px] h-[16px]"
                      />
                      <p>{pics.vote_average.toFixed(1)}/10</p>
                    </div>
                    <p>{pics.original_title}</p>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
