import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import { Button } from 'primereact/button';

import { Note } from '../interfaces/interfaces';


const ViewNote = () => {    
    
    const navigate = useNavigate();

    // id was sent in path that brought us here
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

    return (
        <div>
            {note && (
                <div>
                    <Button
                        label="All Notes"
                        severity="secondary"
                        onClick={() =>  navigate('/community-notes')}
                        icon="pi pi-arrow-left" 
                    />
                    <div style={{justifyContent: 'center', alignItems: 'center'}}>
                    <div>Note Details {id}</div>
                    <div>{note.given_name} {note.surname}</div>
                    <div>{note.email}</div>
                    <div>{note.notes}</div>
                    <p style={{display:"flex", gap: '5px'}}>
                        <Button className="edit" onClick={() => handleEdit(note.id)} label="Edit"/>
                        <Button className="delete" severity="danger" outlined onClick={() => handleDelete(note.id)} label="Delete"/>
                    </p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ViewNote;