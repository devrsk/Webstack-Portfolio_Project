import React,{useEffect, useState} from 'react'
import {ApplicationForm,Profile} from '../../components/export'
import defaultimg from "../../img/homeicon.png"
import {DB} from '../../constants/DB'

function Application(){
    const user = JSON.parse(localStorage.getItem('authUser'))
    const Application_URL = `${DB}/users/${user.id}/buyerApplication`
    const Contact_URL = `${DB}/approveBuy`
    const Reject_URL = `${DB}/rejectBuy`
    const [Applications, setApplciaitons] = useState()

    // console.log(user)

    function refreshPage() {
        window.location.reload(false);
    }
    useEffect( ()=>{
            try{
                fetch(Application_URL, {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ID: user.id,
                        role: user.role
                    })
                }).then(res => res.json()).then(result=>{
                    setApplciaitons(result.dataset)
                 
                })
            }catch(e){
                console.log(e);
            }
       
    },[])
    async function Reject(property_id,buyer_name,Buyer_ID   ){
        try{
            fetch(Reject_URL, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ID: Buyer_ID,
                    S_ID:property_id,
                    name: buyer_name
                })
            }).then(res => res.json()).then(result=>{
                setApplciaitons(result.dataset)
                console.log("reject");
                console.log(result);
                refreshPage()
            })
        }catch(e){
            console.log(e);
        }
    }
    async function Contact(property_id,buyer_name,Buyer_ID){
        try{
            fetch(Contact_URL, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ID: Buyer_ID,
                    S_ID:property_id,
                    name: buyer_name
                })
            }).then(res => res.json()).then(result=>{
                setApplciaitons(result.dataset)
                console.log(result);
                refreshPage()
            })
        }catch(e){
            console.log(e);
        }

    }
    function ROWS(obj){
     
         console.log(obj)
        return(
            <ApplicationForm.Card key={Math.random()}>
                
                <ApplicationForm.ImageContainer>
                    <ApplicationForm.Image src = {obj.main_pic?obj.main_pic:defaultimg} alt = {"#"}/>
                </ApplicationForm.ImageContainer>
                <ApplicationForm.Text>Name: {obj.name}</ApplicationForm.Text>
                <ApplicationForm.Text>Offer Price: {obj.offer_price.toLocaleString("en-US", {style: "currency", currency: "USD"})}</ApplicationForm.Text>
                <ApplicationForm.Text>Property: {obj.property_ID}</ApplicationForm.Text>

                <ApplicationForm.Button onclick ={Contact} id ={obj.property_ID}name = {obj.name} Buyer_ID = {obj.Buyer_ID}>Contact</ApplicationForm.Button>
                <ApplicationForm.Button onclick ={Reject} id ={obj.property_ID} name = {obj.name} Buyer_ID = {obj.Buyer_ID}>Reject</ApplicationForm.Button>
            </ApplicationForm.Card>
            )
        }

    

    if(Applications&&Applications.length>0)
   { 
    const applicants = Applications.map(applicant=>ROWS(applicant))

    return(
        <Profile>
            <Profile.Text>
                    Offer Received
                </Profile.Text>
            <ApplicationForm>
            
                {applicants}
                </ApplicationForm>
    
        </Profile>
    )}
    else{
        return(
            <Profile>
                <Profile.Text>
                    Oops you have not list any Application yet!
                </Profile.Text>
            </Profile>
            // <Loading/>
            )
    }
}

export default Application