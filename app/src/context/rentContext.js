import React, {useState, useEffect } from 'react';
import {DB} from '../constants/DB'
const RentContext = React.createContext()
function RentProvider({children}) {
    const [rentHouses,setRentHouses] = useState()
    const [search,setSearch] = useState()
    const [rentFavorite, setRentFavorite] = useState()
    const [types,setTypes] = useState("all")
    const [bed,setBed] = useState(0)
    const [bath,setBath] = useState(0)
    const [parking, setParking] = useState(0);
    const [minRate, setMinRate] = useState(0);
    const [maxRate, setMaxRate] = useState(10000);
    const [minSize, setMinSize] = useState(0);
    const [maxSize, setMaxSize] = useState(3000);

    const [flooring, setFlooring] = useState('all')
    const [year, setYear] = useState('all')

    const Rent_Search_URL = `${DB}/rent`;
    const Rent_Favorite_URL = `${DB}/api/favorite/home`;

    const user = JSON.parse(localStorage.getItem('authUser'));
    const [favorite_search_list,setFavorite_search_list] = useState()
    function refreshPage() {
        window.location.reload(false);
      }
    useEffect( ()=>{
        fetch(Rent_Search_URL).then(response=>response.json()).then(result=>setRentHouses(result.dataset))
        
        filterData();
        if(user){

            fetch(`${DB}/api/favorite/mine?id=${user.id}`).then(response=>response.json()).then(result=>setFavorite_search_list(result.list))
            try{
                // console.log("favorite");
                fetch(`${DB}/api/favorite/home?id=${user.id}`).then(res => res.json()).then(result=>{
                    console.log(result);
                    let Favorite_List = result.list;
                    setRentFavorite(Favorite_List);
                })
            }catch(e){
                console.log(e);
            }
       }
    },[types, bed, bath, parking, minRate, maxRate, flooring, minSize, maxSize,year])


    function find_result(input){
        if(!input){
            setSearch(rentHouses)
        }else{
            const array = rentHouses.filter(house=>house.Owner_ID === input || house.city ===input)
            setSearch(array)
        }
    }

    function handleChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = event.target.name;
        if(name === "type"){
            setTypes(value);
        }
        if(name === "bed"){
            setBed(value);
        }
        if(name === "bath"){
            setBath(value);
        }
        if(name === "minRate"){
            setMinRate(value);
        }
        if(name === "maxPrice"){
            setMaxRate(value);
        }
        if(name === "minSize"){
            setMinSize(value);
        }
        if(name === "maxSize"){
            setMaxSize(value);
        }
        if(name === "flooring"){
            setFlooring(value);
        }
        if(name === "year"){
            setYear(value);
        }
        if(name === "parking"){
            if(value){
                setParking(1);
            }else{
                setParking(0);
            }
        }
    }

    function filterData(){
        if(rentHouses){
            // console.log(types, bath, bed, minRate, maxRate, minSize, maxSize, parking, flooring, available, year);
            let tempHouses = [...rentHouses];
            console.log("before filter",tempHouses);
            if(types !== "all"){
                tempHouses = tempHouses.filter(house => house.property_type === types);
            }
            console.log("after types",tempHouses);
            if(bed !== "any+"){
                tempHouses = tempHouses.filter(house=>house.bedroom >= bed);
            }
            console.log("after bed",tempHouses);
            if(bath !== "any+"){
                tempHouses = tempHouses.filter(house=>house.bedroom >= bath);
            }
            console.log("after bath",tempHouses);
            if(flooring !== "all"){
                tempHouses = tempHouses.filter(house=>house.bedroom >= bath);
            }
            console.log("after flooring",tempHouses);
            if(year !== "all"){
                tempHouses = tempHouses.filter(house=>house.year_built >= year);
            }
            console.log("after year",year);
            console.log(minRate, maxRate)
            tempHouses = tempHouses.filter(house=>house.rate <= maxRate && house.rate >= minRate)
            console.log("after rate",tempHouses);
            tempHouses = tempHouses.filter(house=>house.area <= maxSize && house.area >= minSize)
            console.log("after size",tempHouses);
            tempHouses = tempHouses.filter(house => house.parking === parking);
            console.log("after parking", tempHouses);
            // tempHouses = tempHouses.filter(house => house.available_date >= available);
            // console.log("after available",tempHouses);
            setSearch(tempHouses);
        }
    }

    // async function handleSave(search_type){
    //     const SaveSearch_URL = `${DB}/api/search?search_type=${search_type}&uid=${user.id}&min_price=${minRate}&max_price=${maxRate}&bedroom=${bed==="0"?null:bed}&bathroom=${bath==="0"?null:bath}&year_built=${year==="all"?null:year}&parking=${parking}&home_type=${types}&flooring=${flooring==="all"?null:flooring}&house_size=${minSize}`
    //     // console.log(SaveSearch_URL)
    //     try{
    //         console.log("save search");
    //         fetch(SaveSearch_URL).then(res => res.json()).then(result=>{
    //             console.log(result);
    //         })
    //     }catch(e){
    //         console.log(e);
    //     }
       
    // }

    async function handleSave(search_type){
        // console.log(search_type,types, bed, bath, parking, minPrice, maxPrice, minSize, maxSize, year);
        console.log(user)
        if(user){
            const SaveSearch_URL = `${DB}/api/search?search_type=${search_type}&uid=${user.id}&min_price=${minRate}&max_price=${maxRate}&bedroom=${bed==="0"?null:bed}&bathroom=${bath==="0"?null:bath}&year_built=${year==="all"?null:year}&parking=${parking}&home_type=${types}&flooring=${flooring==="all"?null:flooring}&house_size=${minSize}`
            try{
                console.log("save search");

                fetch(SaveSearch_URL).then(res => res.json()).then(result=>{
                    console.log(result);
                })
            }catch(e){
                console.log(e);
            }
            refreshPage()
        }else{
            alert("Please sign in to save search")
        }
    }

    async function removeRentFavorite(house,type){
        if(user){
        try{
            let res = await fetch(Rent_Favorite_URL, {
                method: 'delete',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    U_ID: user.id,
                    home_type :"r", 
                    properity_id:(type ==="S"?house.S_ID:house.R_ID),
                })
            });
            let result = await res.json();
            // console.log(result);
            if(result && result.success){
                console.log("successful delete from favorite");
            }else if(result && result.success === false){
                alert(result.msg);
            }
        }catch(e){
            console.log(e);
        }
        // const update = favorite.filter()
        try{
            // console.log("favorite");
            fetch(`${DB}/api/favorite/home?id=${user.id}`).then(res => res.json()).then(result=>{
                console.log("after remove",result);
                let Favorite_List = result.list;
                setRentFavorite(Favorite_List);
            })
        }catch(e){
            console.log(e);
        }
    }else{
        alert("Please sign in to remove favorite house")
    }
    }

   

    async function addRentFavorite(house){
        // console.log(user)
        if(user){
        try{
            let res = await fetch(Rent_Favorite_URL, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    U_ID: user.id,
                    home_type :"r", 
                    properity_id:house.R_ID,
                })
            });
            let result = await res.json();
            // console.log(result);
            if(result && result.success){
                console.log("successful add to favorite");
            }else if(result && result.success === false){
                alert(result.msg);
            }
        }catch(e){
            console.log(e);
        }
        try{
            // console.log("favorite");
            fetch(`${DB}/api/favorite/home?id=${user.id}`).then(res => res.json()).then(result=>{
                console.log("after add",result);
                let Favorite_List = result.list;
                setRentFavorite(Favorite_List);
            })
        }catch(e){
            console.log(e);
        }
    }else{
        alert("Please sign in add favorite house")
    }
 
    }

    return (
        <>
        <RentContext.Provider  value={{
            rentHouses, handleChange,handleSave,find_result,search,setSearch,rentFavorite, removeRentFavorite,addRentFavorite, minSize, maxSize
            }}>
            {children}
        </RentContext.Provider>
        </>
    )
}



export{RentProvider, RentContext}