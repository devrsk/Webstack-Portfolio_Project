import React from "react"
import Footer from "../containers/footer"
import Gridcard from "../containers/gridcard"
import Search from '../containers/search'

function Home(){
    return(
        <React.Fragment>
            <Search/> 
     
               <Gridcard/>
    
            <Footer/> 
        </React.Fragment>
    )
}

export default Home