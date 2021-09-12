import React, { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserAsync } from '../../redux/userSlice';

export const Login = ({history}) => {

    const dispatch = useDispatch();

    const [formState, setFormState] = useState({username: '', password: ''});
    const {username, password} = formState;

    const handleChange = (e) =>{
        setFormState({...formState, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e)=>{
        e.preventDefault();

        if(username && password){
            dispatch(getUserAsync({username, password})) // recordar que el dispatch retorna una promesa luego del fulfilled del reducer
            .then(({payload})=> {
                if(Object.keys(payload.info).length>0){
                    history.replace('AllNotes');
                }
                else{
                    alert('usuario inexistente !');
                }
            })
        }
    }

    return (
        <div style={{ padding: 30 }}>

            <header className="d-flex flex-column align-items-center">
                <FaUserCircle size={70} />
                <h1>Inicia Sesion</h1>
            </header>

            <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center p-2">

                <label className="fw-bold m-2">Username</label>
                <input type="text" name="username" value={username} 
                onChange={handleChange} className="form-control w-25" />

                <label className="fw-bold m-2">Contraseña</label>
                <input type="password" name="password" value={password} 
                onChange={handleChange} className="form-control w-25" />

                <button type="submit" className="btn btn-primary mt-2 w-25">Iniciar</button>
            </form>

            <footer className="d-flex justify-content-center">
                <Link to="/registro">No tienes cuenta? Registrate</Link>
            </footer>
        </div>
    )
}

export default Login;