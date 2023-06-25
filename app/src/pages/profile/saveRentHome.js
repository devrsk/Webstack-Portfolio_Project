import React,{useEffect,useContext,useState} from 'react'
import { Housecard,Profile } from '../../components/export';
import DefaultImg from '../../img/homeicon.png'
import * as ROUTES from '../../constants/routes'
import { RentContext } from '../../context/rentContext';
import Loading from "../../containers/LoadingContainer"
import {DB} from '../../constants/DB'
import SaveHomeRouter from '../../Routers/saveHomeRouter'

function SaveRentHome(prop) {
    const {rentHouses,rentFavorite,removeRentFavorite} = useContext(RentContext);
    // console.log("here is rentFavorite", rentFavorite)
    // const {houses, setHouses} = useState();
    const user = JSON.parse(localStorage.getItem('authUser'));

    function singlecard(obj){
        const icon = <Housecard.Favorite removeFavorite ={removeRentFavorite} house = {obj}/> 
        return (
            <Housecard.Base key = {obj.R_ID} >  
                <Housecard.ImageContainer> 
                    {icon}
                    </Housecard.ImageContainer> 
            <Housecard.Link to = {`${ROUTES.BUY}/${obj.R_ID}` }>
            
                {/* <Housecard.img src = {obj.pic_dir? obj.pic_dir:DefaultImg} alt ="#"/> */}
                <Housecard.Content>
                <Housecard.ImageContainer>
                    
                    <Housecard.img src = {obj.main_dir?obj.main_dir:DefaultImg} alt ="#"/>
                </Housecard.ImageContainer>
                <Housecard.TextContainer>
                    <Housecard.Title><p style={{display:"inline", color: "#ff8286"}}> {obj.property_type} </p>For Rent</Housecard.Title>
                    <Housecard.Price>{obj.rate ? obj.rate.toLocaleString("en-US", {style: "currency", currency: "USD"}):null}</Housecard.Price>
                    <Housecard.Text> <p style={{display:"inline", color: "#525252", fontWeight :"600", fontSize :"1rem"}}> {obj.city} </p>{obj.state}</Housecard.Text>
                    <Housecard.Text>{obj.street}</Housecard.Text>
                    <Housecard.TextControl>
                        <Housecard.NormalText>{obj.bedroom} <p style={{display:"inline",color: "black",fontWeight :"500"}}>bds</p></Housecard.NormalText>
                        <Housecard.NormalText>{obj.bathroom} <p style={{display:"inline",color: "black", fontWeight :"500"}}>ba</p></Housecard.NormalText>
                        <Housecard.NormalText>{obj.area} <p style={{display:"inline",color: "black",fontWeight :"500"}}>sqft</p></Housecard.NormalText>
                        </Housecard.TextControl>
                </Housecard.TextContainer>
                </Housecard.Content>
            </Housecard.Link>
            
        </Housecard.Base>
        )
    }
    const Save_Home = `${DB}/api/favorite/home?id=${user.id}`
    useEffect(()=>{
        // fetch user favorite table here
        // fetch(Save_Home).then(response=>response.json()).then(result=>setHouses(result.list))
           
    },[])

    if(rentHouses){
        const cards = rentHouses.map(house=> { 
            if(rentFavorite){
                const A = rentFavorite.find(index=>house.R_ID === index.properity_id)
                if(A){
                    const B = rentHouses.find(index=>index.R_ID === A.properity_id)
                    return singlecard(B)
                }
            }else{
                return null;
            }  
        })
    if(cards[0]!==undefined)
      {return(
          <Profile>

              <Profile.Text>
                    Saved Homes
                </Profile.Text>
              <Profile.CardsContainer>
                {cards}
              </Profile.CardsContainer>
          </Profile>
      )}
    else{ return(
            <Profile>
                <Profile.Text>
                Oops you dont have any favorited home yet
              </Profile.Text>
             
            </Profile>
        )}
  }else{
      return( <Loading/>)
  }
    
}

export default SaveRentHome