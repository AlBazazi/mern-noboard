import express from "express";
import { createNote, deleteNote, getNotes, updateNote, getNoteById} from "../controllers/notesController.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();

router.use(authenticateToken);
router.get("/", getNotes);
router.post("/", createNote);
router.get("/:id", getNoteById);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;