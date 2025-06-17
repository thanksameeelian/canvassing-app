import axios from 'axios';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CSVLink } from 'react-csv';


import { Note } from '../interfaces/interfaces';

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

    // for CSV creation
    const ISOdate = new Date().toISOString();
    const formattedDate = ISOdate.slice(0, 10); // YY-MM-DD
    const headers = [
        { label: "Given Name", key: "given_name" },
        { label: "Surname", key: "surname" },
        { label: "Email", key: "email" },
        { label: "Notes", key: "notes" }
    ];

    return (
        <div>
            <button><Link to="/create-note">Add new note</Link></button>
            <h1>Canvassing Notes</h1>
            {noteDetails.length && 
                <CSVLink data={noteDetails} headers={headers} filename={`Canvassing-Notes-${formattedDate}.csv`}>
                    Download CSV
                </CSVLink>
                }  
            <table>
                <thead>
                    <tr>
                        <th scope="col">Given Name</th>
                        <th scope="col">Surname</th>
                        <th scope="col">Email</th>
                        <th scope="col">Notes</th>
                        <th scope="col">Details</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {noteDetails.map(noteDetail => (
                        <tr className="noteDetail" key={noteDetail.id}>
                            <td>{noteDetail.given_name}</td>
                            <td>{noteDetail.surname}</td>
                            <td>{noteDetail.email}</td>
                            <td>{noteDetail.notes}</td>
                            <td><button className="details"><Link to={`${noteDetail.id}`}>See details</Link></button></td>
                            <td><button><Link to={`edit/${noteDetail.id}`}>Edit</Link></button></td>
                            <td><button className="delete" onClick={() => handleDelete(noteDetail.id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CommunityNotes;
