import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import notesRoutes from "./routes/notesRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./config/db.js";
//import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

if(process.env.NODE_ENV !== "production") {
app.use(cors({
      origin: "http://127.0.0.1:4173",
    })
);
}
app.use(cors());
app.use(express.json());
// app.use(rateLimiter);
app.use("/api/auth", authRoutes);
app.use("/api/notes",notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("App Listening on PORT: ",PORT);
    });
});
