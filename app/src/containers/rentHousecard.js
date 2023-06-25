import { Housecard } from '../components/export';
import React,{useContext} from 'react'
import DefaultImg from '../img/homeicon.png'
import * as ROUTES from '../constants/routes'
import { RentContext } from '../context/rentContext';

function RentHousecards({props}){
    const {rentHouses,search,rentFavorite,addRentFavorite,removeRentFavorite} = useContext(RentContext);
    function singlecard(obj,rentFavorite){
        const type = "R"
        // eslint-disable-next-line react/jsx-pascal-case
        const icon = rentFavorite?<Housecard.RentFavorite removeRentFavorite ={removeRentFavorite} house = {obj} type={type}/>:<Housecard.notRentFavorite addRentFavorite={addRentFavorite} house = {obj}/>
            
        return (
            <Housecard.Base key = {obj.R_ID} >  
            <Housecard.ImageContainer> 
                {icon}
                </Housecard.ImageContainer>                 
            <Housecard.Link to = {`${ROUTES.RENT}/${obj.R_ID}` }>
                
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
                        <Housecard.NormalText style={{borderRight:"0"}} >{obj.area}<p style={{display:"inline",color: "black",fontWeight :"500"}}>sqft</p></Housecard.NormalText>
                        </Housecard.TextControl>
                </Housecard.TextContainer>
                </Housecard.Content>
            </Housecard.Link>
            
        </Housecard.Base>
        )
    }
    // console.log(houses)
    // console.log(search)
    if(rentHouses && !search){
        // console.log("rentHouses",rentHouses)
        
        const  cards = rentHouses.map(house=>{
            if(rentFavorite!==undefined && rentFavorite){
                // console.log("rentFavorite",rentFavorite)
                const checkFavorite = rentFavorite.find(item=>(item.properity_id === house.R_ID)&&(item.home_type === "r"))
                // console.log("checkFavorite", checkFavorite)
                const A = checkFavorite? true : false;
               return singlecard(house, A)
            }else{
                const C = false;
                return singlecard(house, C)
            }
            
        });
        return(
            <>
            <Housecard>
                {cards}
            </Housecard>
            </>
        )
    }else if(rentHouses && search){
        if(search.length === 0){
            
            return(
                <div style={{textAlign:"center"}}>
                

                    <Housecard.Error>No Data in Data Base</Housecard.Error>
 
                </div>
            )
        }
        if(search.length === 0){
            return(
                <>
                <Housecard>
                    no result
                </Housecard>
                </>
            )
        }else if(search.length !== 0){
            const  cards = search.map(house=>{
                if(rentFavorite!==undefined && rentFavorite){
                    const checkFavorite = rentFavorite.find(item=>item.properity_id === house.S_ID)
                    // console.log(checkFavorite)
                    const A = checkFavorite? true : false;
                   return singlecard(house,A)
                }else{
                    const C = false;
                    return singlecard(house,C)
                }
                
            });
            return(
                <>
                <Housecard>
                    {cards}
                </Housecard>
                </>
            )
        }
    }else{
        return(
            <div style={{textAlign:"center"}}>
            

                <Housecard.Error>No Data in Data Base</Housecard.Error>

            </div>
        )
    }
   
    
}

export default RentHousecards