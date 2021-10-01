import React from 'react'
import { FaPencilRuler, FaTrashAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux'
import { deleteNoteAsync } from '../../redux/noteSlice';
import '../../css/NoteItem.css'
import { Link } from 'react-router-dom';

export const NoteItem = ({ note }) => {

    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteNoteAsync({ idNote: note.id }));
    }

    return (
        <li className="list-group-item p-3" key={note.id}>

            <div className="bg-primary text-white text-center fw-bold p-2 w-50 m-auto rounded-pill">
                {note.text}
                <br />
                <span className="badge bg-dark mt-2">{note.date}</span>
                <span className="badge bg-white text-dark mt-2 ms-3">⏰ {note.time}</span>
            </div>

            <div className="m-auto w-25 mt-3 d-flex justify-content-center">
                <Link to={`./FormNote/${note.id}`}>
                    <button className='btn btn-warning me-3 text-white'> <FaPencilRuler /> </button>
                </Link>

                <button className='btn btn-danger' onClick={handleDelete}> <FaTrashAlt /> </button>
            </div>
        </li>
    )
}

export default NoteItem;