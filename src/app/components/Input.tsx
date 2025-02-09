"use client";
import { useState } from "react";
import { MovieType } from "../Util";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import fetchInputs from "@/util/search";
import { useRouter } from "next/navigation";

export default function Input() {
  const [search, setSearch] = useState("");
  const [value, setValue] = useState([]);

  const addHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toLocaleLowerCase());
    if (search == "") {
      setValue([]);
      return;
    }

    const response = await fetchInputs(
      `/search/movie?query=${search}&language=en-US&page=${1}`
    );

    setValue(response.results || []);
  };
  const clickHandler = () => {
    setSearch("");
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="search"
        value={search}
        onChange={addHandler}
        className="w-[355px] h-[36px] p-[20px] rounded-md"
      />
      {search ? (
        <div className="absolute top-[40px]">
          {value.slice(0, 5).map((movie: MovieType, index: number) => {
            return (
              <div key={index} className="flex flex-col w-full z-50 relative">
                <Link
                  href={`/cardinfo/${movie.id}`}
                  onClick={() => clickHandler()}
                >
                  <Card className="w-[545px] gap-5 p-5 rounded-md flex justify-start ">
                    <img
                      className="w-[67px] h-[100px]"
                      src={
                        "https://image.tmdb.org/t/p/original/" +
                        movie?.poster_path
                      }
                    />
                    <button
                      className="text-[20px] flex flex-col justify-start w-full"
                      key={index}
                    >
                      {movie?.original_title}
                      <div className="flex items-center">
                        <img
                          className="w-[16px] h-[16px]"
                          src="/Star.svg"
                          alt=""
                        />
                        {movie.vote_average}/10
                      </div>
                      <div className="flex justify-between w-full">
                        <div>{movie.release_date}</div>
                        <div>See more</div>
                      </div>
                    </button>
                  </Card>
                </Link>
              </div>
            );
          })}
          <Link href={`/search/${search}`} onClick={() => clickHandler()}>
            <Card className="h-[40px] flex items-center justify-center rounded-sm">
              See all results for " search "
            </Card>
          </Link>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
