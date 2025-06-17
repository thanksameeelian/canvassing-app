import express from 'express';
import cors from 'cors';

import { 
    getCommunityNotes, 
} from './database.js';


const app = express();
app.use(express.json());
app.use(cors());

app.get("/community-notes", async (req, res) => {
    const notes = await getCommunityNotes();
    res.json(notes);
});

app.use((err, req, res, next) => {
    // // TODO: add more robust/descriptive error handling here
    console.error(err.stack);
    res.status(500).json('Something broke!');
});

app.listen(8080, () => {
    console.log('Server running on port 8080');
});