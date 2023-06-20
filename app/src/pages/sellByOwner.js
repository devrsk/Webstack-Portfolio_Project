import { Form } from '../components/export';
import React, { useState, useContext, useEffect } from 'react';
import {Row} from "react-bootstrap"
import ItemAdd from "../components/itemAdd"
import axios from 'axios';
import Footer from "../containers/footer"
import {DB} from '../constants/DB'
// import ListingPic from '../img/homeicon.png'
import { RealtorContext } from '../context/realtorContext';
 
function SellByOwner() {
    const {realtors} = useContext(RealtorContext)

    const [realtorID, setRealtorID] = useState('');
    const [error] = useState('');
    const [propertyType, setPropertyType] = useState("Single House");
    const [streetAddress, setStreetAddress] = useState('');
    const [aptNum, setAptNum] = useState('');
    const [city, setCity] = useState('');
    const [states, setStates] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [bed, setBed] = useState('');
    const [bath, setBath] = useState('');
    const [area, setArea] = useState('');
    const [living, setLiving] = useState('');
    const [floor, setFloor] = useState("Carpet");
    const [parking, setParking] = useState(1);
    const [price, setPrice] = useState('');
    const [year, setYear] = useState('');
    const [mainPictures, setMainPictures] = useState([]);
    const [otherPictures, setOtherPictures] = useState([]);
    const [description, setDescription] = useState('');
    const [data,setData] = useState();
    const [info,setInfo] = useState(false);
 
    const user = JSON.parse(localStorage.getItem('authUser'));

    const createItem= async(newItem) => {
        console.log("click")
        setMainPictures(newItem.image[0])
        setData(newItem);
        setInfo(true);
    }

    useEffect(()=>{
        if(data){
            console.log("i am here");
        }
    },[data, realtorID])

    const Upload_URL = `${DB}/upload`

    const isInvalid = price === '' || mainPictures === '' || otherPictures === '' || propertyType === '' || streetAddress === '' || city === '' || states === '' || zipCode === '' || bed === '' || bath === '' || area === '' || year === '' || description === '' || parking === '' || floor === '' || living === '';

    async function handleSubmit(){
        const formData = new FormData();
        formData.append('list_type', "sell");
        formData.append('main', mainPictures);
        data.image.slice(1).forEach(file=>{
            formData.append('others', file);
        });

        formData.append('owner', user.id);
        formData.append('Realtor_ID', realtorID);
        formData.append('p_type', propertyType);
        formData.append('apt_num', aptNum);
        formData.append('street', streetAddress);
        formData.append('city', city);
        formData.append('state', states);
        formData.append('zip', zipCode);
        formData.append('price', price);
        formData.append('bedroom', bed);
        formData.append('bathroom', bath);
        formData.append('livingroom', living);
        formData.append('flooring', floor);
        formData.append('parking', parking);
        formData.append('area', area);
        formData.append('year', year);
        formData.append('description', description);
        formData.append('status', 'A');

        console.log("owner", formData.get('owner'));
        console.log("realtor", formData.get('realtor'));
        console.log("p_type", formData.get('p_type'));
        console.log("street", formData.get('street'));
        console.log("city", formData.get('city'));
        console.log("apt_num", formData.get('apt_num'));
        console.log("state", formData.get('state'));
        console.log("zip", formData.get('zip'));
        console.log("price", formData.get('price'));
        console.log("bedroom", formData.get('bedroom'));
        console.log("bathroom", formData.get('bathroom'));
        console.log("livingroom", formData.get('livingroom'));
        console.log("flooring", formData.get('flooring'));
        console.log("parking", formData.get('parking'));
        console.log("area", formData.get('area'));
        console.log("year",formData.get('year'));
        console.log("description",formData.get('description'));
        console.log("status",formData.get('status'));
        console.log("main",formData.get('main'));
        console.log("others",formData.get('others'));

        axios({
            method: "POST",
            url: Upload_URL,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
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
            return <Form.Option value={index} key={index}>{item}</Form.Option>
        });
    }

    if(info){
        return (
            <>
            
                <div style={{backgroundImage:"url('paper.gif')"}}>
                    
                <Form style={{backgroundColor: "grey"}}>
                    <Form.Title>Post a For Sale by Owner Listing</Form.Title>
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
                                //pattern="[A-Z][a-z]"
                            />
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
                                pattern="[0-9]{4}"
                            />
                        </Row>
                        <Row style={{margin: "auto"}}>
                            <Form.Input
                                placeholder="Bed #"
                                value={bed}
                                onChange={({ target }) => setBed(target.value)}
                                style={{width: "100px", marginRight: "2.5px"}}
                                pattern="[0-9]{1}"
                            />
                            <Form.Input
                                placeholder="Bath #"
                                value={bath}
                                onChange={({ target }) => setBath(target.value)}
                                style={{width: "100px", marginLeft: "2.5px", marginRight: "2.5px"}}
                                pattern="[0-9]{1}"
                            />
                            <Form.Input
                                placeholder="Area #"
                                value={area}
                                onChange={({ target }) => setArea(target.value)}
                                style={{width: "100px", marginLeft: "2.5px"}}
                                pattern="^[0-9]*$"
                            />
                        </Row>
                        <Row style={{margin: "auto"}}>
                            <Form.Select style={{width: "150px", marginRight: "6px"}} onChange={({ target }) => setFloor(target.value)}>
                                    <Form.Option
                                        value="Carpet"
                                        >Carpet</Form.Option>
                                    <Form.Option 
                                        value="Wooden"
                                        >Wooden</Form.Option>
                            </Form.Select>
                            <Form.Select style={{width: "150px", marginLeft: "6px"}} onChange={() => setParking(1)}>
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
                            placeholder="Price $"
                            value={price}
                            onChange={({ target }) => setPrice(target.value)}
                            pattern="^[0-9]*$"
                        />
                        <Form.TextArea
                            placeholder="Description"
                            value={description}
                            onChange={({ target }) => setDescription(target.value)}
                            style={{height: "300px"}}
                        />
                        <Form.Submit type="submit" disable={isInvalid}>
                            Post Listing
                        </Form.Submit>
                    </Form.Base>
                </Form>
                </div>
             
            </>
        )
    }else{
        return(
            <>
            <ItemAdd maxCount="6" type="Sell" key="1" createItem={createItem} />
            <Footer/>
            </>
        )
    }
}

export default SellByOwner

