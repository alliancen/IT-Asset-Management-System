const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname)));

// Serve your main HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "IT Asset Management System.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
