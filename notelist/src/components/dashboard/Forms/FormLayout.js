import React, { useRef } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addNoteAsync, patchNoteAsync } from '../../../redux/noteSlice';
import { FormAdd } from './FormAdd';
import { FormEdit } from './FormEdit';

export const FormLayout = ({ history }) => {

    const dispatch = useDispatch();
    const textArea = useRef();
    const { noteId } = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();
        const note = textArea.current.value;

        if (note.length > 10) {
            if (e.target.name === 'add-note')
            dispatch(addNoteAsync({ text: note })).then(()=>{history.replace('AllNotes')})
            else
            dispatch(patchNoteAsync({ idNote: noteId, text: note })).then(()=>{history.replace('AllNotes')})
        }
    }

    return (
        <div className="p-5">
            {
                !noteId ?
                (<FormAdd submitEvent={handleSubmit} textAreaRef={textArea} />) :
                (<FormEdit submitEvent={handleSubmit} textAreaRef={textArea} noteId={noteId} />)
            }
        </div>
    )
}
