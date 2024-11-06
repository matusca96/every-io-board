import { MoonStar } from "lucide-react";

import { Button } from "./ui";

export const Header = (): JSX.Element => {
  return (
    <header className="flex items-center">
      <h1 className="flex-1 font-bold text-3xl text-ring">
        Every.io
        <span className="ml-2 rounded-sm tracking-widest px-2 bg-primary text-secondary text-center">
          BOARD
        </span>
      </h1>

      <Button variant="ghost">{<MoonStar />}</Button>
    </header>
  );
};
