import React from 'react';
import { BuyLayout } from '../components/export';
import RentHousecards from './rentHousecard'
import RentFilterBar from './rentFilterBar'
function RentContainer() {
    
    // const [searchTerm, setSearchTerm] = useState('');
    // const {rentHouses, find_result} = useContext(RentContext)
    // console.log("this is rent",rentHouses)
    // const conditionalFilterBar = rentHouses ? 
    //     <RentFilterBar/> : null;

    return (
        <BuyLayout>

            <BuyLayout.SecondSection>
                <RentFilterBar search_type = "r"/>
                <BuyLayout.List>
                    <RentHousecards/>
                </BuyLayout.List>

            </BuyLayout.SecondSection>
            
        </BuyLayout>
    )
}

export default RentContainer