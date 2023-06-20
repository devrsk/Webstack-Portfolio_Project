import React,{useEffect,useState,useContext} from 'react'
import {ListingForm,Application,Profile } from '../../components/export';
import DefaultImg from '../../img/homeicon.png'
import * as ROUTES from '../../constants/routes'
import Loading from "../../containers/LoadingContainer"
import {DB} from '../../constants/DB'
import { RealtorContext } from '../../context/realtorContext';


function Listing() {
    const user = JSON.parse(localStorage.getItem('authUser'))
    const {realtors} = useContext(RealtorContext)
    const [Listing, setListing] = useState()
    const [ID,setID] = useState();
    const [display,setDisplay] = useState("none")
    const [openDisplay,setOpenDisplay] = useState("none")

    const Rent_Application_URL = `${DB}/users/${user.id}/forRentListing`
    const Update_URL = `${DB}/updateForRent`
    const Delete_URL = `${DB}/deleteForRent`
    const [check,setCheck] = useState(false)      

    const [PropertyType,setPropertyType]= useState()
    const [apart_number,setApart_number]= useState()
    const [Street,setStreet]= useState()
    const [Zip,setZip]= useState()
    const [City,setCity]= useState()
    const [State,setState]= useState()
    const [Rate,setRate]= useState()
    const [Bedroom,setBedroom]= useState()
    const [Bathroom,setBathroom]= useState()
    const [Livingroom,setLivingroom] = useState()
    const [Parking,setParking] = useState()
    const [Year,setYear] = useState()
    const [Area,setArea] = useState()
    const [Description,setDescription] = useState()
    const [Pic_dir,setPic_dir] = useState()
    const [Main_dir,setMain_dir] = useState()
    const [Flooring,setFlooring] = useState()
    const [available, setAvailable] = useState()
    const [term, setTerm] = useState()
    const [deposite, setDeposite] = useState()
    const [ammenities, setAmmenities] = useState()
    const [realtorID, setRealtorID] = useState('');


    const isInvalid = PropertyType === ''|| Street === '' || Zip ==='' ||City === ''||City === ''||Rate === ''||Bedroom === ''||Parking===''||Description===''; 
    useEffect( ()=>{
        // console.log("R", user.role)
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
                setListing(result.dataset)
            })
        }catch(e){
            console.log(e);
        }
   
},[check])

    function toggleDisplay(id){
        if(display === "none")
            {
            setDisplay("display")
            setID(id)
            Listing.map(item=> {if(item.R_ID === id ){
                console.log("this is item", item);
                setPropertyType(item.property_type)
                setApart_number(item.apt_num)
                setStreet(item.street)
                setZip(item.zip)
                setCity(item.city)
                setState(item.state)
                setRate(item.rate)
                setBedroom(item.bedroom)
                setBathroom(item.bathroom)
                setLivingroom(item.livingroom)
                setParking(item.parking)
                setYear(item.year_built)
                setArea(item.area)
                setPic_dir(item.pic_dir)
                setMain_dir(item.main_dir)
                setDescription(item.description)
                setFlooring(item.flooring)
                setAmmenities(item.ammenities)
                setTerm(item.lease_term)
                setDeposite(item.security_deposit)
                setAvailable(item.available_date.substring(0,10))
                setRealtorID(item.Realtor_ID)
            }})
           
            
        }
            
        else{
            setDisplay("none")
        }
    }
    async function handleDelete(id){
        try{
            let res = await fetch(Delete_URL, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    R_ID : id,
                    role: user.role
                })
            });
            let result = await res.json();
            console.log(result);
            if(result && result.success){
                console.log("successful delete list");
                setCheck(!check)
            }else if(result && result.success === false){
                
                alert(result.msg);
            }
        }catch(e){
            console.log(e);
  
        }

    }
    
    async function handleUpdate (event){
        
        event.preventDefault();

            try{
                let res = await fetch(Update_URL, {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        Realtor_ID: realtorID,
                        property_type : PropertyType,
                        apt_num : apart_number,
                        street : Street,
                        city : City,
                        state : State,
                        zip:Zip,
                        available_date: available,
                        rate : Rate,
                        lease_term: term,
                        security_deposit: deposite,
                        ammenities: ammenities,
                        bathroom : Bathroom,
                        bedroom: Bedroom,
                        livingroom : Livingroom,
                        parking : Parking,
                        flooring: Flooring,
                        area : Area,
                        year_built : Year,
                        pic_dir:Pic_dir,
                        main_dir:Main_dir,
                        R_ID: ID,
                        description: Description,
                        status:"A"
                    })
                });
                let result = await res.json();
                console.log(result);
       
                if(result && result.success){
                    console.log("successful submited updated");
                    setCheck(!check)
                }else if(result && result.success === false){
             
                    alert(result.msg);
                }
            }catch(e){
                console.log(e);
      
            }

    }
    function ListingCard(obj){
        // console.log("obj",obj.visit[0].start_time)
        return (
        
            <ListingForm.Base key = {obj.R_ID}>
                <ListingForm.Link to = {`${ROUTES.RENT}/${obj.R_ID}` }>
                    <ListingForm.ImageContainer>
                        <ListingForm.Img src = {obj.main_dir?obj.main_dir:DefaultImg} alt ="#"/>
                    </ListingForm.ImageContainer>
                </ListingForm.Link>
                <ListingForm.TextContainer>
                        <ListingForm.Title>city : {obj.city}</ListingForm.Title>
                        <ListingForm.Text>street : {obj.street}</ListingForm.Text>
                        <ListingForm.Text>Rate : {obj.rate ? obj.rate.toLocaleString("en-US", {style: "currency", currency: "USD"}):null}</ListingForm.Text>
                        <ListingForm.Text>Visit : {obj.visit ? obj.visit[0].start_time.substring(0,10):null}</ListingForm.Text>
                    </ListingForm.TextContainer>
                <ListingForm.Button to={'#'} func={toggleDisplay} id={obj.R_ID}>Update</ListingForm.Button>
                <ListingForm.Button to={ROUTES.LISTING} func={handleDelete} id={obj.R_ID}>Remove</ListingForm.Button>
            </ListingForm.Base>  

   
        )
    }

    const getUnique = (items, value) => {
        return [...new Set(items.map(item => item[value]))];
    };

    let agents = [];
    // //get unique types
    if(realtors){
        agents = getUnique(realtors, 'Fname');
        agents = ['Realtor', ...agents];
        agents = agents.map((item, index) => {
            return <Application.Option value={index} key={index}>{item}</Application.Option>
        });
    }

    if(Listing&&Listing.length){
        const  cards = Listing.map(item=>ListingCard(item));
        // console.log(isInvalid)
        return(
            <Profile>
                <Profile.Text>
                    Listing
                </Profile.Text>
            <ListingForm>
                {cards}
                </ListingForm>
            
            <Application display = {display} >
            </Application>
            <Application.Base display = {display}>

                <Application.Close toggleDisplay={toggleDisplay}><i className="far fa-window-close"></i></Application.Close>
                <Application.Title>Update Form</Application.Title>
                <Application.InputArea onSubmit={handleUpdate} method="POST" Scroll = "scroll">
                
                    <Application.Select onChange={({ target }) => setPropertyType(target.value)}>
                        <Application.Option
                            defaultValue="selected">
                                {PropertyType}
                                </Application.Option>
                        <Application.Option
                            value="Single House"
                            >Single House</Application.Option>
                        <Application.Option 
                            value="Townhouse"
                            >Townhouse</Application.Option>
                        <Application.Option 
                            value="Apartment"
                            >Apartment</Application.Option>
                    </Application.Select>

                    <Application.Select onChange={({ target }) => setRealtorID(target.value)}>
                        {agents}
                    </Application.Select>

                    <Application.InputField>
                        <Application.Text>Apart number</Application.Text>
                        <Application.Input
                                placeholder="Apt #"
                            defaultValue ={apart_number}
                            onChange={({ target }) => setApart_number(target.value)}
                            pattern="^[0-9]*$"/>
                        </Application.InputField>

                    <Application.InputField>
                        <Application.Text>Street</Application.Text>
                        <Application.Input  
                            placeholder="Street"
                            defaultValue ={Street}
                            onChange={({ target }) => setStreet(target.value)}
                            />
                    </Application.InputField>

                    <Application.InputField>
                        <Application.Text>City</Application.Text>
                        <Application.Input  
                            placeholder="City"
                            defaultValue ={City}
                            onChange={({ target }) => setCity(target.value)}
                            pattern="^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$"/>
                    </Application.InputField>

                    <Application.InputField>
                        <Application.Text>State</Application.Text>
                        <Application.Input  
                            placeholder="State"
                            defaultValue ={State}
                            onChange={({ target }) => setState(target.value)}/>
                    </Application.InputField>

                    <Application.InputField>
                        <Application.Text>Zip-code</Application.Text>
                        <Application.Input  
                            placeholder="Zip-code"
                            defaultValue ={Zip}
                            onChange={({ target }) => setZip(target.value)}
                            pattern="[0-9]{5}"/>
                    </Application.InputField>

                    <Application.InputField>
                        <Application.Text>Deposite</Application.Text> 
                        <Application.Input  
                            placeholder="Deposite"
                            defaultValue ={deposite}
                            onChange={({ target }) => setDeposite(target.value)}
                            pattern="^[0-9]*$"
                            />
                    </Application.InputField>

                    <Application.InputField>
                        <Application.Text>Rate</Application.Text>
                        <Application.Input  
                            placeholder="Rate"
                            defaultValue ={Rate}
                            onChange={({ target }) => setRate(target.value)}
                
                            />
                        </Application.InputField>

                        <Application.InputField>
                        <Application.Text>Bedroom</Application.Text> 
                        <Application.Input 
                            placeholder="Bedroom"
                            defaultValue ={Bedroom}
                            onChange={({ target }) => setBedroom(target.value)}
                        
                            />
                    </Application.InputField>
                
                    <Application.InputField>
                        <Application.Text>Bathroom</Application.Text> 
                        <Application.Input  
            
                            placeholder="Bathroom"
                            defaultValue ={Bathroom}
                            onChange={({ target }) => setBathroom(target.value)}
                            
                            />
                    </Application.InputField>

                    <Application.InputField>
                        <Application.Text>Living #</Application.Text> 
                        <Application.Input  
                            placeholder="Living #"
                            defaultValue ={Livingroom}
                            onChange={({ target }) => setLivingroom(target.value)}
                            pattern="^[0-9]*$"
                            />
                    </Application.InputField>
                    
                    <Application.InputField>
                        <Application.Text>Flooring</Application.Text> 
                        <Application.Select  
                            defaultValue ={Flooring}
                            onChange={({ target }) => setFlooring(target.value)}
                            >
                            <Application.Option
                            defaultValue="selected">
                                {Flooring}
                                </Application.Option>
                            <Application.Option
                                value="Carpet"
                                >Carpet</Application.Option>
                            <Application.Option 
                                value="Wooden"
                                >Wooden</Application.Option>
                            </Application.Select>
                        </Application.InputField> 

                        <Application.InputField>
                        <Application.Text>Available Date</Application.Text> 
                        <Application.Input  
                            placeholder="2020-01-01"
                            defaultValue ="2020-01-01"
                            onChange={({ target }) => setAvailable(target.value)}
                            />
                    </Application.InputField>

                        <Application.InputField>
                        <Application.Text>Term</Application.Text> 
                        <Application.Select  
                            defaultValue ={term}
                            onChange={({ target }) => setTerm(target.value)}
                            >
                            <Application.Option
                            defaultValue="selected">
                                {term}
                                </Application.Option>
                            <Application.Option
                                value="3"
                                >3 months</Application.Option>
                            <Application.Option 
                                value="6"
                                >6 months</Application.Option>
                            <Application.Option 
                            value="12"
                            >12 months</Application.Option>
                            </Application.Select> 
                        </Application.InputField> 
    
                    <Application.InputField>

                        <Application.Text>Parking</Application.Text> 
                        <Application.Input  
                            placeholder="Parking"
                            defaultValue ={Parking}
                            onChange={({ target }) => setParking(target.value)}
                            />
                    </Application.InputField>

                    <Application.InputField>
                        <Application.Text>Area</Application.Text> 
                        <Application.Input  
                            placeholder="Area"
                            defaultValue ={Area}
                            onChange={({ target }) => setArea(target.value)}
            
                            />
                    </Application.InputField>

                    <Application.InputField>
                        <Application.Text>Year</Application.Text> 
                        <Application.Input  
                            placeholder="Year"
                            defaultValue ={Year}
                            onChange={({ target }) => setYear(target.value)}
                    
                            />
                            
                    </Application.InputField>

                    <Application.InputField>
                        <Application.Text>Ammenities</Application.Text> 
                        <Application.Input  
                            placeholder="Ammenities"
                            defaultValue ={ammenities}
                            onChange={({ target }) => setAmmenities(target.value)}
                            />
                    </Application.InputField>

                    <Application.InputField>
                        <Application.Text>Description</Application.Text> 
                        <Application.TextArea  
                            placeholder="Description"
                            defaultValue ={Description}
                            onChange={({ target }) => setDescription(target.value)}
                            >
                        </Application.TextArea>
                    </Application.InputField>
                    <Application.Submit disabled={isInvalid} onclick={toggleDisplay}>Submit</Application.Submit>
                </Application.InputArea>
        </Application.Base>     
        
        
        <Application display = {openDisplay} >
        </Application>
    </Profile>
        )
    }else{
        return(
            <Profile>
                <Profile.Text>
                    Oops you have not list any house yet!
                </Profile.Text>
            </Profile> 
        // <Loading/>
        )
    }
   
}

export default Listing