import { MovieType, token } from "@/app/Util";
import Image from "next/image";

export default async function Similiar({
  params: { similarId },
}: {
  params: { similarId: string };
}) {
  const moreLikeThis = await fetch(
    `https://api.themoviedb.org/3/movie/${similarId}/similar?language=en-US&page=1`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    }
  );
  const moreLikeData = await moreLikeThis.json();
  // console.log(moreLikeData);

  return (
    <div className="w-[1280px] m-auto">
      <h1>Upcoming</h1>
      <div>
        {moreLikeData.results
          ?.slice(0, 10)
          .map((photo: MovieType, index: number) => {
            return (
              <div key={index}>
                <Image
                  width={1000}
                  height={1000}
                  src={`https://image.tmdb.org/t/p/original/${photo.poster_path}`}
                  alt=""
                  className="w-[300px] h-[300px] bg-red-600"
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
