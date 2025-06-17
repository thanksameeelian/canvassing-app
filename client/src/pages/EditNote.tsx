import { useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { Note } from '../interfaces/interfaces';

const EditNote = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    type InputChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

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

    const handleChange = (event: InputChangeEvent) => {
        setNote(prev => prev ? { ...prev, [event.target.name]: event.target.value } : prev as Note | null);
    }

    const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        try {            
            await axios.put("http://localhost:8080/community-notes/" + id, note);
            navigate(`/community-notes/${id}`);
        } catch(error) {
            console.log(error);
        }
    }

    // // TODO: display "_____ cannot be null" errors to user

    return (
        <div>
            <button><Link to="/">Home</Link></button>
            <Link to="/community-notes">notes list</Link>
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
                    <p><button onClick={handleSubmit}>Submit changes</button></p>
                </div>
            }
        </div>
    )
}

export default EditNote;