import { token } from "@/app/Util";

export default async function fetchInputs(point: string) {
  const response = await fetch(`https://api.themoviedb.org/3${point}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}
