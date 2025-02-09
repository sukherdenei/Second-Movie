import BackgroundPhoto from "./components/Background";
import Popular from "./components/Popular";
import Upcoming from "./components/Upcoming";

export default function Home() {
  return (
    <div>
      <BackgroundPhoto />
      <Upcoming />
      <Popular />
    </div>
  );
}
