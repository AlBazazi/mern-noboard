import express from "express";
import dotenv from "dotenv";
import path from "path";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(express.json());
app.use(rateLimiter);
app.use("/notes",notesRoutes);

app.use(express.static(path.join(__dirname,"../frontend/dist")));
app.get("*",(res,req) => {
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("App Listening on PORT: ",PORT);
    });
});
