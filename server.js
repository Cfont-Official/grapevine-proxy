 import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const BING_KEY = process.env.BING_KEY;

app.get("/api/search", async (req, res) => {
  const q = req.query.q;
  if (!q) return res.status(400).json({ error: "Missing search query" });

  const url = `https://api.bing.microsoft.com/v7.0/images/search?q=${encodeURIComponent(q)}&safeSearch=Moderate`;
  const response = await fetch(url, {
    headers: { "Ocp-Apim-Subscription-Key": BING_KEY },
  });
  const data = await response.json();
  res.json(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
