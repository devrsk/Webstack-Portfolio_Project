import React from 'react'
import ProfileRouters from '../../Routers/profileRouters'
import Footer from '../../containers/footer'
function Profile(){
    return(
    <React.Fragment>
        <ProfileRouters/> 
        <Footer/>
    </React.Fragment>
    )
}

export default Profile
