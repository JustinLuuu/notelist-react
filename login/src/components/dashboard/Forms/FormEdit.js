import React, { useState } from 'react'
import { FaPencilRuler } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';


export const FormEdit = ({ submitEvent, textAreaRef, noteId }) => {

    const note = useSelector(state => state.notes.listNotes).find(n => n.id === noteId);
    const [textState, setTextState] = useState(note?.text);

    if (!note)
        return <Redirect to="/AllNotes" />

    return (
        <>
            <header className="d-flex flex-column align-items-center">
                <h1 className="text-center">
                    {(['Editar esta nota ', <FaPencilRuler style={{ color: 'orange' }} />])}
                </h1>
                <span className="text-center text-white bg-dark w-25">
                    Escrito originalmente en {note.date} <br />
                    A las {note.time} ⏰
                </span>
            </header>

            <form onSubmit={submitEvent} name="edit-note" className="d-flex flex-column align-items-center p-3">
                <textarea className="form-control w-50" ref={textAreaRef}
                    value={textState} onChange={(e) => { setTextState(e.target.value) }}
                    placeholder="Actualiza tu nota.."></textarea>

                <button type="submit" className="btn text-white fw-bold w-50 mt-3" style={{ background: 'orange' }}>
                    Editar esta nota !
                </button>
            </form>

            <div className="d-flex justify-content-center">
                <Link to={'/AllNotes'}>
                    <button className='btn btn-danger w-100 text-white'>Cancelar</button>
                </Link>
            </div>
        </>
    )
}
