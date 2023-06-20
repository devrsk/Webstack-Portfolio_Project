import  React from 'react'
import{Link as ReactRouterLink} from 'react-router-dom'
import { Container, CardImg, CardButton, Title, Text,Base,Favorite,ImageContainer,TextContainer,Content,TextControl,NormalText,Price} from './styles/style';

function Realtorcard({children,...restProps}){
    return <Container {...restProps}>
                {children}</Container>
}

export default Realtorcard

Realtorcard.Base = function RealtorcardBase({children, ref,...restProps}){
    return <Base {...restProps} ref = {ref}>
                {children}
                </Base>
}
Realtorcard.Content = function RealtorcardContent({children,...restProps}){
    return <Content {...restProps}>
                {children}
                </Content>
}
Realtorcard.Link = function RealtorcardLink({to,children,...restProps}){
    return (

            <ReactRouterLink to = {to} {...restProps} style = {{textDecoration:"none"}}>
                            {children}
                </ReactRouterLink>
            )
}

Realtorcard.img = function RealtorcardImg({src,alt, children,...restProps}){
    return(
            <CardImg src = {src} alt = {alt} {...restProps}>
               
                {children}
                </CardImg>
    )
}
Realtorcard.Favorite = function RealtorcardFavorite({house,children, removeFavorite,...restProps}){
    return(
        
        <Favorite {...restProps} onClick = {()=>removeFavorite(house)}>
            <i className="fas fa-heart" ></i>
        </Favorite>
    )
}
Realtorcard.notFavorite = function RealtorcardnotFavorite({house,children,addFavorite,...restProps}){
    return(
        <Favorite {...restProps} onClick = {()=>addFavorite(house) }>
            <i className="far fa-heart"></i>
        </Favorite>
    )
}
Realtorcard.Button = function RealtorcardButton({to,children,...restProps}){
    return(
            <ReactRouterLink to = {to}>
                <CardButton {...restProps} style={{ outline: 'none' }}>
                    {children}
                    </CardButton>
                </ReactRouterLink>
    )
}

Realtorcard.Title = function RealtorcardTitle({children,...restProps}){
    return(
        <Title {...restProps}>
            {children}
        </Title>
    )
}

Realtorcard.Text = function RealtorcardText({children,...restProps}){
    return(
        <Text {...restProps}>
            {children}
        </Text>
    )
}
Realtorcard.ImageContainer = function RealtorcardImageContainer({children,...restProps}){
        return(
            <ImageContainer {...restProps}>
                {children}
            </ImageContainer>
        )
}

Realtorcard.TextContainer = function RealtorcardTextContainer({children,...restProps}){
    return(
        <TextContainer {...restProps}>
            {children}
        </TextContainer>
    )
}
Realtorcard.TextControl = function RealtorcardTextControl({children,...restProps}){
    return(
        <TextControl {...restProps}>
            {children}
        </TextControl>
    )
}


Realtorcard.NormalText = function RealtorcardNormalText({children,...restProps}){
    return(
        <NormalText {...restProps}>
            {children}
        </NormalText>
    )
}
Realtorcard.Price = function RealtorcardPrice({children,...restProps}){
    return(
        <Price {...restProps}>
            {children}
        </Price>
    )
}