import express from 'express';
import cors from 'cors';

import { 
    getCommunityNotes,
    createCommunityNote,
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

app.delete("/community-notes/:id", async (req, res) => {
    const noteId = req.params.id;
    const result = await deleteCommunityNote(noteId);
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