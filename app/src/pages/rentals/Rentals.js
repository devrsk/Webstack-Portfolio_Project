import React from 'react'
import RentRouters from '../../Routers/rentRouter'
import Footer from '../../containers/footer'
function Rentals(){
    return(
    <React.Fragment>
        <RentRouters/> 
        <Footer/>
    </React.Fragment>
    )
}

export default Rentals
