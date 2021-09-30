import React, { useState } from 'react'
import { FaPencilAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { createUserAsync } from '../../redux/userSlice';

export const Registro = ({ history }) => {

    const dispatch = useDispatch();

    const [Formstate, setFormState] = useState({ fullname: '', username: '', password: '' })
    const { fullname, username, password } = Formstate;

    const handleChange = (e) => {
        setFormState({ ...Formstate, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (fullname && username && password) {
            dispatch(createUserAsync({ fullname, username, password })) // recordar que el dispatch retorna una promesa luego del fulfilled del reducer
            .then(() => {
                history.replace('AllNotes');
            })
        }
    }

    return (
        <div style={{ padding: 30 }}>

            <header className="d-flex flex-column align-items-center">
                <FaPencilAlt size={70} />
                <h1>Registrate</h1>
            </header>

            <form onClick={handleSubmit} className="d-flex flex-column align-items-center p-2">
                <label className="fw-bold m-2">Nombre completo</label>
                <input type="text" name="fullname" value={fullname}
                    onChange={handleChange} className="form-control w-25" />

                <label className="fw-bold m-2">Username</label>
                <input type="text" name="username" value={username}
                    onChange={handleChange} className="form-control w-25" />

                <label className="fw-bold m-2">Contraseña</label>
                <input type="password" name="password" value={password}
                    onChange={handleChange} className="form-control w-25" />

                <button type="submit" className="btn btn-primary mt-2 w-25">Registrarme</button>
            </form>

            <footer className="d-flex justify-content-center">
                <Link to="/login">Ya tienes cuenta? Inicia Sesion</Link>
            </footer>
        </div>

    )
}

export default Registro;