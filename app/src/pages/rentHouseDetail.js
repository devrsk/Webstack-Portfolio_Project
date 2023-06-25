import React,{useContext} from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import {useParams} from 'react-router-dom'
import { RentContext } from '../context/rentContext';
import {Houseinfo} from '../components/export'
import { Application } from '../components/export';
import LoadingContainer from '../containers/LoadingContainer'
import {Row, Col} from 'react-bootstrap'
import {DB} from '../constants/DB'

function RentHouseDetail(props){
    const {rentHouses} = useContext(RentContext);
    const {id} = useParams()
 
    const [house,setHouse] = useState()
    const [check,setCheck] = useState(false)
    const [display,setDisplay] = useState("none")
    const [visitDisplay,setVisitDisplay] = useState("none")
    const [name,setName]= useState('')
    const [credit, setCredit]= useState('')
    const [employer, setEmployer] = useState('')
    const [salary, setSalary] = useState('')

    // const Rent_Applicaiton_URL = `${DB}/rentRequest`
    const user = JSON.parse(localStorage.getItem('authUser'));
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const VisitIsInvalid = (startDate === undefined||startDate === '') | (endDate === undefined||endDate === '');


    const isInvalid = name === '' || credit === '' || employer === '' || salary === '';
    useEffect(()=>{
        if(rentHouses !== undefined){
            const temp_id = parseInt(id);
            rentHouses.map(list=>{
                if(list.R_ID === temp_id){
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
    function toggleDisplay(){
        if(display === "none")
            setDisplay("display")
        else
            setDisplay("none")
    }
    function toggleVisitDisplay(){
        if(visitDisplay === "none")
            setVisitDisplay("display")
        else
           setVisitDisplay("none")
    }
    

    const house_imge = check? house.pic_dir.map(image =>(
        <Houseinfo.img key = {Math.random() } src = {image}/>
    )): "null";
    
    const Visit_URL = `${DB}/visit`

    async function handleVisit(event){
        event.preventDefault();
            console.log("ID", house.R_ID)
            try{
                let res = await fetch(Visit_URL, {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ID: user.id,
                        property_ID: house.R_ID,
                        start_time: startDate,
                        end_time:endDate
                    })
                });
                let result = await res.json();
                console.log(result);
       
                if(result && result.success){
                    console.log("successful submited OpenHouse");
                    setCheck(!check)
                }else if(result && result.success === false){
             
                    alert(result.msg);
                }
            }catch(e){
                console.log(e);
      
            }
    }

    const cancelFormDisplay = () => {
        // Code to handle closing the form
        // For example, you can update a state variable to hide the form
        setDisplay(false);
      };

     
    const Applicaiton_URL = `${DB}/rentRequest`
    async function handleApplication (event){
        
        event.preventDefault();
        if(user){
            // console.log(user.id)
            // console.log(house.R_ID)
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
                        renter_ID : user.id,
                        property_ID : house.R_ID,
                        credit_score: credit,
                        employer : employer,
                        annual_salary: salary,
                        renter_name: name
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
                        <Houseinfo.Title><p style={{display:"inline", color: "#ff8286"}}> {house.property_type} </p>For Rent</Houseinfo.Title>
                        
                        <Houseinfo.Price>
                            {house.rate ? house.rate.toLocaleString("en-US", {style: "currency", currency: "USD"}):null} 
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
                            <Houseinfo.FeatureBase> 
                                <Houseinfo.FeatureIcon>
                                    <i className="fas fa-temperature-high"></i>  
                                    </Houseinfo.FeatureIcon>
                                    Available
                                <Houseinfo.FeatureText>
                                    {house.available_date?house.available_date.substring(0, 10):"No Data"}
                                </Houseinfo.FeatureText> 
                            </Houseinfo.FeatureBase>
                            <Houseinfo.FeatureBase> 
                                <Houseinfo.FeatureIcon>
                                    <i className="fas fa-parking"></i>
                                    </Houseinfo.FeatureIcon>
                                 Parking 
                                <Houseinfo.FeatureText>
                                    {house.parking===1?"Open":"Close"} Parking
                                    </Houseinfo.FeatureText>
                            </Houseinfo.FeatureBase>
                            <Houseinfo.FeatureBase> 
                                <Houseinfo.FeatureIcon>
                                <i className="fas fa-temperature-low"></i>
                                </Houseinfo.FeatureIcon>
                                 Term 
                                <Houseinfo.FeatureText>
                                    {house.lease_term?house.lease_term+" months":"No Data"}
                                    </Houseinfo.FeatureText>
                            </Houseinfo.FeatureBase>
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
                                </Houseinfo.FeatureIcon> Deposite 
                                <Houseinfo.FeatureText>
                                    {house.security_deposit ? house.security_deposit.toLocaleString("en-US", {style: "currency", currency: "USD"}):null}                                </Houseinfo.FeatureText>
                            </Houseinfo.FeatureBase>
                            <Houseinfo.FeatureBase>
                            <Houseinfo.FeatureIcon>
                                <i className="far fa-calendar-alt"></i>
                                </Houseinfo.FeatureIcon> Open Visit
                            </Houseinfo.FeatureBase>
                        </Houseinfo.FeatureContainer>
                        <Row style={{margin: "auto"}}>
                            <Col>
                                <Houseinfo.Button to={'#'} toggleDisplay={toggleDisplay}>Show Interest</Houseinfo.Button>
                            </Col>
                            <Col>
                            <   Houseinfo.Button to={'#'} toggleDisplay={toggleVisitDisplay}>Schedule Visit</Houseinfo.Button>
                            </Col>
                        </Row>
                    </Houseinfo.Base>
                </Houseinfo>
            <Application display = {display} >
                
               
            </Application>

            <Application.Base display = {display}>
                <Application.Title>Application Form</Application.Title>
                <Application.InputArea onSubmit={handleApplication} method="POST" Scroll ="hidden">
                    <Application.Input  
                        placeholder="Name"
                        value={name}
                        onChange={({ target }) => setName(target.value)}>
                    </Application.Input>
                    <Application.Input
                            placeholder="Credit Score"
                            value={credit}
                            onChange={({ target }) => setCredit(target.value)}>
                    </Application.Input>
                    <Application.Input
                            placeholder="Employer"
                            value={employer}
                            onChange={({ target }) => setEmployer(target.value)}>
                    </Application.Input>
                    <Application.Input
                            placeholder="Annual Income"
                            value={salary}
                            onChange={({ target }) => setSalary(target.value)}>
                    </Application.Input>

                    <Application.Submit disabled={isInvalid} onclick={toggleDisplay}>Submit</Application.Submit>
                    <Application.Submit  disabled={VisitIsInvalid} onclick={cancelFormDisplay}>Cancel</Application.Submit>
                </Application.InputArea>
            </Application.Base> 

            <Application display = {visitDisplay} >
                
               
            </Application>

            <Application.Base display = {visitDisplay}>
                <Application.Title>Schedule Visit Form</Application.Title>
                        <Application.InputArea onSubmit={handleVisit} method="POST" Scroll = "scroll">
                        
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
                           <Application.Submit  disabled={VisitIsInvalid} onclick={toggleVisitDisplay}>Submit</Application.Submit>
                           &nbsp;&nbsp;
                           <Application.Submit  disabled={VisitIsInvalid} onclick={cancelFormDisplay}>Cancel</Application.Submit>
                            
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

export default RentHouseDetail