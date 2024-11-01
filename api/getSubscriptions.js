const mongoose = require("./db");
const SubscriptionModel = require("./models/Subscriptions");

module.exports = async (req, res) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://monthly-subscription-vercel.vercel.app/"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");

  if (req.method === "GET") {
    try {
      const result = await SubscriptionModel.find({});
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
};
