import React, { useContext } from 'react';
import { Badge } from 'react-bootstrap';
import { Context } from '../context/housesContext';
//import { BuyLayout } from '../components/export';

const getUnique = (items, value) => {
  return [...new Set(items.map(item => item[value]))];
};

export default function FilterBar(props) {
  const context = useContext(Context);
  const {
    handleChange,
    handleSave,
    type,
    bed,
    bath,
    minPrice,
    maxPrice,
    flooring,
    minSize,
    maxSize,
    parking,
    year,
    houses,
  } = context;


  let types = [];
  let beds = [];
  let baths = [];
  let prices = [];
  let floorings = [];
  let years = [];

  if (houses) {
    types = getUnique(houses, 'property_type');
    types = ['all', ...types];
    types = types.map((item, index) => {
      return <option value={item} key={index}>{item}</option>
    });

    beds = [1, 2, 3, 4, 5];
    beds = ['any', ...beds];
    beds = beds.map((item, index) => {
      return <option value={item} key={index}>{item}+</option>
    });

    baths = [1, 2, 3, 4, 5];
    baths = ['any', ...baths];
    baths = baths.map((item, index) => {
      return <option value={item} key={index}>{item}+</option>
    });

    prices = [500000, 1000000, 1500000, 2000000, 2500000, 3000000, 3500000];
    prices = prices.map((item, index) => {
      return <option value={item} key={index + 1}>{item}</option>
    });

    floorings = getUnique(houses, "flooring");
    floorings = ['any', ...floorings];
    floorings = floorings.map((item, index) => {
      return <option value={item} key={index + 1}>{item}</option>
    });

    years = [1990, 1995, 2000, 2005, 2010, 2015, 2020];
    years = ['all', ...years];
    years = years.map((item, index) => {
      return <option value={item} key={index}>{item}</option>
    });
  }
  return (
    <section className="filter-container">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ textAlign: 'center' }}>
          <Badge variant="secondary">House Filter</Badge>
        </h1>
      </div>
      <form className="filter-form">
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
            value={bath}
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

        <div className="form-group">
          <label htmlFor="minPrice">Min Price</label>
          <select
            name="minPrice"
            id="minPrice"
            value={minPrice}
            className="form-control"
            onChange={handleChange}>
            <option value={0} key={0}>0</option>
            {prices}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="maxPrice">Max Price</label>
          <select
            name="maxPrice"
            id="maxPrice"
            value={maxPrice}
            className="form-control"
            onChange={handleChange}>
            <option value={10000000} key={0}>10000000</option>
            {prices}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="flooring">Flooring</label>
          <select
            name="flooring"
            id="flooring"
            value={flooring}
            className="form-control"
            onChange={handleChange}>
            {floorings}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="size">
            House size
          </label>
          <div className="size-inputs">
            <input type="number" name="minSize" min={minSize} id="minSize" value={minSize} onChange={handleChange} className="size-input" />
            <input type="number" name="maxSize" min={maxSize} id="maxSize" value={maxSize} onChange={handleChange} className="size-input" />
          </div>
        </div>

        <div className="form-group">
          <div className="single-extra">
            <input type="checkbox" name="parking" id="parking" checked={parking} onChange={handleChange} />
            <label htmlFor="parking">Parking</label>
          </div>
        </div>
      </form>
      <button className="filter-button" onClick={() => handleSave(props.search_type)}>Reset Filters</button>
    </section>
  );
}