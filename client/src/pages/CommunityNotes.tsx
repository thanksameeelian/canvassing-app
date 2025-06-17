import axios from 'axios';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CSVLink } from 'react-csv';

import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { DataTableFilterMeta } from 'primereact/datatable';

import { Note } from '../interfaces/interfaces';

const CommunityNotes = () => {
    const navigate = useNavigate();

    const [noteDetails, setNoteDetails] = useState<Note[]>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [filters, setFilters] = useState<DataTableFilterMeta>({});

    useEffect(() => {
        const fetchNoteDetails = async () => {
            try {
                const res = await axios.get("http://localhost:8080/community-notes");
                setNoteDetails(res.data);
            } catch(error) {
                console.log(error);
            }
        }
        fetchNoteDetails();
    }, [])

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

    // view, edit, and delete buttons for table rows
    const actionButtons = (rowData: any) => {
        return (
            <p>
                <Button
                    icon="pi pi-eye"
                    className="p-button-rounded p-button-text p-button-info"
                    tooltip="View"
                    onClick={() => navigate(`${rowData.id}`)}
                />
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-text p-button-warning"
                    tooltip="Edit"
                    onClick={() => navigate(`edit/${rowData.id}`)}
                />
                <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-text p-button-danger"
                    tooltip="Delete"
                    onClick={() => handleDelete(rowData.id)}
                />
            </p>
        );
    };

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
            <h1 style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                Canvassing Notes
            </h1>            
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px', margin: '30px'}}>            
                <Button 
                    label="Add New Note"
                    icon="pi pi-plus" 
                    iconPos="left"
                    onClick={() =>  navigate('/create-note')}
                />
                {noteDetails.length && 
                    <CSVLink data={noteDetails} headers={headers} filename={`Canvassing-Notes-${formattedDate}.csv`}>
                        <Button icon="pi pi-download" label="Export CSV" />
                    </CSVLink>
                 }
            </div>
            <div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <InputText
                        placeholder="Search..."
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                    />
                </div>
                <DataTable
                    value={noteDetails}
                    sortMode="multiple"
                    dataKey="id"
                    globalFilterFields={['given_name', 'surname', 'email', 'notes']}
                    emptyMessage="No notes found."
                    filters={{ global: { value: globalFilter, matchMode: 'contains' } }}
                    onFilter={(e) => setFilters(e.filters)}
                >
                    <Column field="given_name" header="Given Name" sortable style={{ minWidth: '12rem' }} />
                    <Column field="surname" header="Surname" sortable style={{ minWidth: '12rem' }} />
                    <Column field="email" header="Email" sortable style={{ minWidth: '12rem' }} />
                    <Column field="notes" header="Notes" sortable style={{ minWidth: '12rem' }} />
                    <Column body={actionButtons} header="Actions" style={{ width: '12rem' }} />
                </DataTable>
            </div>
        </div>
    )
}

export default CommunityNotes;
