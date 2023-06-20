import React from 'react'
import { Container, Map, List,SecondSection,Search,SearchIcon,SearchInput,FirstSection,Footer,Button, ButtonSection} from './styles/style';
function Buy({children, ...restProps}){
    return(
        <Container {...restProps}>
            {children}
            </Container>
    )
}

Buy.FirstSection = function BuyFirst({children,...restProps}){
    return(
        <FirstSection {...restProps}>
            {children}
            </FirstSection>
    )
}

Buy.SecondSection = function BuySecond({children,...restProps}){
    return(
        <SecondSection {...restProps}>
            {children}
            </SecondSection>
    )
}
Buy.Footer = function BuyFooter({children,...restProps}){
    return(
        <Footer {...restProps}>
            {children}
            </Footer>
    )
}
Buy.Map = function BuyMap({children,...restProps}){
    return(
        <Map {...restProps}>
            {children}
            </Map>
    )

}


Buy.List = function BuyList({ children, ...restProps }) {
    return <List {...restProps}>{children}</List>;
}

// Buy.Dropdown = function BuyDRopdown({ children, ...restProps }) {
//     return <Dropdown {...restProps}>{children}</Dropdown>
// }

Buy.Search = function BuySearch ({ searchTerm, setSearchTerm,find_result, placeholder, ...restProps }){
    return (
        <Search {...restProps }>
            
            <SearchInput
                value={searchTerm}
                onChange={({ target }) => setSearchTerm(target.value)}
                placeholder={placeholder}

            />
            <SearchIcon style={{ outline: 'none' } } onClick = {()=>find_result(searchTerm)}>
                    <i className="fas fa-search"></i>
            </SearchIcon>
        </Search>
    )
} 

// did not follow the format

Buy.ButtonSection = function BuyButton({ children, ...restProps }){
    return (
        <>
        <ButtonSection>
            <Button>For Sell</Button>
            <Button>Price</Button>
            <Button>Beds & Baths</Button>
            <Button>Houses</Button>
            <Button style={{backgroundColor: "blue", color:"white"}}>Save Search</Button>
        </ButtonSection>
        </>
    )
}
export default Buy