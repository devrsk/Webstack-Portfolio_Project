import React from 'react'
import {ProfileNav} from '../components/export'
import *as ROUTES from '../constants/routes'
function ProfileNavbar(){
    return(
        <ProfileNav>
              <ProfileNav.TextLink to ={ROUTES.SAVED_HOME_BUY}>Saved Home</ProfileNav.TextLink>
              <ProfileNav.TextLink to ={ROUTES.SAVED_SEARCH}>Saved Search</ProfileNav.TextLink>
              <ProfileNav.TextLink to ={ROUTES.LISTING}>Listing</ProfileNav.TextLink>
              <ProfileNav.TextLink to ={ROUTES.APPLICATION}>Application</ProfileNav.TextLink>
              <ProfileNav.TextLink to ={ROUTES.ACCOUNT_SETTING}>Account Setting</ProfileNav.TextLink>
        </ProfileNav>
    )
}
export default ProfileNavbar