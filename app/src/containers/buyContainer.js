import React from 'react';
import { BuyLayout } from '../components/export';
import Housecards from './housecards'
import FilterBar from './FilterBar'
function Buy() {

    return (
        <BuyLayout>
            <BuyLayout.SecondSection>
                <FilterBar search_type = "b"/>
                <BuyLayout.List>
                    <Housecards/>
                </BuyLayout.List>

            </BuyLayout.SecondSection>
            
        </BuyLayout>
    )
}

export default Buy