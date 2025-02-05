import { ToggleGroupDemo } from "@/app/components/Toggle";
import { MovieType, token } from "@/app/Util";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default async function SearchPage({
  params: { searchId },
}: {
  params: { searchId: string };
}) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${searchId}&language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    }
  );
  const data = await response.json();
  // console.log(data);

  return (
    <div className="max-w-[1280px] flex m-auto">
      <div>
        <div className="pb-8">
          <h1 className="font-[30px]">Search results</h1>
          <p>Results for ""</p>
        </div>
        <div className="flex flex-wrap justify-between  gap-[8px]">
          {data.results.map((card: MovieType, index: number) => {
            return (
              <Card key={index} className="w-[165px] h-[331px] rounded-b-lg">
                <Link href={`/cardinfo/${card.id}`}>
                  <Image
                    alt=""
                    width={1000}
                    height={1000}
                    src={`https://image.tmdb.org/t/p/original/${card.backdrop_path}`}
                    className="w-[165px] h-[244px] rounded-t-xl transition-all hover:opacity-50 object-cover"
                  />
                </Link>
                <div className="flex">
                  <img src="/Star.svg" alt="" className="w-[16px] h-[16px]" />
                  <p>{card.vote_average.toFixed(1)}/10</p>
                </div>
                <p>{card.original_title}</p>
              </Card>
            );
          })}
        </div>
      </div>
      <div className="">
        <ToggleGroupDemo />
      </div>
    </div>
  );
}
