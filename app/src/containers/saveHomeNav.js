import React from 'react'
import {ProfileNav} from '../components/export'
import *as ROUTES from '../constants/routes'
function SaveHomeNav(){
    return(
        <ProfileNav>
              <ProfileNav.TextLink to ={ROUTES.SAVED_HOME_BUY}>Saved Sale</ProfileNav.TextLink>
              <ProfileNav.TextLink to ={ROUTES.SAVED_HOME_RENT}>Saved Rent </ProfileNav.TextLink>
        </ProfileNav>
    )
}
export default SaveHomeNav