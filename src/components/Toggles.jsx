import useDarkMode from "../hooks/useDarkMode";
import { NavLink } from "react-router-dom";
export default function Toggles() {
  const [colorTheme, setTheme] = useDarkMode();

  const toggleNav = () => {
    const nav = document.querySelector(".nav");
    nav.classList.toggle("hide");
  };

  return (
    <div className=" relative w-full px-6 pt-4 md:max-w-3xl md:mx-auto lg:max-w-4xl  ">
      <div className="flex justify-end">
        <NavLink to="/" exact>
          <span className="w-12 h-12 flex items-center justify-center">
            <p className="text-2xl">🌎</p>
          </span>
        </NavLink>

        {/* <span
          onClick={() => toggleNav()}
          className="w-12 h-12 flex bg-blue-400 items-center justify-center
        "
        >
          <svg
            className="w-9 h-9 text-purple-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        </span> */}
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
