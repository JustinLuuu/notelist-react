import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotesAsync } from '../../redux/noteSlice';
import NoteItem from './NoteItem';

const NoteList = () => {

    const { didPetition, listNotes } = useSelector(state => state.notes);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!didPetition && listNotes.length === 0)
            dispatch(getNotesAsync());

        localStorage.setItem('notes', JSON.stringify(listNotes));
    }, [listNotes])

    return (
        <div className="mt-5">
            <h1 className="text-center">
                Tus notas: <span className="badge bg-secondary">{listNotes.length}</span>
            </h1>

            <ul className='list-group'>
                {listNotes.map((note) => (
                    <NoteItem key={note.id} note={note} />
                ))}
            </ul>
        </div>
    );
};

export default NoteList;