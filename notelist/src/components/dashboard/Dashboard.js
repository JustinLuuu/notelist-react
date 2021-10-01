import React from 'react'
import { Route, Redirect, Switch } from "react-router-dom";
import { FormNote } from './FormNote'
import Navbar from './Navbar'
import NoteList from './NoteList'

export const Dashboard = () => {
    
    return (
        <div>
            <Navbar />

            <div>
                <Switch>
                    <Route exact path="/AllNotes" component={NoteList} />
                    <Route exact path="/FormNote" component={FormNote} />
                    <Route exact path="/FormNote/:noteId" component={FormNote} />

                    <Redirect to="/AllNotes" />
                </Switch>
            </div>
        </div>
    )
}
