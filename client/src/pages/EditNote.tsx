import { useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from 'primereact/button';    

import { Note } from '../interfaces/interfaces';

const EditNote = () => {

    const navigate = useNavigate();

    // id was sent in path that brought us here
    const { id } = useParams();

    const [note, setNote] = useState<Note | null>(null);

    // allow form fields' onChange functions to accommodate both input & text area types
    type InputChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

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

    // constantly update focused input and account for it not aligning to Note interface while in-process
    const handleChange = (event: InputChangeEvent) => {
        setNote(prev => prev ? { ...prev, [event.target.name]: event.target.value } : prev as Note | null);
    }

    const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
        // interrupt browser's default behavior to await results of post request
        event.preventDefault()
        try {            
            await axios.put("http://localhost:8080/community-notes/" + id, note);
            navigate(`/community-notes/${id}`);
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

    // // TODO: display "_____ cannot be null" validation errors to user

    return (
        <div>
            <Button
                label="All Notes"
                severity="secondary"
                onClick={() =>  navigate('/community-notes')}
                icon="pi pi-arrow-left" 
            />
            { note &&
                <div className="form">
                    <h1>Edit Note</h1>
                    <p>
                        <label>
                            Given name
                            <input type="text" placeholder="Example" name="given_name" defaultValue={note.given_name} onChange={handleChange}/>
                        </label>
                    </p>
                    <p>
                        <label>
                            Surname
                            <input type="text" placeholder="Exampleson" name="surname" defaultValue={note.surname} onChange={handleChange}/>
                        </label>
                    </p>
                    <p>
                        <label>
                            Email address
                            <input type="email" placeholder="example.exampleson@examples.com" name="email" defaultValue={note.email} onChange={handleChange}/>
                        </label>
                    </p>
                    <p>
                        <label>
                            Notes
                            <textarea placeholder="Notes about community member" name="notes" defaultValue={note.notes} onChange={handleChange}/>
                        </label>
                    </p>
                    <p style={{display: 'flex', gap: '5px'}}>
                        <Button onClick={handleSubmit} label='Submit changes'/>            
                        <Button 
                            className="delete" 
                            severity="danger" 
                            outlined 
                            onClick={() => handleDelete(note.id)} 
                            label="Delete"
                        />
                    </p>
                </div>
            }
        </div>
    )
}

export default EditNote;