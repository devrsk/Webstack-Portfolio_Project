import React,{useContext} from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import {useParams} from 'react-router-dom'
import { Context } from '../context/housesContext';
import {Houseinfo} from '../components/export'
import { Application } from '../components/export';
import LoadingContainer from '../containers/LoadingContainer'
import {DB} from '../constants/DB'

function HouseDetail(props){
    const {houses} = useContext(Context);
    const {id} = useParams()
 
    const [house,setHouse] = useState()
    const [check,setCheck] = useState(false)
    const [display,setDisplay] = useState("none")
    const [name,setName]= useState('')
    const [Application_price,setApplication_price]= useState('')
    const user = JSON.parse(localStorage.getItem('authUser'));
    const isInvalid =  name === '' || Application_price === '';

    const Applicaiton_URL = `${DB}/buyRequest`

    useEffect(()=>{
        
        if(houses !== undefined){
    
            const temp_id = parseInt(id);
            
            houses.map(list=>{
    
                if(list.S_ID === temp_id){
                    setHouse(list)
                }else{

                }
            })
            
        }else{
            console.log("undefined house")
        }
        if(house !== undefined){
            setCheck(true)
        }else{
            setCheck(false)
        }
    })
    console.log(house)
    function toggleDisplay(){
        if(display === "none")
            setDisplay("display")
        else
            setDisplay("none")
    }
    const house_imge = check? house.pic_dir.map(image =>(
        <Houseinfo.img key = {Math.random() } src = {image}/>
    )): "null";
    
   
    async function handleApplication (event){
        
        event.preventDefault();
        if(user){
            // console.log(user.id)
            // console.log(house.S_ID)
            // console.log(name)
            // console.log(Application_price)
            try{
                let res = await fetch(Applicaiton_URL, {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ID : user.id,
                        S_ID : house.S_ID,
                        name: name,
                        offer : Application_price,
                        // houseinfo:house,
                    })
                });
                let result = await res.json();
                console.log(result);
                if(result && result.success){
                    console.log(result.msg);
                    console.log("successful submited applciation");
                }else if(result && result.success === false){
             
                    console.log("false"+result.msg);
                }
            }catch(e){
                console.log(e);
      
            }
        }else{
            alert("you need signin to use this function")
        }
    }

    if(check) {
        // console.log(house)
        const conditionalDate =( house.open_house && house.open_house.from_date && house.open_house.to_date)? (<Houseinfo.FeatureText>
        {house.open_house.from_date?house.open_house.from_date:"No Data"} 
        {"   "}
        {house.open_house.to_date?house.open_house.to_date:"No Data"}
    </Houseinfo.FeatureText>) :<Houseinfo.FeatureText>No Data</Houseinfo.FeatureText>;
        return(
            <>
             <Houseinfo>
                    <Houseinfo.ImageBase>
                        {house_imge}
                    </Houseinfo.ImageBase>
                    <Houseinfo.Base>
                        <Houseinfo.TextControl>
                        <Houseinfo.Title><p style={{display:"inline", color: "#ff8286"}}> {house.property_type} </p>For Sale</Houseinfo.Title>
                        
                        <Houseinfo.Price>
                            {house.price ? house.price.toLocaleString("en-US", {style: "currency", currency: "USD"}):null} 
                            <Houseinfo.Bath> <Houseinfo.BathInfo> {house.bathroom}</Houseinfo.BathInfo> bds</Houseinfo.Bath>
                            <Houseinfo.Bath> <Houseinfo.BathInfo> {house.bathroom} </Houseinfo.BathInfo> ba</Houseinfo.Bath>
                            <Houseinfo.Area> <Houseinfo.BathInfo> {house.area} </Houseinfo.BathInfo> sqft</Houseinfo.Area>
                        </Houseinfo.Price>

            
                        <Houseinfo.Text>{house.street+" " + house.city+" "+house.state + " "+ house.zip}</Houseinfo.Text>
                        </Houseinfo.TextControl>
                        <Houseinfo.FeatureTitle>Facts and Features</Houseinfo.FeatureTitle>
                        <Houseinfo.FeatureContainer>
                            <Houseinfo.FeatureBase> 
                                <Houseinfo.FeatureIcon>
                                    <i className="fas fa-home"></i>
                                </Houseinfo.FeatureIcon>
                                    Type 
                                    <Houseinfo.FeatureText >
                                        {house.property_type?house.property_type:"No Data"}
                                        </Houseinfo.FeatureText>
                            </Houseinfo.FeatureBase>
                            <Houseinfo.FeatureBase>
                                <Houseinfo.FeatureIcon>
                                    <i className="far fa-building"></i> 
                                    </Houseinfo.FeatureIcon>
                                    Year built
                                    <Houseinfo.FeatureText>
                                        {house.year_built?house.year_built:"No Data"}
                                    </Houseinfo.FeatureText> 
                                </Houseinfo.FeatureBase>
                            {/* <Houseinfo.FeatureBase> 
                                <Houseinfo.FeatureIcon>
                                    <i className="fas fa-temperature-high"></i>  
                                    </Houseinfo.FeatureIcon>
                                    Cooling
                                <Houseinfo.FeatureText>
                                    {house.Cooling?house.Cooling:"No Data"}
                                </Houseinfo.FeatureText> 
                            </Houseinfo.FeatureBase> */}
                            <Houseinfo.FeatureBase> 
                                <Houseinfo.FeatureIcon>
                                    <i className="fas fa-parking"></i>
                                    </Houseinfo.FeatureIcon>
                                 Parking 
                                <Houseinfo.FeatureText>
                                    {house.parking===1?"Open":"Close"} Parking
                                    </Houseinfo.FeatureText>
                            </Houseinfo.FeatureBase>
                            {/* <Houseinfo.FeatureBase> 
                                <Houseinfo.FeatureIcon>
                                <i className="fas fa-temperature-low"></i>
                                </Houseinfo.FeatureIcon>
                                 Heating 
                                <Houseinfo.FeatureText>
                                    {house.Heating?house.Heating:"No Data"}
                                    </Houseinfo.FeatureText>
                            </Houseinfo.FeatureBase> */}
                            <Houseinfo.FeatureBase> 
                                <Houseinfo.FeatureIcon>
                                <i className="fas fa-grip-lines"></i>
                                </Houseinfo.FeatureIcon>Flooring 
                                <Houseinfo.FeatureText>
                                    {house.flooring?house.flooring:"No Data"}
                                    </Houseinfo.FeatureText>
                            </Houseinfo.FeatureBase>

                            <Houseinfo.FeatureBase>
                            <Houseinfo.FeatureIcon>
                                <i className="fas fa-dollar-sign"></i>
                                </Houseinfo.FeatureIcon> Price/sqft 
                                <Houseinfo.FeatureText>
                                    {house.price ? (house.price/house.area).toLocaleString("en-US", {style: "currency", currency: "USD"}):null} 
                                </Houseinfo.FeatureText>
                            </Houseinfo.FeatureBase>

                            <Houseinfo.FeatureBase>
                            <Houseinfo.FeatureIcon>
                                <i className="far fa-calendar-alt"></i>
                                </Houseinfo.FeatureIcon> Open House
                                {conditionalDate}
                            </Houseinfo.FeatureBase>
                        </Houseinfo.FeatureContainer>
                        <Houseinfo.Button to={'#'} toggleDisplay={toggleDisplay}>Application</Houseinfo.Button>
                    </Houseinfo.Base>
                </Houseinfo>
            <Application display = {display} >
                
               
            </Application>
            <Application.Base display = {display}>
                        <Application.Close toggleDisplay={toggleDisplay}><i className="far fa-window-close"></i></Application.Close>
                        <Application.Title>Application Form</Application.Title>
                        <Application.InputArea onSubmit={handleApplication} method="POST" Scroll ="hidden">
                            <Application.Input  
                                placeholder="Name"
                                value={name}
                                onChange={({ target }) => setName(target.value)}>
                            </Application.Input>
                            <Application.Input
                                 placeholder="Price"
                                 value={Application_price}
                                 onChange={({ target }) => setApplication_price(target.value)}>
                            </Application.Input>

                            <Application.Submit disabled={isInvalid} onclick={toggleDisplay}>Submit</Application.Submit>
                        </Application.InputArea>
                </Application.Base>  
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

export default HouseDetail