import React,{useState,useContext} from 'react';
import { RentContext } from '../context/rentContext';
import { Badge} from 'react-bootstrap';
//import { BuyLayout } from '../components/export';

//get all unique values
const getUnique = (items, value) => {
    return [...new Set(items.map(item => item[value]))];
};

export default function RentFilterBar(props) {
    const context = useContext(RentContext);
    // console.log(props.search_type)

    const [searchTerm, setSearchTerm] = useState('');
    // console.log(context);
    const {
        handleChange,
        handleSave,
        type,
        bed,
        minRate,
        maxRate,
        flooring,
        minSize,
        maxSize,
        parking,
        year,
        rentHouses,
    } = context;
    let types = [];
    let beds = [];
    let baths = [];
    let rates = [];
    let floorings = [];
    let years = [];
    // //get unique types
    if(rentHouses){
        types = getUnique(rentHouses, 'property_type');
        types = ['all', ...types];
        types = types.map((item, index) => {
            return <option value={item} key={index}>{item}</option>
        });
        
        beds = [1,2,3,4,5]
        beds = ['any', ...beds];
        beds = beds.map((item, index) => {
            return <option value={item} key={index}>{item}+</option>
        });

        baths = [1,2,3,4,5]
        baths = ['any', ...baths];
        baths = baths.map((item, index) => {
            return <option value={item} key={index}>{item}+</option>
        });

        rates = [1000,2000,2500,3000,3500,4000,5000]
        rates = rates.map((item, index) => {
            return <option value={item} key={index+1}>{item}</option>
        });

        floorings = getUnique(rentHouses, "flooring");
        floorings = ['all', ...floorings];
        floorings = floorings.map((item, index) => {
            return <option value={item} key={index}>{item}</option>
        });

        years = [1990,1995,2000,2005,2010,2015,2020]
        years = ['all', ...years];
        years = years.map((item, index) => {
            return <option value={item} key={index}>{item}</option>
        });
    }

    

    return (
        <section className="filter-container">
            <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ textAlign: 'center' }}>
          <Badge variant="secondary">Rent Filter</Badge>  
          </h1>
        </div>
            <form className="filter-form">
                {/*select type */}
                <div className="form-group">
                    <label htmlFor="type">House type</label>
                    <select
                        name="type"
                        id="type"
                        value={type}
                        className="form-control"
                        onChange={handleChange}>
                        {types}
                    </select>
                </div>
                
                {/*bed*/}
                <div className="form-group">
                    <label htmlFor="bed">Bed</label>
                    <select
                        name="bed"
                        id="bed"
                        value={bed}
                        className="form-control"
                        onChange={handleChange}>
                        {beds}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="bath">Bath</label>
                    <select
                        name="bath"
                        id="bath"
                        value={bed}
                        className="form-control"
                        onChange={handleChange}>
                        {baths}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="year">Year Built</label>
                    <select
                        name="year"
                        id="year"
                        value={year}
                        className="form-control"
                        onChange={handleChange}>
                        {years}
                    </select>
                </div>

                {/*minPrice*/}
                <div className="form-group">
                    <label htmlFor="minRate">Min Rate</label>
                    <select
                        name="minRate"
                        id="minRate"
                        value={minRate}
                        className="form-control"
                        onChange={handleChange}>
                        <option value={0} key={0}>0</option>
                        {rates}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="maxRate">Max Rate</label>
                    <select
                        name="maxRate"
                        id="maxRate"
                        value={maxRate}
                        className="form-control"
                        onChange={handleChange}>
                        <option value={10000} key={0}>10000</option>
                        {rates}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="flooring">Flooring</label>
                    <select 
                        name="flooring"
                        id="flooring"
                        value={flooring}
                        className="form-control"
                        onChange={handleChange}
                    >{floorings}</select>
                </div>
                <div className="form-group">
                    <label htmlFor="size">
                        house size
                    </label>
                    <div className="size-inputs">
                        <input type="number" name="minSize" min={minSize} id="size" value={minSize} onChange={handleChange} className="size-input" />
                        <input type="number" name="maxSize" min={maxSize} id="size" value={maxSize} onChange={handleChange} className="size-input" />
                    </div>
                </div>

                <div className="form-group">
                    <div className="single-extra">
                        <input type="checkbox" name="parking" id="parking" checked={parking} onChange={handleChange} />
                        <label htmlFor="parking">Parking</label>
                    </div>
                </div>
            </form>
            <button className="filter-button"  onClick={()=>handleSave(props.search_type)}>Reset Filters</button>
        </section>
    )
}