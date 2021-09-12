import React from 'react'
import {FaPlusSquare} from 'react-icons/fa';


export const FormAdd = ({ submitEvent, textAreaRef }) => {
    return (
        <>
            <h1 className="text-center">
                {(['Agrega una nueva nota ', <FaPlusSquare className="text-success" /> ])}
            </h1>

            <form onSubmit={submitEvent} name="add-note" className="d-flex flex-column align-items-center p-3">
                <textarea className="form-control w-50" ref={textAreaRef} placeholder="Escribe aqui.."></textarea>

                <button type="submit" className="btn btn-success w-50 mt-3">
                    Añadir !
                </button>
            </form>
        </>
    )
}
