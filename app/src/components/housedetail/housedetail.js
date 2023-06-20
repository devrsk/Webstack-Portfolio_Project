import React from 'react'
import {Link as ReactRouterLink} from 'react-router-dom'
import{ 
    Container, 
    CardImg, 
    CardButton, 
    Title, 
    Text,
    Base,
    ImageBase,
    TextControl,
    Price,Bath,
    BathInfo,Area,
    FeatureContainer,
    FeatureBase,FeatureText,FeatureTitle,Icon} from './styles/style'

function HouseDetail({children, ...restProp}){
    return <Container {...restProp}>
        {children}
    </Container>
}

export default HouseDetail


HouseDetail.Base = function HouseDetailBase({children, ref,...restProps}){
    return <Base {...restProps} ref = {ref}>
                {children}
                </Base>
}
HouseDetail.ImageBase = function HouseImageBase({children, ref,...restProps}){
    return <ImageBase {...restProps} ref = {ref}>
                {children}
                </ImageBase>
}
HouseDetail.Link = function HouseDetailLink({to,children,...restProps}){
    return (

            <ReactRouterLink to = {to} {...restProps} style = {{textDecoration:"none"}}>
                            {children}
                </ReactRouterLink>
            )
}

HouseDetail.img = function HouseDetailImg({src,alt, children,...restProps}){
    return(
            <CardImg src = {src} alt = {alt} {...restProps}>
                {children}
                </CardImg>
    )
}
HouseDetail.Button = function HouseDetailButton({to,toggleDisplay,children,...restProps}){
    return(
            <ReactRouterLink to = {to}>
                <CardButton {...restProps} style={{ outline: 'none' }} onClick = {()=>toggleDisplay()}> 
                    {children}
                    </CardButton>
                </ReactRouterLink>
    )
}

HouseDetail.Title = function HouseDetailTitle({children,...restProps}){
    return(
        <Title {...restProps}>
            {children}
        </Title>
    )
}

HouseDetail.Text = function HouseDetailText({children,...restProps}){
    return(
        <Text {...restProps}>
            {children}
        </Text>
    )
}
HouseDetail.TextControl = function HouseDetailTextControl({children,...restProps}){
    return(
        <TextControl {...restProps}>
            {children}
        </TextControl>
    )
}

HouseDetail.Price = function HouseDetailPrice({children,...restProps}){
    return(
        <Price {...restProps}>
            {children}
        </Price>
    )
}


HouseDetail.Bath = function HouseDetailBath({children,...restProps}){
    return(
        <Bath {...restProps}>
            {children}
        </Bath>
    )
}

HouseDetail.BathInfo = function HouseDetailBathInfo({children,...restProps}){
    return(
        <BathInfo {...restProps}>
            {children}
        </BathInfo>
    )
}


HouseDetail.Area = function HouseDetailArea({children,...restProps}){
    return(
        <Area {...restProps}>
            {children}
        </Area>
    )
}


HouseDetail.FeatureContainer = function HouseDetailFeatureContainer({children,...restProps}){
    return(
        <FeatureContainer {...restProps}>
            {children}
        </FeatureContainer>
    )
}
HouseDetail.FeatureTitle = function HouseDetailFeatureTitle({children,...restProps}){
    return(
        <FeatureTitle {...restProps}>
            {children}
        </FeatureTitle>
    )
}

HouseDetail.FeatureBase = function HouseDetailFeatureBase({children,...restProps}){
    return(
        <FeatureBase {...restProps}>
            {children}
        </FeatureBase>
    )
}

HouseDetail.FeatureText = function HouseDetailFeatureText({children,...restProps}){
    return(
        <FeatureText {...restProps}>
            {children}
        </FeatureText>
    )
}


HouseDetail.FeatureIcon = function HouseDetailFeatureIcon({children,...restProps}){
    return(
        <Icon {...restProps}>
            {children}
        </Icon>
    )
}