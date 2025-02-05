import { token } from "@/app/Util";
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
  console.log(cardDatas);
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
          className="h-[428px] w-[760px] rounded-lg rounded-b-lg"
          src={"https://image.tmdb.org/t/p/original/" + cardDatas.poster_path}
        />
      </div>
    </div>
  );
}
