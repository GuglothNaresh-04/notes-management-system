require("dotenv").config();

const express = require("express");
require("./config/database");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const notesRoutes=require("./routes/notes");
const errorHandler = require("./middleware/errorHandler");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/notes",notesRoutes);
app.get("/", (req, res) => {
    res.send("Notes App Server is Running...");
});

const PORT = process.env.PORT || 3000;
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});