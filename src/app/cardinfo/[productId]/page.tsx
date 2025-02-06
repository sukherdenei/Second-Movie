import { MovieType, token } from "@/app/Util";
import { generateKey } from "crypto";
import Image from "next/image";

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
        <div>
          <h2>Rating</h2>
          <div className="flex gap-1">
            <img src="/Star.svg" alt="" />
            <p>{cardDatas.vote_average}</p>
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
        {/* <h5>{filtered}</h5> */}
        {/* {position.crew
          .filter((crews) => crews.job.toLowerCase().includes("direct"))
          .slice(0, 1)
          .map((job: MovieType, index: number) => (
            <h5 key={index}>{job.name}</h5>
          ))} */}
      </div>
      <div className="flex gap-5">
        <p>Stars</p>
        {position.cast.slice(0, 5).map((star: MovieType, index: number) => {
          return <p key={index}>{star.name}</p>;
        })}
      </div>
      <div className="flex justify-between">
        <h1>More like this</h1>
        <p>See more</p>
      </div>
    </div>
  );
}
