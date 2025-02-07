"use client";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { genreType, MovieType, token } from "../Util";
import { useEffect, useState } from "react";
import fetchInputs from "@/util/search";
import { useRouter, useSearchParams } from "next/navigation";

export function ToggleGroupDemo() {
  const [genres, setGenres] = useState<genreType[]>([]);
  const search = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const data = async () => {
      const response = await fetchInputs(`/genre/movie/list?language=en-US`);
      setGenres(response.genres);
    };
    data();
  }, []);

  console.log(search.get("query"));
  console.log(search.get("genreIds"));

  const onValueChange = (values: string[]) => {
    console.log(values);
    router.push("?query=827636738&genreIds=23,34");
  };

  return (
    <ToggleGroup onValueChange={onValueChange} type="multiple" className="flex">
      <div className="flex h-[387px] w-[272px] flex-wrap">
        <div className="p-8">
          <h1 className="font-[24px]">Search by genre</h1>
          <p className="font-[24px]">See list of movies by genre</p>
        </div>
        {genres?.map((genre, index) => {
          return (
            <ToggleGroupItem
              value={genre.id.toString()}
              key={index}
              className="p-[4px] font-[12px] border-2 gap-[16px]"
            >
              {genre.name}
            </ToggleGroupItem>
          );
        })}
      </div>
      {/* <div className="flex flex-col">
        {genreNames.genres
          .filter((filtered) => filtered.name.toLowerCase().includes(""))
          .map((names: MovieType, index: number) => (
            <button key={index}>{names.name}</button>
          ))}
      </div> */}
    </ToggleGroup>
  );
}
