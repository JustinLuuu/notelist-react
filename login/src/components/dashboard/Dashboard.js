import React from 'react'
import { Route, Redirect, Switch } from "react-router-dom";
import { FormLayout } from './Forms/FormLayout'
import Navbar from './Navbar'
import NoteList from './NoteList'

export const Dashboard = () => {
    
    return (
        <div>
            <Navbar />

            <div>
                <Switch>
                    <Route exact path="/FormNote" component={FormLayout} />
                    <Route exact path="/FormNote/:noteId" component={FormLayout} />
                    <Route exact path="/AllNotes" component={NoteList} />

                    <Redirect to="/AllNotes" />
                </Switch>
            </div>
        </div>
    )
}
