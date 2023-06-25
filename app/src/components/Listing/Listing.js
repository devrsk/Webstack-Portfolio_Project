import  React from 'react'
import{Link as ReactRouterLink} from 'react-router-dom'
import { Container,ListingImg,ListingButton, Title, Text,Base,ImageContainer,TextContainer} from './styles/style';

function Listing({children,...restProps}){
    return <Container {...restProps}>
                {children}</Container>
}

export default Listing

Listing.Base = function ListingBase({children, ref,...restProps}){
    return <Base {...restProps} ref = {ref}>
                {children}
                </Base>
}

Listing.Link = function ListingLink({to,children,...restProps}){
    return (

            <ReactRouterLink to = {to} {...restProps} style = {{textDecoration:"none"}}>
                            {children}
                </ReactRouterLink>
            )
}

Listing.Img = function Listing_Img({src,alt, children,...restProps}){
    return(
            <ListingImg src = {src} alt = {alt} {...restProps}>
               
                {children}
                </ListingImg>
    )
}


Listing.Button = function Listing_Button({to,func,id,children,...restProps}){
    return(
            <ReactRouterLink to = {to}>
                <ListingButton {...restProps} style={{ outline: 'none' } } onClick = {()=>func(id)}>
                    {children}
                    </ListingButton>
                </ReactRouterLink>
    )
}

Listing.Title = function ListingTitle({children,...restProps}){
    return(
        <Title {...restProps}>
            {children}
        </Title>
    )
}

Listing.Text = function ListingText({children,...restProps}){
    return(
        <Text {...restProps}>
            {children}
        </Text>
    )
}
Listing.ImageContainer = function ListingImageContainer({children,...restProps}){
        return(
            <ImageContainer {...restProps}>
                {children}
            </ImageContainer>
        )
}

Listing.TextContainer = function ListingTextContainer({children,...restProps}){
    return(
        <TextContainer {...restProps}>
            {children}
        </TextContainer>
    )
}