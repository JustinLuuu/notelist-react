import { createSlice, createAsyncThunk, current, original } from "@reduxjs/toolkit";
import returnIdUser from "../helpers/returnIdUser";

export const getNotesAsync = createAsyncThunk(
    'notes/getNotesAsync',
    async () => {
        const response = await fetch(`http://localhost:7000/notes/${returnIdUser()}`);
        if (response.ok) {
            const notes = await response.json();
            return { notes };
        }
    }
)

export const addNoteAsync = createAsyncThunk(
    'notes/addNoteAsync',
    async (payload) => {
        const response = await fetch('http://localhost:7000/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({idUser: returnIdUser(), text: payload.text})
        });
        if (response.ok) {
            const note = await response.json();
            return { note };
        }
    }
)

export const patchNoteAsync = createAsyncThunk(
    'notes/patchNoteAsync',
    async (payload) => {
        const response = await fetch(`http://localhost:7000/notes/${payload.idNote}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({text: payload.text})
        });
        if (response.ok) {
            const notes = await response.json();
            return { notes };
        }
    }
)

export const deleteNoteAsync = createAsyncThunk(
    'notes/deleteNoteAsync',
    async (payload) => {
        const response = await fetch(`http://localhost:7000/notes/${payload.idNote}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const notes = await response.json();
            return { notes };
        }
    }
)

const noteSlice = createSlice({
    name: 'note',
    initialState: {
        didPetition: false,
        listNotes: JSON.parse(localStorage.getItem('notes')) || [] 
    },
    reducers: {
        clearNotes: (state, action) => {
            return {didPetition: false, listNotes: []};
        }
    },
    extraReducers: {
        [getNotesAsync.fulfilled]: (state, action) => {
            return {didPetition: true, listNotes: action.payload.notes};
        },
        [addNoteAsync.fulfilled]: (state, action) => {
            state.listNotes.push(action.payload.note);
        },
        [deleteNoteAsync.fulfilled]: (state, action) => {
            state.listNotes= action.payload.notes;
        },
        [patchNoteAsync.fulfilled]: (state, action) => { 
            return {didPetition: true, listNotes: action.payload.notes};
        }
    }
});

export const { clearNotes } = noteSlice.actions;
export default noteSlice.reducer;