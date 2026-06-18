import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  credentials: true
}));
app.use(express.json());
app.use("/api/notes",notesRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("App Listening on PORT: ",PORT);
    });
});
