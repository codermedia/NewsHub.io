import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { Context } from "../../contexts/Context";

const navLinks = [
  {
    id: 1,
    path: "/#",
    name: "Home",
  },
  {
    id: 2,
    path: "/about",
    name: "About",
    href: "https://newsapi.org/",
  },
];

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(true);
  const [activeLink, setActiveLink] = useState("");
  const [value, setValue] = useState("");

  const { context1 } = useContext(Context);
  const [query, setQuery] = context1;

  const { context2 } = useContext(Context);
  const [limit, setLimit] = context2;

  const location = useLocation();

  useEffect(() => {
    if (value === "") {
      setQuery("World");
      setLimit(15);
      return;
    }
    setQuery(value);
    setLimit(15);
  }, [value]);

  const handleNav = () => {
    const timeout = setTimeout(() => {
      setNavOpen(!navOpen);
    }, 250);

    return () => {
      clearTimeout(timeout);
    };
  };

  const handleClick = (path) => {
    setActiveLink(path);

    if (window.innerWidth < 768) {
      setNavOpen(false);
    } else {
      setNavOpen(true);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) {
        setNavOpen(true);
      } else {
        setNavOpen(false);
      }
    });
  }, [window.innerWidth]);

  useEffect(() => {
    let tab = "/" + location.hash;

    if (tab === "/") {
      tab = "/#";
    }

    setActiveLink(tab);
  }, [location.hash]);

  return (
    <header className="flex h-fit items-center justify-center">
      <nav
        className="fixed top-0 z-50 flex w-full max-w-full flex-col justify-start gap-y-5 bg-red-600 px-32 md:flex-row md:items-center md:justify-between md:gap-y-0"
        id="navbar"
      >
        <Link to="/" className="text-xl font-bold text-white">
          NewsHub.io
        </Link>
        <ul
          className={`mx-auto flex w-full flex-none flex-col justify-between transition duration-200 ease-in-out ${!navOpen ? "hidden translate-x-[150%]" : "translate-x-0 transition-all duration-200 ease-in-out"} gap-y-5 overflow-x-hidden text-[0.94rem] font-semibold text-slate-600 md:w-fit md:translate-x-0 md:flex-row md:items-center md:gap-x-5 md:gap-y-0 md:transition-none md:duration-200 md:ease-in-out`}
          id="navlinks"
        >
          {navLinks.map((item) => (
            <li
              key={item.id}
              className={`p-5 transition duration-500 ease-in-out ${activeLink === item.path ? "bg-white font-semibold text-black" : "text-white hover:text-white/60"}`}
              onClick={() => handleClick(item.path)}
            >
              <Link to={item.href ? item.href : item.path} target="_blank">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="relative flex w-fit items-center">
          <input
            type="text"
            name="search"
            id="search"
            autoComplete="off"
            className="w-auto rounded-full p-2 px-4 text-[0.94rem] font-semibold capitalize text-slate-600 outline-none placeholder:text-slate-600"
            value={value}
            onChange={(e) => setValue(e.target.value.toLowerCase())}
            placeholder="Search"
          />
          <div
            className={`absolute right-0 mr-3 cursor-pointer items-center bg-red-50 ${value ? "flex" : "hidden"}`}
            title="Clear search"
            onClick={() => setValue("")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5 cursor-pointer rounded text-[#9b3131]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
