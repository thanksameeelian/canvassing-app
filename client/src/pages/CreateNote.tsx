import { useState, ChangeEvent, MouseEvent } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const CreateNote = () => {
    // // TODO: add new usestate(s) and display error within form
    // // TODO: IF EditNote, make form component(s) and import into CreateNote & EditNote with route-specific props

    type InputChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

    const [note, setNote] = useState({
        given_name: null,
        surname: null,
        email: null,
        notes: null
    });

    const navigate = useNavigate();

    const handleChange = (event: InputChangeEvent) => {
        setNote(prev => ({ ...prev, [event.target.name]: event.target.value }));
    }

    const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        try {
            await axios.post("http://localhost:8080/community-notes", note);
            navigate("/community-notes");
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Link to="/community-notes">notes list</Link>

            <div className="form">
                <h1>Create Note</h1>
                <p>
                    <label>
                        Given name
                        <input type="text" placeholder="Example" name="given_name" onChange={handleChange}/>
                    </label>
                </p>
                <p>
                    <label>
                        Surname
                        <input type="text" placeholder="Exampleson" name="surname" onChange={handleChange}/>
                    </label>
                </p>
                <p>
                    <label>
                        Email address
                        <input type="email" placeholder="example.exampleson@examples.com" name="email" onChange={handleChange}/>
                    </label>
                </p>
                <p>
                    <label>
                        Notes
                        <textarea placeholder="Notes about community member" name="notes" onChange={handleChange}/>
                    </label>
                </p>
                <p><button onClick={handleSubmit}>Add note</button></p>
            </div>
        </div>
    )
}

export default CreateNote;