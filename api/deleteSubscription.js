const mongoose = require("./db");
const SubscriptionModel = require("./models/Subscriptions");

module.exports = async (req, res) => {
  console.log("Request received with method:", req.method, "and ID:", req.query.id);

  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://monthly-subscription-vercel.vercel.app/"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  // res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // if (req.method === "OPTIONS") {
  //   res.status(200).end();
  //   return;
  // }


  if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      console.log("Deleting subscription with ID:", id);

      const deletedSubscription = await SubscriptionModel.findByIdAndDelete(id);

      if (!deletedSubscription) {
        return res.status(404).json({ message: "Subscription not found" });
      }

      res.status(200).json({ message: "Subscription deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
};
