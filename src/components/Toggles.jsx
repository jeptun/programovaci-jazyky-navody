import useDarkMode from "../hooks/useDarkMode";
import { NavLink } from "react-router-dom";
export default function Toggles() {
  const [colorTheme, setTheme] = useDarkMode();

  return (
    <div className=" relative w-full px-6 pt-4 md:max-w-3xl md:mx-auto lg:max-w-5xl flex justify-between">
      <NavLink to="/"  className="text-4xl font-black">
        MN
      </NavLink>
      <div className="flex justify-end">
        <span
          onClick={() => setTheme(colorTheme)}
          className="w-12 h-12 flex    items-center justify-center cursor-pointer"
        >
          {colorTheme === "light"
            ? <p className="text-2xl">🌜</p>
            : <p className="text-lg">🌞</p>}
        </span>
      </div>
    </div>
  );
}
