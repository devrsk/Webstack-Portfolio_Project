import React,{useContext} from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import {useParams} from 'react-router-dom'
// import { RentContext } from '../context/rentContext';
import { RealtorContext } from '../context/realtorContext';
import { Houseinfo, ListingForm } from '../components/export';
import LoadingContainer from '../containers/LoadingContainer'
import DefaultImg from '../img/homeicon.png'
import {DB} from '../constants/DB'
function RealtorDetail(props){

    const {realtors} = useContext(RealtorContext);
    const {id} = useParams()

    const Rent_Application_URL = `${DB}/users/${id}/forRentListing`
    const Buy_Application_URL = `${DB}/users/${id}/forSaleListing`
    const [Listing, setListing] = useState()
    const [buyListing, setBuyListing] = useState()
    // const [ID,setID] = useState();

    const [realtor,setRealtor] = useState()
    // const [check,setCheck] = useState(false)
    // const [display,setDisplay] = useState("none")
    // const [Fname,setFname]= useState('')
    // const [Lname,setLname]= useState('')
    // const [email,setEmail]= useState('')
    // const [phone,setPhone]= useState('')
    // const [zipcode,setZipcode] = useState()
    // const [sales,setSales] = useState()
    // const [rent, setRent] = useState();
    // const [specialty, setSpecialty] = useState();

    // const user = JSON.parse(localStorage.getItem('authUser'));

    useEffect(()=>{
        // console.log("this is realtor", realtor, id)
        if(realtors !== undefined){
            const temp_id = parseInt(id);
            realtors.map(list=>{
                if(list.U_ID === temp_id){
                    setRealtor(list)
                }else{

                }
            })
        }else{
            console.log("undefined realtor")
        }
        getHouses();
    },[realtors])

    async function getHouses(){
        try{
            fetch(Rent_Application_URL, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ID: id,
                    role: "R"
                })
            }).then(res => res.json()).then(result=>{
                setListing(result.dataset)
            })
        }catch(e){
            console.log(e);
        }
        try{
            fetch(Buy_Application_URL, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ID: id,
                    role: "R"
                })
            }).then(res => res.json()).then(result=>{
                setBuyListing(result.dataset)
            })
        }catch(e){
            console.log(e);
        }
    }

    function ListingCard(obj){
        return (
            <>
            <p>Houses currently list for RENT</p>
            <ListingForm.Base key = {obj.R_ID} style={{right: "0", height: "150px", width: "300px"}}>
                <ListingForm.ImageContainer>
                    <ListingForm.Img src = {obj.main_dir?obj.main_dir:DefaultImg} alt ="#" style={{height:"50%"}}/>
                </ListingForm.ImageContainer>
                <ListingForm.TextContainer>
                    <ListingForm.Text>city : {obj.city}</ListingForm.Text>
                    <ListingForm.Text>street : {obj.street}</ListingForm.Text>
                    <ListingForm.Text>Rate : {obj.rate ? obj.rate.toLocaleString("en-US", {style: "currency", currency: "USD"}):null}</ListingForm.Text>
                </ListingForm.TextContainer>
            </ListingForm.Base> 
            </>
        )
    }
    function BuyListingCard(obj){
        return (
            <>
            <p>Houses currently list for SALE</p>
            <ListingForm.Base key = {obj.S_ID} style={{right: "0", height: "150px", width: "300px"}}>
                <ListingForm.ImageContainer>
                    <ListingForm.Img src = {obj.main_dir?obj.main_dir:DefaultImg} alt ="#" style={{height:"50%"}}/>
                </ListingForm.ImageContainer>
                <ListingForm.TextContainer>
                        <ListingForm.Text>city : {obj.city}</ListingForm.Text>
                        <ListingForm.Text>street : {obj.street}</ListingForm.Text>
                        <ListingForm.Text>price : {obj.price ? obj.price.toLocaleString("en-US", {style: "currency", currency: "USD"}):null}</ListingForm.Text>
                    </ListingForm.TextContainer>
            </ListingForm.Base> 
            </>
        )
    }

    console.log(realtor, Listing)
    if(realtor && Listing && buyListing) {
        // console.log(realtor)
        const  cards = Listing.map(item=>ListingCard(item));
        const  buycards = buyListing.map(item=>BuyListingCard(item));
        return(
            <>
             <Houseinfo style={{width: "80%", margin: "auto", height:"60%"}}>
                <Houseinfo.Base style={{width: "50%"}}> 
                    <Houseinfo.TextControl>
                        <Houseinfo.Title>
                            <p style={{display:"inline", color: "#ff8286"}}> {realtor.Fname} {realtor.Lname} </p>
                        </Houseinfo.Title>
                        
                        <Houseinfo.Price>                            
                            <Houseinfo.Bath> <Houseinfo.BathInfo> {buycards.length} </Houseinfo.BathInfo> sales</Houseinfo.Bath>
                            <Houseinfo.Area> <Houseinfo.BathInfo> {cards.length} </Houseinfo.BathInfo> rents</Houseinfo.Area>
                        </Houseinfo.Price>

                        <Houseinfo.Text>Email: {realtor.Email}</Houseinfo.Text>
                        <Houseinfo.Text>ZipCode: {realtor.zipcode}</Houseinfo.Text>
                        <Houseinfo.Text>Phone Number: {realtor.phone}</Houseinfo.Text>
                    </Houseinfo.TextControl>
                </Houseinfo.Base>
                <ListingForm style={{height: "20%"}}>
                    {cards}
                </ListingForm>
                <ListingForm style={{height: "20%"}}>
                    {buycards}
                </ListingForm>
            </Houseinfo> 
            
          </>
        )
    }
    else
    {return (
        <>
            <LoadingContainer/>
        </>
    )}
}

export default RealtorDetail;