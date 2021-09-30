import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { clearNotes } from '../../redux/noteSlice'
import { logout } from '../../redux/userSlice'

export const Navbar = () => {

    const {info} = useSelector(state => state.user)
    const dispatch = useDispatch();

    const handleLogout = () =>{
        dispatch(logout({}));
        dispatch(clearNotes());
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark ps-4">
            <div className="navbar-brand">
                NoteList App
            </div>

            <NavLink
                activeClassName="active"
                className="nav-item nav-link"
                exact
                to="/FormNote"
            >
                Nueva nota
            </NavLink>

            <NavLink
                activeClassName="active"
                className="nav-item nav-link"
                exact
                to="/AllNotes"
            >
                Mis notas
            </NavLink>

            <div className="navbar-nav ms-auto pe-5">
                <div className="nav-item p-2">
                    <span className="text-white me-4">
                        Bienvenido {info.fullname} ({info.username.toUpperCase()})
                    </span>
                </div>

                <div className="nav-item">
                    <button
                        className="btn btn-danger"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar