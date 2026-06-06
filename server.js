const express = require("express");
const fs = require("fs-extra");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

const NOTES_FILE = "notes.json";

app.get("/api/notes", async (req, res) => {
    const notes = await fs.readJson(NOTES_FILE);
    res.json(notes);
});

app.post("/api/notes", async (req, res) => {
    const notes = await fs.readJson(NOTES_FILE);

    const newNote = {
        id: Date.now(),
        text: req.body.text
    };

    notes.push(newNote);

    await fs.writeJson(NOTES_FILE, notes);

    res.json(newNote);
});

app.delete("/api/notes/:id", async (req, res) => {
    const notes = await fs.readJson(NOTES_FILE);

    const updated = notes.filter(
        note => note.id != req.params.id
    );

    await fs.writeJson(NOTES_FILE, updated);

    res.json({ message: "Deleted" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});