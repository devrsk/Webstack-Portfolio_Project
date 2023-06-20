import React,{useEffect,useState,useContext} from 'react'
import {ListingForm,Application,Profile} from '../../components/export';
import DefaultImg from '../../img/homeicon.png'
import * as ROUTES from '../../constants/routes'
import {Context} from "../../context/housesContext"
import {DB} from '../../constants/DB'

function Listing() {
    const {setHouses} = useContext(Context)
    
    const user = JSON.parse(localStorage.getItem('authUser'))
 
    const [Listing, setListing] = useState()
    const [ID,setID] = useState();
    const [display,setDisplay] = useState("none")
    const [openDisplay,setOpenDisplay] = useState("none")
    const Update_URL = `${DB}/updateForSale`
    const Delete_URL = `${DB}/deleteForSale`
    const OpenHouse_URL = `${DB}/openHouse`
    const Search_URL = `${DB}/house`;
    const Application_URL = `${DB}/users/${user.id}/forSaleListing` 

    const [PropertyType,setPropertyType]= useState('')
    const [apart_number,setApart_number]= useState('')
    const [Street,setStreet]= useState()
    const [Zip,setZip]= useState()
    const [City,setCity]= useState()
    const [State,setState]= useState()
    const [Price,setPrice]= useState()
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
    
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()

    const isInvalid = State === ''| Livingroom === ''|Area === ''| Street === ''| Zip === '' |City === ''|Price === ''| Bedroom === ''| Parking===''|Description===''; 

    const OpenisInvalid = (startDate === undefined||startDate === '') | (endDate === undefined||endDate === '');
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
                setListing(result.dataset)
            })
        }catch(e){
            console.log(e);
        }
   
},[])
    function refreshPage() {
        window.location.reload(false);
    }
    function toggleDisplay(id){
        if(display === "none")
            {
            setDisplay("display")
            setID(id)
            Listing.map(item=> {if(item.S_ID === id ){
                setPropertyType(item.property_type)
                setApart_number(item.apt_num)
                setStreet(item.street)
                setZip(item.zip)
                setCity(item.city)
                setState(item.state)
                setPrice(item.price)
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
                    S_ID : id,
                    role: user.role
                })
            });
            let result = await res.json();
            console.log(result);
            if(result && result.success){
                console.log("successful delete list");
    
                refreshPage()
               
            }else if(result && result.success === false){
                
                alert(result.msg);
            }
       
        }catch(e){
            console.log(e);
  
        }
        fetch(Search_URL).then(response=>response.json()).then(result=>setHouses(result.dataset))
       
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
                        apt_num : apart_number,
                        area : Area,
                        bathroom : Bathroom,
                        bedroom: Bedroom,
                        city : City,
                        flooring: Flooring,
                        livingroom : Livingroom,
                        parking : Parking,
                        price : Price,
                        p_type : PropertyType,
                        state : State,
                        street : Street,
                        year : Year,
                        pic_dir:Pic_dir,
                        main_dir:Main_dir,
                        zip:Zip,
                        S_ID: ID,
                        description: Description,
                        status:"A"
                    })
                });
                let result = await res.json();
                console.log(result);
       
                if(result && result.success){
                    console.log("successful submited updated");
             
                    refreshPage()
                }else if(result && result.success === false){
             
                    alert(result.msg);
                }
            }catch(e){
                console.log(e);
      
            }

    }
    function toggleOpenhouse(id){
        if(openDisplay === "none")
            {
            setOpenDisplay("display")
            setID(id)
        }
            
        else{
            setOpenDisplay("none")
        }
    }

    async function handleOpenHouse (event){
        
        event.preventDefault();
            // console.log(ID)
            try{
                let res = await fetch(OpenHouse_URL, {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      S_ID : ID,
                      from_date : startDate,
                      to_date :endDate
                    })
                });
                let result = await res.json();
                console.log(result);
       
                if(result && result.success){
                    console.log("successful submited OpenHouse");
                    refreshPage()
                }else if(result && result.success === false){
             
                    console.log(result.msg);
                }
            }catch(e){
                console.log(e);
      
            }
            fetch(Search_URL).then(response=>response.json()).then(result=>setHouses(result.dataset))

    }
    function ListingCard(obj){
        return (
        
            <ListingForm.Base key = {obj.S_ID}>
                <ListingForm.Link to = {`${ROUTES.BUY}/${obj.S_ID}` }>
                    <ListingForm.ImageContainer>
                        <ListingForm.Img src = {obj.main_dir?obj.main_dir:DefaultImg} alt ="#"/>
                    </ListingForm.ImageContainer>
                </ListingForm.Link>
                <ListingForm.TextContainer>
                <ListingForm.Title>{obj.price ? obj.price.toLocaleString("en-US", {style: "currency", currency: "USD"}):null}</ListingForm.Title>
                <ListingForm.Text>{obj.city+" "+obj.state}</ListingForm.Text>
                        <ListingForm.Text>{obj.street}</ListingForm.Text>
                        
                    </ListingForm.TextContainer>
                <ListingForm.Button to={'#'} func={toggleOpenhouse} id={obj.S_ID}>Open House</ListingForm.Button>
                <ListingForm.Button to={'#'} func={toggleDisplay} id={obj.S_ID}>Update</ListingForm.Button>
                <ListingForm.Button to={ROUTES.LISTING} func={handleDelete} id={obj.S_ID}>Remove</ListingForm.Button>
            </ListingForm.Base>  

   
        )
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
              
                           <Application.InputField>
                                <Application.Text>Number</Application.Text>
                                <Application.Input
                                     placeholder="number"
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
                                <Application.Text>Price</Application.Text>
                                <Application.Input  
                                    placeholder="Price"
                                    defaultValue ={Price}
                                    onChange={({ target }) => setPrice(target.value)}
                        
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
            <Application.Base display = {openDisplay}>

                        <Application.Close toggleDisplay={toggleOpenhouse}><i className="far fa-window-close"></i></Application.Close>
                        <Application.Title>OpenHouse Form</Application.Title>
                        <Application.InputArea onSubmit={handleOpenHouse} method="POST" Scroll = "scroll">
                        
                            <Application.InputField>
                                <Application.Text>Start Date</Application.Text>
                                <Application.Input  
                                    type = "date"
                   
                                    defaultValue ={startDate}
                                    onChange={({ target }) => setStartDate(target.value)}/> 
                           </Application.InputField>
 
                           <Application.InputField>
                                <Application.Text>End Date</Application.Text>
                                <Application.Input  
                                    type = "date"
                 
                                    defaultValue ={endDate}
                                    onChange={({ target }) => setEndDate(target.value)}/> 
                           </Application.InputField>
                           <Application.Submit  disabled={OpenisInvalid} onclick={toggleOpenhouse}>Submit</Application.Submit>
                            
                        </Application.InputArea>
                      
                </Application.Base>     
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
