import axios from 'axios';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Note {
    id: number;
    given_name: string;
    surname: string;
    email: string;
    notes: string;
}

const CommunityNotes = () => {

    const [noteDetails, setNoteDetails] = useState<Note[]>([]);

    useEffect(() => {
        const fetchNoteDetails = async () => {
            try {
                const res = await axios.get("http://localhost:8080/community-notes");
                setNoteDetails(res.data);
            } catch(error) {
                // // TODO: display message explaining error
                console.log(error);
            }
        }
        fetchNoteDetails();
    }, [])

    // // TODO: HANDLE TABLE FORMATTING/DISPLAY IF NO NOTES

    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this note?")) {
            try {
                await axios.delete("http://localhost:8080/community-notes/"+ id);
                window.location.reload();
            } catch(error) {
                console.log(error);
            }
        }
    }

    return (
        <div>
            <h1>Canvassing Notes</h1>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Given Name</th>
                        <th scope="col">Surname</th>
                        <th scope="col">Email</th>
                        <th scope="col">Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {noteDetails.map(noteDetail => (
                        <tr className="noteDetail" key={noteDetail.id}>
                            <td>{noteDetail.given_name}</td>
                            <td>{noteDetail.surname}</td>
                            <td>{noteDetail.email}</td>
                            <td>{noteDetail.notes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CommunityNotes;
