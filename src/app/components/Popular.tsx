import Image from "next/image";
import { MovieType, token } from "../Util";
import Link from "next/link";

export default async function Popular() {
  const pop = await fetch(
    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application.json",
      },
    }
  );
  const data = await pop.json();
  console.log(data);
  return (
    <div className="m-auto w-[1280px]">
      <div className="flex justify-between ">
        <h1>Popular</h1>
        <p>Seemore</p>
      </div>
      <div className="justify-center gap-[31px] flex flex-wrap">
        {data.results.slice(0, 10).map((pics: MovieType, index: number) => {
          return (
            <div key={index} className="h-[439px] w-[230px] flex flex-wrap">
              <Link href={`/cardinfo/${pics.id}`}>
                <Image
                  src={`https://image.tmdb.org/t/p/original/${pics.backdrop_path}`}
                  alt=""
                  className="h-[340px] w-[230px] rounded-t-xl transition-all hover:opacity-60"
                  width={1000}
                  height={1000}
                />
                <div className="flex flex-col">
                  <div className="flex gap-2">
                    <img
                      src="/Star.svg"
                      alt=""
                      className="w-[16px] h-[16px] "
                    />
                    <p>{pics.vote_average.toFixed(1)}/10</p>
                  </div>
                  <p>{pics.original_title}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
