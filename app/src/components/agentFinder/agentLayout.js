import React from 'react'
import {Container, FirstSection} from './styles/style'
function AgentLayout({children, ...restProps}){
    return(
        <Container {...restProps}>
            {children}
        </Container>
    )
}

AgentLayout.FirstSection = function AgentFirst({children,...restProps}){
    return(
        <FirstSection {...restProps}>
            {children}
        </FirstSection>
    )
}

export default AgentLayout;