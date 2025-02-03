import Input from "./Input";
import { PopoverDemo } from "./Popever-genre-list";

const Header = () => {
  return (
    <div className="flex w-[1280px] h-[60px] m-auto justify-between items-center">
      <img src="/Logo.svg" alt="" className="w-[92px] h-[20px]" />
      <div className="flex items-center">
        <PopoverDemo />
        <Input />
      </div>
      {/* <ThemeProvider /> */}
    </div>
  );
};
export default Header;
