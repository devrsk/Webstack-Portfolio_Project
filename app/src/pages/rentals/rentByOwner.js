import { Form } from '../../components/export';
import React, { useState, useContext, useEffect } from 'react';
import {Row} from "react-bootstrap"
import ItemAdd from "../../components/itemAdd"
import axios from 'axios';
import {DB} from '../../constants/DB'
// import rentNavbar from '../../containers/rentNav'
import { RealtorContext } from '../../context/realtorContext';
 
function RentByOwner() {
    const {realtors} = useContext(RealtorContext)

    const [realtorID, setRealtorID] = useState('');
    const [error] = useState('');
    const [propertyType, setPropertyType] = useState("Single House");
    const [streetAddress, setStreetAddress] = useState('');
    const [aptNum, setAptNum] = useState('');
    const [city, setCity] = useState('');
    const [states, setStates] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [available, setAvailable] = useState('');
    const [rate, setRate] = useState('');
    const [term, setTerm] = useState('3');
    const [deposite, setDeposite] = useState('');
    const [ammenities, setAmmenities] = useState('');
    const [bed, setBed] = useState('');
    const [bath, setBath] = useState('');
    const [area, setArea] = useState('');
    const [living, setLiving] = useState('');
    const [floor, setFloor] = useState("Carpet");
    const [parking, setParking] = useState(1);
    const [year, setYear] = useState('');
    const [mainPictures, setMainPictures] = useState([]);
    const [otherPictures] = useState([]);
    const [description, setDescription] = useState('');
    const [data,setData] = useState();
    const [info,setInfo] = useState(false);

    const user = JSON.parse(localStorage.getItem('authUser'));

    const Upload_URL = `${DB}/upload`
    useEffect(()=>{
        if(data){
            console.log("i am here");
        }
        // console.log("effect main", mainPictures);
        // console.log("effect other", otherPictures);
        // setPictures(formData);
    },[data])

    const createItem= async(newItem) => {
        // console.log(error);
        // console.log(newItem);
        // console.log('PHOTO:', newItem.image);
        setMainPictures(newItem.image[0])
        setData(newItem);
        setInfo(true);
    }
    useEffect(()=>{
        if(data){
            console.log("i am here");
        }
    },[data, realtorID])


    
    function handleSubmit(){
        const formData = new FormData();
        formData.append('list_type', "rent");
        formData.append('main', mainPictures);
        data.image.slice(1).forEach(file=>{
            formData.append('others', file);
        });

        formData.append('Owner_ID', user.id);
        formData.append('Realtor_ID', realtorID);
        formData.append('property_type', propertyType);
        formData.append('apt_num', aptNum);
        formData.append('street', streetAddress);
        formData.append('city', city);
        formData.append('state', states);
        formData.append('zip', zipCode);
        formData.append('available_date', available);
        formData.append('rate', rate);
        formData.append('lease_term', term);
        formData.append('security_deposit', deposite);
        formData.append('ammenities', ammenities);
        formData.append('bedroom', bed);
        formData.append('bathroom', bath);
        formData.append('livingroom', living);
        formData.append('flooring', floor);
        formData.append('parking', parking);
        formData.append('area', area);
        formData.append('year_built', year);
        formData.append('description', description);
        formData.append('status', 'A');
    
        // console.log(formData.get('main'));
        // console.log(formData.get('others'));
        // console.log(formData.get('p_type'));
        // console.log(formData.get('street'));
        // console.log(formData.get('apt_num'));
        // console.log(formData.get('state'));
        // console.log(formData.get('zip'));
        // console.log(formData.get('price'));
        // console.log(formData.get('bedroom'));
        // console.log(formData.get('bathroom'));
        // console.log(formData.get('livingroom'));
        // console.log(formData.get('flooring'));
        // console.log(formData.get('parking'));
        // console.log(formData.get('area'));
        // console.log(formData.get('year'));
        // console.log(formData.get('description'));
        // console.log(formData.get('status'));

        axios({
            method: "POST",
            url: Upload_URL,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    }

    const isInvalid = mainPictures === '' || otherPictures === '' || available === '' || rate === '' || term === '' || deposite === '' || ammenities === '' || description === '' || propertyType === '' || streetAddress === '' || city === '' || zipCode === '' || bed === '' || bath === '' || area === '' || floor === '' || living === '' || year === '' || parking === '' || states === '';

    const getUnique = (items, value) => {
        return [...new Set(items.map(item => item[value]))];
    };

    let agents = [];
    // //get unique types
    if(realtors){
        agents = getUnique(realtors, 'Fname');
        agents = ['Realtor', ...agents];
        agents = agents.map((item, index) => {
            return <Form.Option value={index} key={index}>{item}</Form.Option>
        });
    }

    if(info){
        return (
            <>
            {/* <rentNavbar/> */}
            <Form style={{backgroundColor: "grey"}}>
                <Form.Title>Post a For Rent by Owner Listing</Form.Title>
                {error && <Form.Error>{error}</Form.Error>}
                <Form.Base onSubmit={handleSubmit}>
                    <Form.Select onChange={({ target }) => setPropertyType(target.value)}>
                        <Form.Option
                            value="Single House"
                            >Single House</Form.Option>
                        <Form.Option 
                            value="Townhouse"
                            >Townhouse</Form.Option>
                        <Form.Option 
                            value="Apartment"
                            >Apartment</Form.Option>
                    </Form.Select>
                    <Form.Select onChange={({ target }) => setRealtorID(target.value)}>
                        {agents}
                    </Form.Select>
                    <Form.Input
                        placeholder="Street Address"
                        value={streetAddress}
                        onChange={({ target }) => setStreetAddress(target.value)}
                        pattern="^[A-Za-z-0-99999999"
                    />
                    <Row style={{margin: "auto"}}>
                        <Form.Input
                            placeholder="Apt #"
                            value={aptNum}
                            onChange={({ target }) => setAptNum(target.value)}
                            style={{width: "150px", marginRight: "5px"}}
                            pattern="^[0-9]*$"
                        />
                        <Form.Input
                            placeholder="City"
                            value={city}
                            onChange={({ target }) => setCity(target.value)}
                            style={{width: "150px", marginLeft: "5px"}}
                            pattern="^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$"
                        />
                    </Row>
                    <Row style={{margin: "auto"}}>
                        <Form.Input
                            placeholder="Zip #"
                            value={zipCode}
                            onChange={({ target }) => setZipCode(target.value)}
                            style={{width: "150px", marginRight: "5px"}}
                            pattern="[0-9]{5}"
                        />
                        <Form.Input
                            placeholder="State"
                            value={states}
                            onChange={({ target }) => setStates(target.value)}
                            style={{width: "150px", marginLeft: "5px"}}
                            //pattern="[A-Z][a-z]+(?: +[A-Z][a-z]+)*"
                        />
                    </Row>
                    <Row style={{margin: "auto"}}>
                        <Form.Input
                            placeholder="Deposite"
                            value={deposite}
                            onChange={({ target }) => setDeposite(target.value)}
                            style={{width: "150px", marginRight: "5px"}}
                            pattern="^[0-9]*$"
                        />
                        <Form.Input
                            placeholder="Rate"
                            value={rate}
                            onChange={({ target }) => setRate(target.value)}
                            style={{width: "150px", marginLeft: "5px"}}
                            pattern="^[0-9]*$"
                        />
                    </Row>
                    <Row style={{margin: "auto"}}>
                        <Form.Input
                            placeholder="2020-01-01"
                            value={available}
                            onChange={({ target }) => setAvailable(target.value)}
                            style={{width: "150px", marginRight: "5px"}}
                            //pattern="^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$"
                        />
                        <Form.Select style={{width: "150px", marginLeft: "6px"}} onChange={({ target }) => setTerm(target.value)}>
                                <Form.Option
                                    value="3"
                                    >3 months</Form.Option>
                                <Form.Option 
                                    value="6"
                                    >6 months
                                </Form.Option>
                                <Form.Option 
                                    value="12"
                                    >12 months
                                </Form.Option>
                        </Form.Select>
                    </Row>
                    <Row style={{margin: "auto"}}>
                        <Form.Input
                            placeholder="Living #"
                            value={living}
                            onChange={({ target }) => setLiving(target.value)}
                            style={{width: "150px", marginRight: "5px"}}
                            pattern="^[0-9]*$"
                        />
                        <Form.Input
                            placeholder="Year #"
                            value={year}
                            onChange={({ target }) => setYear(target.value)}
                            style={{width: "150px", marginLeft: "5px"}}
                            pattern="^[0-9]{4}"
                        />
                    </Row>
                    <Row style={{margin: "auto"}}>
                        <Form.Input
                            placeholder="Bed #"
                            value={bed}
                            onChange={({ target }) => setBed(target.value)}
                            style={{width: "100px", marginRight: "2.5px"}}
                            pattern="^[0-9]*$"
                        />
                        <Form.Input
                            placeholder="Bath #"
                            value={bath}
                            onChange={({ target }) => setBath(target.value)}
                            style={{width: "100px", marginLeft: "2.5px", marginRight: "2.5px"}}
                            pattern="^[0-9]*$"
                        />
                        <Form.Input
                            placeholder="Area #"
                            value={area}
                            onChange={({ target }) => setArea(target.value)}
                            style={{width: "100px", marginLeft: "2.5px"}}
                            pattern="^[0-9]*$"
                        />
                    </Row>
                    <Row style={{margin: "auto"}} onChange={({ target }) => setFloor(target.value)}>
                        <Form.Select style={{width: "150px", marginRight: "6px"}}>
                                <Form.Option
                                    value="Carpet"
                                    >Carpet</Form.Option>
                                <Form.Option 
                                    value="Wooden"
                                    >Wooden</Form.Option>
                        </Form.Select>
                        <Form.Select style={{width: "150px", marginLeft: "6px"}} onChange={({ target }) => setParking(target.value)}>
                                <Form.Option
                                    value="1"
                                    >Open</Form.Option>
                                <Form.Option 
                                    value="0"
                                    >Close
                                </Form.Option>
                        </Form.Select>
                    </Row>
                    <Form.Input
                            placeholder="Ammenities"
                            value={ammenities}
                            onChange={({ target }) => setAmmenities(target.value)}
                        />
                    <Form.TextArea
                        placeholder="Description"
                        value={description}
                        onChange={({ target }) => setDescription(target.value)}
                        style={{height: "300px"}}
                    />
                    <Form.Submit type="submit" disable={isInvalid}>
                        Continue
                    </Form.Submit>
                </Form.Base>
            </Form>
            </>
        )
    }else{
        return(
            <ItemAdd maxCount="6" type="Rent" key="1" createItem={createItem} />
        )
    }
}

export default RentByOwner