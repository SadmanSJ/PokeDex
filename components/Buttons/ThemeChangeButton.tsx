"use client";
import { useTheme } from "next-themes";

const ThemeChangeButton = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col space-x-2 justify-center items-center">
      <button onClick={() => setTheme("light")}>Light</button>
      <button onClick={() => setTheme("dark")}>Dark</button>
      <button onClick={() => setTheme("system")}>System</button>
    </div>
  );
};

export default ThemeChangeButton;
