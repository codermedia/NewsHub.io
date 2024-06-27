const express = require("express");

const router = express.Router();

const apikey = process.env.NEWS_API_KEY;
const url = process.env.NEWS_BASE_URL;

router.get("/:query/:limit", async (req, res) => {
  const { query } = req.params;
  const { limit } = req.params;

  await fetch(
    `${url}?q=${query}&sortBy=popularity&pageSize=${limit}&apiKey=${apikey}`,
    {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      },
    },
  )
    .then((response) => response.json())
    .then((data) => {
      const dt = data.articles.filter(
        (item) =>
          item.urlToImage !== null &&
          item.description !== null &&
          item.publishedAt !== null,
      );
      return res.json(dt);
    })
    .catch((error) => console.log(error));
});

module.exports = router;
