import React from 'react'
import {Link as ReactRouterLink} from 'react-router-dom'
import {Container,Link,TextLink,Text} from './styles/style'
function ProfileNav({children, ...restProps}){
    return(
        <Container {...restProps}>
            {children}
            </Container>
    )
}

export default ProfileNav


ProfileNav.Link = function ProfileNavLink({ to, children, ...restProps  }){
    return<Link > 
            <ReactRouterLink to = {to } {...restProps} style={{ textDecoration: 'none' }} >
                    <Text>{children}</Text>
                    </ReactRouterLink>
                </Link> 
}

ProfileNav.TextLink = function ProfileNavTextLink({ to, children, ...restProps  }){
    
    return <ReactRouterLink to = {to} style={{ textDecoration: 'none' }} >
                    <TextLink {...restProps}>
                        {children}
                        </TextLink> 
                    </ReactRouterLink>
           
}