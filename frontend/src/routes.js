import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom"

import Dashboard from './pages/Dashboard'
import UpdateDeveloper from './pages/UpdateDeveloper'
import CreateDeveloper from './pages/CreateDeveloper'

function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/updatedeveloper/:id" component={UpdateDeveloper} />
                <Route path="/craetedeveloper" component={CreateDeveloper} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes