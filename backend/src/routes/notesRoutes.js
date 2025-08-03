import express from "express";
import { createNote, deleteNote, getNotes, updateNote, getNoteById} from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getNotes);
router.post("/",createNote);
router.get("/:id",getNoteById);
router.put("/:id",updateNote);
router.delete("/:id",deleteNote);

export default router;