// import { Bold, Italic, Underline } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { MovieType, token } from "../Util";

export async function ToggleGroupDemo() {
  const response = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?language=en`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    }
  );
  const genreNames = await response.json();
  console.log(genreNames);

  return (
    <ToggleGroup type="multiple" className="flex">
      <div className="flex h-[387px] w-[272px] flex-wrap">
        <div className="p-8">
          <h1 className="font-[24px]">Search by genre</h1>
          <p className="font-[24px]">See list of movies by genre</p>
        </div>
        {genreNames.genres.map((genre: MovieType, index: number) => {
          return (
            <ToggleGroupItem
              value={genre.id}
              key={index}
              className="p-[4px] font-[12px] border-2 gap-[16px]"
            >
              {genre.name}
            </ToggleGroupItem>
          );
        })}
      </div>
      <div className="flex flex-col">
        {genreNames.genres
          .filter((filtered) => filtered.name.toLowerCase().includes(""))
          .map((names: MovieType, index: number) => (
            <button key={index}>{names.name}</button>
          ))}
      </div>
    </ToggleGroup>
  );
}
