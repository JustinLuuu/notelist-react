import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Dashboard } from '../components/dashboard/Dashboard'
import Login from '../components/login/Login'
import Registro from '../components/registro/Registro'
import { PrivateRoute } from './PrivateRoute'

export const AppRouter = () => {

    const user = useSelector(state => state.user);
    
    useEffect(() => {        
        localStorage.setItem('user', JSON.stringify(user));
    }, [user])

    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/login" component={Login} />  
                    <Route path="/registro" component={Registro} />  
                    <PrivateRoute path="/" component={Dashboard} isAuthenticated={user.isAuthenticated} />
                </Switch>
            </div>
        </Router>
    )
}
