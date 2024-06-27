import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Context } from "../../contexts/Context";
import DataCard from "../DataCard";

const Content = () => {
  const apiKey = import.meta.env.VITE_APP_NEWS_API_KEY;
  const baseUrl = import.meta.env.VITE_APP_NEWS_BASE_URL;

  const [news, setNews] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const { context1 } = useContext(Context);
  const [query] = context1;

  const { context2 } = useContext(Context);
  const [limit, setLimit] = context2;

  const handleExplore = () => {
    setLimit((prev) => prev + 15);

    if (limit >= 45) {
      document.getElementById("exploreBtn").classList.add("hidden");
    } else {
      document.getElementById("exploreBtn").classList.remove("hidden");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= window.innerHeight / 2) {
        document
          .getElementById("exploreBtn")
          .classList.add(
            "z-40",
            "fixed",
            "bottom-5",
            "right-5",
            "bg-white",
            "shadow-2xl",
            "shadow-slate-400",
            "rounded-full",
            "p-4",
            "animate-bounce",
            "transition",
            "ease-in-out",
            "duration-300",
            "delay-100",
          );
      } else {
        document
          .getElementById("exploreBtn")
          .classList.remove(
            "z-40",
            "fixed",
            "bottom-5",
            "right-5",
            "bg-white",
            "shadow-2xl",
            "shadow-slate-400",
            "rounded-full",
            "p-4",
            "animate-bounce",
            "transition",
            "ease-in-out",
            "duration-300",
            "delay-100",
          );
      }
    });
  }, [window.scrollY]);

  console.log(query, limit);

  const getNews = async (query, limit) => {
    await fetch(`http://localhost:3000/news/${query}/${limit}`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      },
    })
      .then((response) => response.json())

      .then((data) => {
        console.log(data);

        if (data?.length > 0) {
          setIsLoaded(true);

          setNews(data);
        } else {
          setNews([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      getNews(query, limit);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [query, limit]);

  return (
    <div className="m-32">
      <motion.div layout className="flex items-center justify-between">
        <span className="text-xl font-bold text-slate-600">
          Top headlines on{" "}
          <span className="font-bold capitalize text-red-600">"{query}"</span>
        </span>
        <span
          className={`flex cursor-pointer items-center gap-x-2 text-[14px] font-semibold text-slate-600 hover:text-slate-800 ${limit >= 45 || news.length === 0 || news.length < 15 ? "hidden" : ""}`}
          id="exploreBtn"
          onClick={() => handleExplore()}
        >
          Explore More{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
            />
          </svg>
        </span>
      </motion.div>
      {isLoaded && news.length > 0 && (
        <div className="my-8 grid grid-flow-row grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          <AnimatePresence>
            {news.map((article, index) => (
              <DataCard key={index} article={article} />
            ))}
          </AnimatePresence>
        </div>
      )}
      {isLoaded && news.length == 0 && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={({ duration: 0.8 }, { ease: "easeInOut" })}
          className="flex min-h-[50vh] items-center justify-center text-center text-lg font-semibold text-slate-600"
        >
          No headlines found
        </motion.span>
      )}
    </div>
  );
};

export default Content;
