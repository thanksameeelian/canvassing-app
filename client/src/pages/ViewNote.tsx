import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';

import { Note } from '../interfaces/interfaces';


const ViewNote = () => {    
    
    const navigate = useNavigate();

    const { id } = useParams();

    const [note, setNote] = useState<Note | null>(null);
    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await axios.get("http://localhost:8080/community-notes/" + id);
                setNote(res.data);
            } catch(error) {
                console.log(error);
                navigate("/not-found");
            }
        }
        fetchNote();
    }, [id, navigate])

    const handleEdit = async (id: number) => {
        try {
            navigate(`/community-notes/edit/${id}`);
        } catch(error) {
            console.log(error);
        }
    }

    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this note?")) {
            try {
                await axios.delete("http://localhost:8080/community-notes/"+ id);
                navigate("/community-notes");
            } catch(error) {
                console.log(error);
            }
        }
    }

    // // TO DO: when nonexistent id, ensure unnavigable OR empty state displaying explanatory content -- || rather than &&
    return (
        <div>
            {note && (
                <div>
                    <Link to="/community-notes">notes list</Link>

                    <div>VIEW NOTE DETAILS {id}</div>
                    <div>{note.given_name} {note.surname}</div>
                    <div>{note.email}</div>
                    <div>{note.notes}</div>

                    <button className="edit" onClick={() => handleEdit(note.id)}>Edit</button>
                    <button className="delete" onClick={() => handleDelete(note.id)}>Delete</button>
                </div>
            )}
        </div>
    )
}

export default ViewNote;