import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const DataCard = ({ article }) => {
  const [time, setTime] = useState(null);

  const getFormattedTime = (time) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const date = new Date(time);
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  useEffect(() => {
    setTime(Math.ceil((Math.random().toFixed(2, 200) / 60) * 1000));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      key={article.url}
      className="my-5 h-auto cursor-pointer rounded-lg shadow-xl transition-transform hover:scale-105"
    >
      <Link to={article.url} target="_blank" rel="noreferrer">
        <img
          src={article.urlToImage}
          alt=""
          className="h-52 w-full object-cover"
        />
        <div className="flex flex-col gap-y-3 p-5">
          <div className="flex items-center gap-x-5">
            <span className="w-fit rounded-xl bg-red-600 px-2.5 py-1.5 text-[13px] font-semibold text-white">
              {article.source.name?.split(" ").slice(0, 2).join(" ")}
            </span>
            <p className="my-2 flex w-fit items-center rounded-lg text-[12px] font-bold text-slate-700">
              {getFormattedTime(article.publishedAt)}
            </p>
          </div>
          <span className="text-lg font-bold text-slate-700">
            {article.title}
          </span>
          <p className="truncate font-semibold text-slate-500">
            {article.description}
          </p>
          <p className="my-2 flex w-fit items-center rounded-lg text-[12px] font-bold text-red-600">
            {time} min read
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default DataCard;
