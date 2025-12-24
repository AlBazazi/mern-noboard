import Note from "../models/Note.js";

export async function getNotes(req, res) {
    try {
        const userId = req.user && req.user.id;
        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const notes = await Note.find({ owner: userId }).sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getNotes: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getNoteById(req, res) {
    try {
        const userId = req.user && req.user.id;
        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: "Note with this id does not exist" });
        if (note.owner.toString() !== userId.toString()) return res.status(403).json({ message: "Forbidden" });
        res.status(200).json(note);
    } catch (error) {
        console.error("Error in getNoteById", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function createNote(req, res) {
    try {
        const userId = req.user && req.user.id;
        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const { title, content } = req.body;
        const newNote = new Note({ title, content, owner: userId });
        await newNote.save();
        res.status(201).json({ message: "Note created successfully", note: newNote });
    } catch (error) {
        console.error("Error in createNote: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function updateNote(req, res) {
    try {
        const userId = req.user && req.user.id;
        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: "Note not found" });
        if (note.owner.toString() !== userId.toString()) return res.status(403).json({ message: "Forbidden" });

        const { title, content } = req.body;
        note.title = title;
        note.content = content;
        await note.save();
        res.status(200).json({ message: "Note updated successfully", note });
    } catch (error) {
        console.error("Error in updateNote: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function deleteNote(req, res) {
    try {
        const userId = req.user && req.user.id;
        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: "Note not found" });
        if (note.owner.toString() !== userId.toString()) return res.status(403).json({ message: "Forbidden" });

        await Note.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        console.error("Error in deleteNote: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }

}