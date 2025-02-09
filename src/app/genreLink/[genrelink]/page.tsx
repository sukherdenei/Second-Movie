import { PopoverDemo } from "@/app/components/Popever-genre-list";
import { ToggleGroupDemo } from "@/app/components/Toggle";
import { MovieType, token } from "@/app/Util";
import Image from "next/image";
import Link from "next/link";

export default async function genrePage({
  params: { genrelink },
}: {
  params: { genrelink: string };
}) {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${genrelink}&page=1`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    }
  );
  const genre = await response.json();
  // console.log("hi", genre);

  return (
    <div className="w-[1280px] m-auto mt-[52px]">
      <h1 className="text-[30px] font-semibold">Search filter</h1>
      <div className="flex w-[1280px] m-auto justify-between mt-10 ">
        <div className="w-[400px] sticky top-10">
          <h2 className="text-[24px] font-semibold ">Genres</h2>
          <p className="text-[16px] mb-[20px]">See lists of movies by genre</p>
          <div className="mt-10">
            <ToggleGroupDemo />
          </div>
        </div>
        <div className="border-l-[0.5px] pl-[20px]">
          <h1 className="mb-[32px] text-[20px] flex">
            {genre.total_results} Results for "<p>{genrelink}</p>"
          </h1>
          <div className="w-[800px] flex flex-wrap justify-between  gap-5">
            {genre.results?.map((genres: MovieType, index: number) => {
              return (
                <div key={index}>
                  <Link href={`/cardinfo/${genres.id}`}>
                    <div className="w-[165px] h-[331px] border-amber-400 bg-stone-800 rounded-md overflow-hidden ">
                      <Image
                        width={200}
                        height={200}
                        src={`https://image.tmdb.org/t/p/original/${genres.poster_path}`}
                        alt=""
                        className="w-[165px] h-[244px] rounded-t-md hover:opacity-50 transition-all ease-in"
                      />
                      <div className="p-[10px]">
                        <div className="flex gap-[10px] text-[14px] items-center ">
                          <img src="/Star.svg" alt="" />
                          <p> {genres.vote_average}/10</p>
                        </div>
                        <p className="text-[17px] ">{genres.title}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
