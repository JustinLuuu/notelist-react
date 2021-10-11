import React, { useState, useEffect } from 'react'
import { FaPlusSquare, FaPencilRuler } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import NoteById from '../../redux/helpers/returnNoteById';
import { addNoteAsync, patchNoteAsync } from '../../redux/noteSlice';

export const FormNote = ({ history }) => {

    const dispatch = useDispatch();
    const { noteId } = useParams();

    const [note, setNote] = useState({ text: '', date: '', time: '' })
    const { text, date, time } = note;

    const handleChange = (e) => {
        setNote({ ...note, text: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (text.length >= 10) {           
            !noteId ? await dispatch(addNoteAsync({ text })) : await dispatch(patchNoteAsync({ idNote: noteId, text }));
            history.replace('/AllNotes');
        }
        else {
            alert('Para añadir una nota debe tener al menos 10 caracteres !')
        }
    }

    useEffect(() => {
        if (noteId) {
            setNote(NoteById(noteId));
        }
    }, [noteId])

    return (
        <div className="p-5">
            <header className="d-flex flex-column align-items-center">
                <h1 className="text-center">
                    {!noteId ?
                        (['Agrega una nueva nota ', <FaPlusSquare className="text-success" />]) :
                        (['Editar esta nota ', <FaPencilRuler style={{ color: 'orange' }} />])
                    }
                </h1>

                {
                    noteId && <span className="text-center text-white bg-dark w-25">
                        Escrito originalmente en {date} <br /> A las {time} ⏰
                    </span>
                }
            </header>

            <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center p-3">
                <textarea className="form-control w-50" value={text} onChange={handleChange}
                    placeholder={noteId ? 'Actualiza tu nota...' : 'Escribe aqui...'}></textarea>

                <button type="submit" className={`btn text-white fw-bold w-50 mt-3 ${!noteId && 'bg-success'}`}
                    style={{ background: noteId && 'orange' }}>

                    {noteId ? 'Editar esta nota' : 'Añadir'} !
                </button>
            </form>

            {noteId &&
                <div className="d-flex justify-content-center">
                    <Link to={'/AllNotes'}>
                        <button className='btn btn-danger w-100 text-white'>Cancelar</button>
                    </Link>
                </div>
            }
        </div>
    )
}
