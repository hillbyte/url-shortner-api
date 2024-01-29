require("dotenv").config();
const express = require("express");
const shortid = require("shortid");
const cors = require("cors");

const { connectDB } = require("./db.js");
const app = express();
app.use(
  express.json({
    limit: "1mb",
  }),
);
app.use(cors());
connectDB();
//route imports
const urlRoute = require("./router/url.route.js");
const { Url } = require("./models/url.model.js");

app.use("/url", urlRoute);
app.get("/", async (req, res) => {
  res.send("URL Shortner Api ");
});

//url redirection route
app.get("/:shortId", async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const entry = await Url.findOneAndUpdate(
      {
        shortId,
      },
      {
        $push: {
          visitHistory: {
            timestamps: Date.now(),
          },
        },
      },
    );
    res.redirect(entry?.redirectUrl);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

const PORT = process.env.PORT || 8005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
module.exports = app;
