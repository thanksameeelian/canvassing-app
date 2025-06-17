import express from 'express';
import cors from 'cors';

import { 
    getCommunityNotes,
    createCommunityNote,
    getCommunityNote,
    editCommunityNote,
    deleteCommunityNote 
} from './database.js';


const app = express();
app.use(express.json());
app.use(cors());

app.get("/community-notes", async (req, res) => {
    const notes = await getCommunityNotes();
    res.json(notes);
});

app.post("/community-notes", async (req, res) => {
    const { given_name, surname, notes, email } = req.body; 
    const member = await createCommunityNote(given_name, surname, notes, email); 
    res.status(201).json(member);
});

app.get("/community-notes/:id", async (req, res) => {
    const id = req.params.id;
    const note = await getCommunityNote(id);
    if (!note) throw new TypeError(`No known user with id ${id}`); 
    res.json(note);
});

app.put("/community-notes/:id", async (req, res) => {
    const id = req.params.id;
    const { given_name, surname, notes, email } = req.body;
    const note = await editCommunityNote(given_name, surname, notes, email, id);
    res.json(note);
})

app.delete("/community-notes/:id", async (req, res) => {
    const noteId = req.params.id;
    const result = await deleteCommunityNote(noteId);
    // expect result (affected db table rows) to === 1 as 1 user has been deleted
    if (result === 1) {
        res.sendStatus(204)
    } else {
        res.status(500).json('Something broke!')
    }
});

app.use((err, req, res, next) => {
    // // TODO: add more robust/descriptive error handling here
    console.error(err.stack);
    res.status(500).json('Something broke!');
});

app.listen(8080, () => {
    console.log('Server running on port 8080');
});