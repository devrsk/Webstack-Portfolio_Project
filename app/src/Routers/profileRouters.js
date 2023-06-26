import React from "react"
import {Route,Switch} from "react-router-dom"
import SaveHome from "../pages/profile/SaveHome"
import SaveSearch from "../pages/profile/SaveSearch"
import AccoutSetting from "../pages/profile/AccoutSetting"
import Application from "../pages/profile/Application"
import Listing from "../pages/profile/Listing"
import * as ROUTES from '../constants/routes'
import ProfileNavbar from '../containers/profileNav'

function ProfileRouters(){
    return(
        <>
        <ProfileNavbar/>
        <Switch>
              <Route path = {ROUTES.SAVED_HOME}><SaveHome/></Route>
              <Route path = {ROUTES.SAVED_SEARCH}><SaveSearch/></Route>
              <Route path = {ROUTES.ACCOUNT_SETTING}><AccoutSetting/></Route>
              <Route path = {ROUTES.APPLICATION}><Application/></Route>
              <Route path = {ROUTES.LISTING}><Listing/></Route>
        </Switch>
        </>
    )
}

export default ProfileRouters