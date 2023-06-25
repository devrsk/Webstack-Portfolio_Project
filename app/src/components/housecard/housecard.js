import  React from 'react'
import{Link as ReactRouterLink} from 'react-router-dom'
import { Container, CardImg, CardButton, Title, Text,Base,Favorite,ImageContainer,TextContainer,Content,TextControl,NormalText,Price,Error} from './styles/style';

function Housecard({children,...restProps}){
    return <Container {...restProps}>
                {children}</Container>
}

export default Housecard

Housecard.Base = function HousecardBase({children, ref,...restProps}){
    return <Base {...restProps} ref = {ref}>
                {children}
                </Base>
}

Housecard.Error = function HousecardError({children,...restProps}){
    return <Error {...restProps} >
                {children}
                </Error>
}
Housecard.Content = function HousecardContent({children,...restProps}){
    return <Content {...restProps}>
                {children}
                </Content>
}
Housecard.Link = function HousecardLink({to,children,...restProps}){
    return (

            <ReactRouterLink to = {to} {...restProps} style = {{textDecoration:"none"}}>
                            {children}
                </ReactRouterLink>
            )
}

Housecard.img = function HousecardImg({src,alt, children,...restProps}){
    return(
            <CardImg src = {src} alt = {alt} {...restProps}>
               
                {children}
                </CardImg>
    )
}
Housecard.Favorite = function HousecardFavorite({house,type,children, removeFavorite,...restProps}){
    return(
        
        <Favorite {...restProps} onClick = {()=>removeFavorite(house,type)}>
            <i className="fas fa-heart" ></i>
        </Favorite>
    )
}
Housecard.RentFavorite = function HousecardFavorite({house,type,children, removeRentFavorite,...restProps}){
    return(
        
        <Favorite {...restProps} onClick = {()=>removeRentFavorite(house,type)}>
            <i className="fas fa-heart" ></i>
        </Favorite>
    )
}
Housecard.NotFavorite = function HousecardnotFavorite({house,children,addFavorite,...restProps}){
    return(
        <Favorite {...restProps} onClick = {()=>addFavorite(house) }>
            <i className="far fa-heart"></i>
        </Favorite>
    )
}
Housecard.notRentFavorite = function HousecardnotFavorite({house,children,addRentFavorite,...restProps}){
    return(
        <Favorite {...restProps} onClick = {()=>addRentFavorite(house) }>
            <i className="far fa-heart"></i>
        </Favorite>
    )
}

Housecard.Button = function HousecardButton({to,children,...restProps}){
    return(
            <ReactRouterLink to = {to}>
                <CardButton {...restProps} style={{ outline: 'none' }}>
                    {children}
                    </CardButton>
                </ReactRouterLink>
    )
}

Housecard.Title = function HousecardTitle({children,...restProps}){
    return(
        <Title {...restProps}>
            {children}
        </Title>
    )
}

Housecard.Text = function HousecardText({children,...restProps}){
    return(
        <Text {...restProps}>
            {children}
        </Text>
    )
}
Housecard.ImageContainer = function HousecardImageContainer({children,...restProps}){
        return(
            <ImageContainer {...restProps}>
                {children}
            </ImageContainer>
        )
}

Housecard.TextContainer = function HousecardTextContainer({children,...restProps}){
    return(
        <TextContainer {...restProps}>
            {children}
        </TextContainer>
    )
}
Housecard.TextControl = function HousecardTextControl({children,...restProps}){
    return(
        <TextControl {...restProps}>
            {children}
        </TextControl>
    )
}


Housecard.NormalText = function HousecardNormalText({children,...restProps}){
    return(
        <NormalText {...restProps}>
            {children}
        </NormalText>
    )
}
Housecard.Price = function HousecardPrice({children,...restProps}){
    return(
        <Price {...restProps}>
            {children}
        </Price>
    )
}

Housecard.label = function HousecardPrice({children,...restProps}){
    return(
        <Price {...restProps}>
            {children}
        </Price>
    )
}