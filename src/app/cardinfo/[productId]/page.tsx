import { MovieType, token } from "@/app/Util";
import Image from "next/image";
import Link from "next/link";

export default async function CardInfo({
  params: { productId },
}: {
  params: { productId: string };
}) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${productId}?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    }
  );
  const cardDatas = await response.json();
  // console.log(cardDatas);

  const moviePosition = await fetch(
    `https://api.themoviedb.org/3/movie/${productId}/credits?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    }
  );
  const position = await moviePosition.json();
  // console.log(position);

  const moreLikeThis = await fetch(
    `https://api.themoviedb.org/3/movie/${productId}/similar?language=en-US&page=1`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    }
  );
  const moreLikeData = await moreLikeThis.json();
  console.log("Crew data", moreLikeData);

  const filtered = position.crew
    .filter((crew: MovieType) => crew.job.toLowerCase().includes("direct"))
    .slice(0, 1)
    .map((directer: MovieType, index: number) => (
      <p key={index}>{directer.name}</p>
    ));

  return (
    <div className="w-[1080px] m-auto">
      <div className="flex justify-between">
        <div>
          <h1>{cardDatas.original_title}</h1>
          <p>{cardDatas.release_date}</p>
        </div>
        <div className="p-5">
          <h2>Rating</h2>
          <div className="flex gap-1">
            <img src="/Star.svg" alt="" />
            <p>{cardDatas.vote_average.toFixed(1)}</p>
          </div>
        </div>
      </div>
      <div className="flex gap-8">
        <Image
          src={"https://image.tmdb.org/t/p/original/" + cardDatas.poster_path}
          alt=""
          className="h-[428px] w-[290px] rounded-t-lg rounded-b-lg"
          width={1000}
          height={1000}
        />
        <Image
          alt=""
          width={1000}
          height={1000}
          className="h-[428px] w-[760px] rounded-lg rounded-b-lg opacity-60"
          src={"https://image.tmdb.org/t/p/original/" + cardDatas.poster_path}
        />
      </div>
      <div className="flex gap-9">
        {cardDatas.genres.map((genre: MovieType, index: number) => {
          return <button key={index}>{genre.name}</button>;
        })}
      </div>
      <p>{cardDatas.overview}</p>
      <div className="flex gap-5">
        <p>{position.crew[0].known_for_department}</p>

        {position.crew
          .filter((crews: MovieType) =>
            crews.job.toLowerCase().includes("direct")
          )
          .slice(0, 5)
          .map((job: MovieType, index: number) => (
            <h5 key={index}>{job.name}</h5>
          ))}
      </div>
      <div className="flex gap-5">
        <p>Stars</p>
        {position.cast.slice(0, 5).map((star: MovieType, index: number) => {
          return <p key={index}>{star.name}</p>;
        })}
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <h1>More like this</h1>
          <p>See more</p>
        </div>
        <div className="flex justify-center gap-8">
          {moreLikeData.results
            .slice(0, 5)
            .map((five: MovieType, index: number) => {
              return (
                <Link key={index} href={`/cardinfo/${five.id}`}>
                  <div className="mt-10">
                    <div className="w-[190px] h-[392px] gap-8">
                      <Image
                        width={200}
                        height={200}
                        src={`https://image.tmdb.org/t/p/original${five.backdrop_path}`}
                        alt=""
                        className="w-[200px] h-[281px] rounded-t-lg transition-all hover:opacity-50"
                      />
                      <div className="flex gap-2">
                        <img src="/Star.svg" alt="" />
                        <p>{five.vote_average.toFixed(1)}/10</p>
                      </div>
                      <h3>{five.original_title}</h3>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}
