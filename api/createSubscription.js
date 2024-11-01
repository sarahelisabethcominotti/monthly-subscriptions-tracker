const mongoose = require("./db");
const SubscriptionModel = require("./models/Subscriptions");

module.exports = async (req, res) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://monthly-subscription-vercel.vercel.app/"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");

  if (req.method === "POST") {
    try {
      const newSubscription = new SubscriptionModel(req.body);
      const savedSubscription = await newSubscription.save();
      res.status(201).json(savedSubscription);
    } catch (err) {
      console.error("Error saving subscription:", err); // Log error to server console
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
};
