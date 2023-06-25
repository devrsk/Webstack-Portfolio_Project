import {Link as ReactRouterLink} from 'react-router-dom'
import { Container, CardImg, CardButton, Title, Text,Link,Base} from './styles/style';
import React from 'react'
function Gridcard({children,...restProps}){
return <Container {...restProps}>{children}</Container>
}

export default Gridcard
Gridcard.Base = function GridCardBase({children,...restProps}){
    return <Base {...restProps}>{children}</Base>
}
Gridcard.Link = function GridcardLink({to,children,...restProps}){
    return (
        <Link >
            <ReactRouterLink to = {to} {...restProps}>
                            {children}
                </ReactRouterLink>
            </Link>)
}

Gridcard.img = function GridcardImg({src,alt, children,...restProps}){
    return(
            <CardImg src = {src} alt = {alt} {...restProps}>
                {children}
                </CardImg>
    )
}
Gridcard.Button = function GridcardButton({to,children,...restProps}){
    return(
            <ReactRouterLink to = {to}>
                <CardButton {...restProps} style={{ outline: 'none' }}>
                    {children}
                    </CardButton>
                </ReactRouterLink>
    )
}

Gridcard.Title = function GridcardTitle({children,...restProps}){
    return(
        <Title {...restProps}>
            {children}
        </Title>
    )
}

Gridcard.Text = function GridcardText({children,...restProps}){
    return(
        <Text {...restProps}>
            {children}
        </Text>
    )
}