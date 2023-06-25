import React from "react"
import {Route,Switch} from "react-router-dom"
import SaveHome from "../pages/profile/SaveHome"
import SaveRentHome from "../pages/profile/saveRentHome"
import * as ROUTES from '../constants/routes'
import SaveHomeNav from '../containers/saveHomeNav'
function SaveHomeRouter(){
    return(
        <>
        {/* <SaveHomeNav/> */}
        <Switch>
              <Route path = {ROUTES.SAVED_HOME_BUY}><SaveHome/></Route>
              <Route exact path = {ROUTES.SAVED_HOME_RENT}><SaveRentHome/></Route>
        </Switch>
        </>
    )
}

export default SaveHomeRouter