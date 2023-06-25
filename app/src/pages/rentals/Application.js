import React,{useEffect, useState} from 'react'
import {ApplicationForm,Profile} from '../../components/export'
import defaultimg from "../../img/homeicon.png"
import {DB} from '../../constants/DB'
function Application(){

    const user = JSON.parse(localStorage.getItem('authUser'))
    const Rent_Application_URL = `${DB}/users/${user.id}/renterApplication`
    const Rent_Contact_URL = `${DB}/approveRent`
    const Rent_Reject_URL = `${DB}/rejectRent`
    const [Applications, setApplciaitons] = useState()
    // console.log(Rent_Application_URL)
    function refreshPage() {
        window.location.reload(false);
    }

    useEffect( ()=>{
        try{
            fetch(Rent_Application_URL, {
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
                console.log(result.dataset)
            })
        }catch(e){
            console.log(e);
        }
       
    },[])
    // if(Applications)
    //     console.log("Applications",Applications[0].RENTER_ID)
    async function Reject(property_id,renter_name,Renter_ID){
        try{
            fetch(Rent_Reject_URL, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    renter_ID: Renter_ID,
                    property_ID:property_id,
                    renter_name: renter_name
                })
            }).then(res => res.json()).then(result=>{
                setApplciaitons(result.dataset)
                console.log("reject");
                console.log(result); 
            })
        }catch(e){
            console.log(e);
        }
        refreshPage()
    }

    async function Contact(property_id,buyer_name,Renter_ID){
        try{
            fetch(Rent_Contact_URL, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    renter_ID: Renter_ID,
                    property_ID:property_id,
                    renter_name: buyer_name
                })
            }).then(res => res.json()).then(result=>{
                setApplciaitons(result.dataset)
                console.log(result);
            })
        }catch(e){
            console.log(e);
        }
        refreshPage()
    }
    function ROWS(obj){
     
         
        return(
            <ApplicationForm.Card key={Math.random()}>
           
                <ApplicationForm.ImageContainer>
                    <ApplicationForm.Image src = {obj.main_pic?obj.main_pic:defaultimg} alt = {"#"}/>
                </ApplicationForm.ImageContainer>
                {/* <ApplicationForm.Text>Name : {obj.name}</ApplicationForm.Text>
                <ApplicationForm.Text>Property : {obj.property_ID}</ApplicationForm.Text> */}
                <ApplicationForm.Text>Credit scoere : {obj.credit_score}</ApplicationForm.Text>
                <ApplicationForm.Text>Employer : {obj.employer}</ApplicationForm.Text>
                <ApplicationForm.Text>Annual salary : {obj.annual_salary}</ApplicationForm.Text>
                <ApplicationForm.Button onclick ={Contact} id ={obj.property_ID} name = {obj.name} Buyer_ID = {obj.RENTER_ID}>Contact</ApplicationForm.Button>
                <ApplicationForm.Button onclick ={Reject} id ={obj.property_ID} name = {obj.name} Buyer_ID = {obj.RENTER_ID}>Reject</ApplicationForm.Button>
            
            </ApplicationForm.Card>
            )
        }

    

        if(Applications&&Applications.length>0)
        { 
         const applicants = Applications.map(applicant=>ROWS(applicant))
     
         return(
             <Profile>
                 <Profile.Text>
                         Application
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
     

export default Application;