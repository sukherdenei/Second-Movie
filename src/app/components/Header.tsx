import Input from "./Input";
import { PopoverDemo } from "./Popever-genre-list";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ModeToggle } from "@/util/Theme";

const Header = () => {
  return (
    <Card className="flex w-[1280px] h-[60px] m-auto justify-between items-center sticky top-0 border-none rounded-none">
      <Link href={"http://localhost:3000/"}>
        <img src="/Logo.svg" alt="" className="w-[92px] h-[20px]" />
      </Link>
      <div className="flex items-center gap-5">
        <PopoverDemo />
        <Input />
      </div>
      <ModeToggle />
    </Card>
  );
};
export default Header;
