import React from "react"
import {Route,Switch} from "react-router-dom"
import * as ROUTES from '../constants/routes'
import RentNav from '../containers/rentNav'
import RentByOwner from '../pages/rentals/rentByOwner'
import Application from '../pages/rentals/Application'
import Lisitng from '../pages/rentals/Listing'
function RentRouters(){
    return(
        <>
        <RentNav/>
        <Switch>
            <Route path = {ROUTES.RENT_POST}><RentByOwner/></Route>
            <Route path = {ROUTES.RENT_LISTING}><Lisitng/></Route>
            <Route path = {ROUTES.RENT_APPLICATION}><Application/></Route>
        </Switch>
        </>
    )
}

export default RentRouters