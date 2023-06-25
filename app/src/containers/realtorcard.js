import { Realtorcard } from '../components/export';
import React,{useContext} from 'react'
import * as ROUTES from '../constants/routes'
import { RealtorContext } from '../context/realtorContext';
import Loading from "../containers/LoadingContainer"

function RentHousecards({props}){
    const {realtors,search} = useContext(RealtorContext);
    
    // console.log(houses)
    function singlecard(obj){
        // console.log(obj.main_dir)
        return (

        <Realtorcard.Base key = {obj.U_ID}>  
            <Realtorcard.ImageContainer>      
                </Realtorcard.ImageContainer>                 
            <Realtorcard.Link to = {`${ROUTES.AGENT_FINDER}/${obj.U_ID}` }>
                <Realtorcard.TextContainer>
                <Realtorcard.Title>{obj.Fname} {obj.Lname}</Realtorcard.Title>
                    <Realtorcard.Text>Email : {obj.Email}</Realtorcard.Text>
                    <Realtorcard.Text>ZipCode : {obj.zipcode}</Realtorcard.Text>
                </Realtorcard.TextContainer>

            </Realtorcard.Link>
            
        </Realtorcard.Base>
        )
    }

    if(realtors && !search){
        const  cards = realtors.map(realtor=>singlecard(realtor));
        return(
            <React.Fragment>
            <Realtorcard>
                {cards}
            </Realtorcard>
            </React.Fragment>
        )
    }else if(realtors && search){
        if(search.length === 0){
            return(
                <React.Fragment>
                
                <Realtorcard>
                    no result
                </Realtorcard>
                </React.Fragment>
            )
        }else if(search.length !== 0){
        const  cards = search.map(realtor=>singlecard(realtor));
            return(
                <React.Fragment>
                <Realtorcard>
                    {cards}
                </Realtorcard>
                </React.Fragment>
            )
        }
    }else{
        return(
           <Loading/>
        )
    }
   
    
}

export default RentHousecards