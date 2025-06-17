import { useState, ChangeEvent, MouseEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Button } from 'primereact/button';

// // TODO: add new usestate(s) and display error within form
// // TODO: make form component(s) and import into CreateNote & EditNote with route-specific props
        
const CreateNote = () => {

    const navigate = useNavigate();

    // allow form fields' onChange functions to accommodate both input & text area types
    type InputChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

    const [note, setNote] = useState({
        given_name: null,
        surname: null,
        email: null,
        notes: null
    });

    const handleChange = (event: InputChangeEvent) => {
        setNote(prev => ({ ...prev, [event.target.name]: event.target.value }));
    }

    const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
        // interrupt browser's default behavior to await results of post request
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
            <Button
                label="All Notes"
                severity="secondary"
                onClick={() =>  navigate('/community-notes')}
                icon="pi pi-arrow-left" 
            />
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
                <p><Button onClick={handleSubmit} label='Add note'/></p>
            </div>
        </div>
    )
}

export default CreateNote;