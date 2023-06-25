import React,{useContext} from 'react'
import { Housecard,Profile } from '../../components/export';
import { Context } from '../../context/housesContext';
import DefaultImg from '../../img/homeicon.png'
function SaveSearch() {
    const {favorite_search_list,deleteFavorite_Search} = useContext(Context);
  

    function singlecard(obj){
        // console.log(obj)
        const icon = <Housecard.Favorite removeFavorite ={deleteFavorite_Search} house = {obj}/> 
        return (
            <Housecard.Base key = {Math.random()} >  

                <Housecard.Content>
                <Housecard.ImageContainer>
                    {icon}
                    <Housecard.img src = {DefaultImg} alt ="#"/>
                </Housecard.ImageContainer>
                <Housecard.TextContainer>
                        <Housecard.Title>Search Type<p style={{display:"inline", color: "#ff8286"}}> {obj.search_type === "b"?"Buy":"Rent"} </p></Housecard.Title>
                        <Housecard.Text style={{fontSize:"0.9rem",marginBottom:"0.5rem"}}>Information</Housecard.Text>

                        <Housecard.Text>Type: {obj.home_type?obj.home_type:"No Data"}</Housecard.Text>
                        <Housecard.Text>bds: {obj.bedroom?obj.bedroom:"No Data"}</Housecard.Text>
                        <Housecard.Text>bath: {obj.bathroom?obj.bathroom:"No Data"}</Housecard.Text>
                        <Housecard.Text>min price: {obj.min_price?obj.min_price:"0"}</Housecard.Text>
                        <Housecard.Text>max price: {obj.max_price?obj.max_price:"No Data"}</Housecard.Text>
                        <Housecard.Text>min size: {obj.house_size?obj.house_size:"No Data"}</Housecard.Text>
                        <Housecard.Text>year built: {obj.year_built?obj.year_built:"No Data"}</Housecard.Text>
                        <Housecard.Text>flooring: {obj.flooring?obj.flooring:"No Data"}</Housecard.Text>

                </Housecard.TextContainer>

                </Housecard.Content>
                
        </Housecard.Base>
        )
    }
  
    if(favorite_search_list){
        const cards = favorite_search_list.map(listitem=> { 
            return singlecard(listitem)
          })
        return(
            <React.Fragment>
             <Profile>
                <Profile.Text>Saved Search</Profile.Text>
                <Profile.CardsContainer>
                    {cards}
                </Profile.CardsContainer>
            </Profile>
            </React.Fragment>
        )
    }else{
        return(
            <React.Fragment>
             <Profile>
                <Profile.Text>Oops you don't have any saved search yet</Profile.Text>
            </Profile>
            </React.Fragment>
        )
    }

       
   
}

export default SaveSearch
