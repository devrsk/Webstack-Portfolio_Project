import React from "react"
import Footer from "../containers/footer"
import Gridcard from "../containers/gridcard"
import Search from '../containers/search'

function Home(){
    return(
        <>
            <Search/> 
     
               <Gridcard/>
    
            <Footer/> 
        </>
    )
}

export default Home