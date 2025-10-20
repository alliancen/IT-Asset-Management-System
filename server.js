// Import dependencies
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(express.json());
app.use(express.static(__dirname)); // Serves your HTML and static files

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Define schema and model
const assetSchema = new mongoose.Schema({
  name: String,
  category: String,
  assignedTo: String,
  purchaseDate: Date
});

const Asset = mongoose.model("Asset", assetSchema);

// Routes
app.post("/add-asset", async (req, res) => {
  try {
    const newAsset = new Asset(req.body);
    await newAsset.save();
    res.status(201).send("✅ Asset added successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding asset.");
  }
});

app.get("/get-assets", async (req, res) => {
  try {
    const assets = await Asset.find();
    res.json(assets);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching assets.");
  }
});

// Serve HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "IT Asset Management System.html"));
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
