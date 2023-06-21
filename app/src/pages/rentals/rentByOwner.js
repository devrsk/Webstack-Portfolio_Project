import { Form } from '../../components/export';
import React, { useState, useContext, useEffect } from 'react';
import {Row} from "react-bootstrap"
import ItemAdd from "../../components/itemAdd"
import axios from 'axios';
import {DB} from '../../constants/DB';
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
        setMainPictures(newItem.image[0])
        setData(newItem);
        setInfo(true);

        console.log("new item", newItem);
        console.log('PHOTO:', newItem.image);
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
        formData.append('zip_code', zipCode);
        formData.append('available_date', available);
        formData.append('rate', rate);
        formData.append('term', term);
        formData.append('deposit', deposite);
        formData.append('ammenities', ammenities);
        formData.append('bed', bed);
        formData.append('bath', bath);
        formData.append('area', area);
        formData.append('living', living);
        formData.append('floor', floor);
        formData.append('parking', parking);
        formData.append('year_built', year);
        formData.append('description', description);

        if(formData){
            axios.post(`${DB}/api/insertProperty`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then( res => {
                console.log("File Uploaded");
                console.log(formData)
            });
        }
    }

    return (
        <React.Fragment>      
        <Row>
            <div className={`list-box`}>
                    <div className={`formBox`}>
                        <h2> Add Property </h2>
                        <Form>
                            <label htmlFor="inputRealtorID">Realtor ID</label>
                            <select onChange={e => setRealtorID(e.target.value)}>
                                <option>Select an option:</option>
                                {Object.keys(realtors).map((realtorKey) => (
                                    <option key={realtorKey} value={realtors[realtorKey].id}>
                                        {realtors[realtorKey].company_name} - {realtors[realtorKey].name}
                                    </option>
                                ))}
                            </select>
                            <div className="form-group">
                                <label htmlFor="inputSelectPropertyType">Property Type</label>
                                <select id="inputSelectPropertyType" className="form-control"
                                        value={propertyType} onChange={e => setPropertyType(e.target.value)}>
                                    <option value="Single House">Single House</option>
                                    <option value="TownHouse">Town House</option>
                                    <option value="Apartment">Apartment</option>
                                    <option value="Room">Room</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputStreetAddress">Street Address</label>
                                <input type="text" required id="inputStreetAddress" className="form-control"
                                       placeholder="Enter street address" value={streetAddress}
                                       onChange={e => setStreetAddress(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputAptNum">Apartment Number</label>
                                <input type="text" id="inputAptNum" className="form-control"
                                       placeholder="Enter apartment number" value={aptNum}
                                       onChange={e => setAptNum(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputCity">City</label>
                                <input type="text" required id="inputCity" className="form-control"
                                       placeholder="Enter city" value={city} onChange={e => setCity(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputState">State</label>
                                <input type="text" required id="inputState" className="form-control"
                                       placeholder="Enter state" value={states} onChange={e => setStates(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputZipCode">Zip Code</label>
                                <input type="text" id="inputZipCode" className="form-control"
                                       placeholder="Enter zip code" value={zipCode}
                                       onChange={e => setZipCode(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputAvailableDate">Available Date</label>
                                <input type="date" id="inputAvailableDate" className="form-control"
                                       placeholder="Enter available date" value={available}
                                       onChange={e => setAvailable(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputRate">Rate</label>
                                <input type="number" id="inputRate" className="form-control"
                                       placeholder="Enter rate" value={rate} onChange={e => setRate(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputTerm">Term (in months)</label>
                                <input type="number" id="inputTerm" className="form-control"
                                       placeholder="Enter term" value={term} onChange={e => setTerm(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputDeposit">Deposit</label>
                                <input type="number" id="inputDeposit" className="form-control"
                                       placeholder="Enter deposit" value={deposite}
                                       onChange={e => setDeposite(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputAmenities">Amenities</label>
                                <textarea id="inputAmenities" className="form-control" rows="3" cols="50"
                                          placeholder="Enter amenities" value={ammenities}
                                          onChange={e => setAmmenities(e.target.value)}>
                                </textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputBed">Bed</label>
                                <input type="number" id="inputBed" className="form-control"
                                       placeholder="Enter bed" value={bed} onChange={e => setBed(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputBath">Bath</label>
                                <input type="number" id="inputBath" className="form-control"
                                       placeholder="Enter bath" value={bath} onChange={e => setBath(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputArea">Area (in sqft)</label>
                                <input type="number" id="inputArea" className="form-control"
                                       placeholder="Enter area" value={area} onChange={e => setArea(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputLiving">Living</label>
                                <input type="number" id="inputLiving" className="form-control"
                                       placeholder="Enter living" value={living}
                                       onChange={e => setLiving(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputFloor">Flooring Type</label>
                                <select id="inputFloor" className="form-control"
                                        value={floor} onChange={e => setFloor(e.target.value)}>
                                    <option value="Carpet">Carpet</option>
                                    <option value="Wood">Wood</option>
                                    <option value="Tile">Tile</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputParking">Number of Parkings</label>
                                <input type="number" id="inputParking" className="form-control"
                                       placeholder="Enter number of parkings" value={parking}
                                       onChange={e => setParking(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputYear">Year Built</label>
                                <input type="number" id="inputYear" className="form-control"
                                       placeholder="Enter year built" value={year}
                                       onChange={e => setYear(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputDescription">Description</label>
                                <textarea id="inputDescription" className="form-control" rows="3" cols="50"
                                          placeholder="Enter description" value={description}
                                          onChange={e => setDescription(e.target.value)}>
                                </textarea>
                            </div>
                        </Form>

                        <ItemAdd createItem={createItem}/>
                        
                        <input type="submit" onClick={handleSubmit} className={`rent-btn`} value={`Add to Rent`} />

                    </div>
            </div>
        </Row>
        </React.Fragment>
    );
}

export default RentByOwner;