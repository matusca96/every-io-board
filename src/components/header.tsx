import { Cog, MoonStar, Sun } from "lucide-react";

import { useTheme } from "@/context";

import { Button } from "./ui";

export const Header = (): JSX.Element => {
  const { theme, setTheme } = useTheme();

  const updateTheme = (): void => {
    if (theme === "system") return setTheme("dark");

    if (theme === "dark") return setTheme("light");

    setTheme("system");
  };

  const icons = {
    system: <MoonStar />,
    dark: <Sun />,
    light: <Cog />,
  };

  return (
    <header className="flex items-center">
      <h1 className="flex-1 font-bold text-3xl text-ring">
        Every.io
        <span className="ml-2 rounded-sm tracking-widest px-2 bg-primary text-secondary text-center">
          BOARD
        </span>
      </h1>

      <Button onClick={updateTheme} variant="ghost">
        {icons[theme]}
      </Button>
    </header>
  );
};
