import styled from 'styled-components'
import {Link as ReactRouterLink} from 'react-router-dom'
// Container, Logo, ButtonLink
export const Container = styled.div`
    display : flex;
    height : 90px;

    padding: 1rem 0;
    border-bottom: 1px solid #cccccc;
    align-items: center;
    @media (max-width: 600px){
        flex-direction: row;
        font-size : 1rem;
    }
  
`

export const Logo = styled.img`
    @media (max-width: 600px){

        
    }
`
export const RightPanel = styled.div`
    display : flex;
    align-items: center;
    justify-content: center;
    margin:0; padding:0;
    margin-right: 2rem; 
    @media (max-width: 600px){
        display:none;
        flex-direction: column;
        order: 2;
        margin:0 auto;
        margin-bottom:1rem;
    }
    
    
`
export const LeftPanel = styled.div`
    display : flex;
    align-items: center;
    margin:0; padding:0;
    margin-left: 1rem; 
    @media (max-width: 600px){
        display:none;
        flex-direction: column;
        order: 1;
        margin:0 auto;
        
    }
`
export const Link = styled.div`
    margin : 0 auto; 
    margin-left: 1rem;
    margin-right: 1rem;  
    &:hover{
        border-bottom: 1px solid black; 
    }
`

export const Text = styled.div`
    margin:0; 
    padding:0;
    font-weight: 600;
    font-size: 1.2rem;
    color: black;
    @media (max-width: 600px){
        font-size : 0.75rem;
        
    }
    @media (min-width: 1800px){
        font-size : 1.5rem;
        
    }
   
`
export const LogoText = styled.div`
    font-weight: 700;
    font-size: 3rem;
    color: rgb(20, 122, 255);
    margin:0; 
    padding:0;
    margin-right: 14rem;
    @media (max-width: 600px){
        margin-right: 0rem;
    }
    
`
export const ConditionLogoText = styled.div`
    font-weight: 700;
    font-size: 3rem;
    color: rgb(20, 122, 255);
    margin:0; 
    padding:0;
    @media (max-width: 600px){
        margin-right: 0rem;
    }
    
`
export const LogoPosition = styled.div`
    margin : 0 auto;    
`
export const Background = styled.section`  `

export const ButtonLink = styled(ReactRouterLink)`
    
`

export const Group = styled.div`
display: flex;
align-items: center;

`
export const SmallIcon = styled.button`
display: none;
align-items: center;
z-index:4;
background:white;
@media (max-width: 600px){
    display: initial;
    position: fixed;
    font-size: 2rem;
    color:rgb(20, 122, 255);
    left:20px;
    border:none;
}
`




export const TextLink = styled.p`
        color: black;
        text-decoration: none;
        margin-right: 30px;
        font-weight: ${({ active }) => (active === 'true' ? '700' : 'normal')};
        cursor: pointer;
        
        &:hover {
            font-weight: bold;
        }
        &:last-of-type {
            margin-right: 0;
        }
    `

    export const Dropdown = styled.div`
    display: none;
    positon: absolute;
    background-color: white;
    padding: 10px;
    width: 200px;
    top: 48px;
    right: 10px;
    z-index:11;
    box-shadow: 0px 0px 10px rgb(98, 98, 98);
    ${Group}:last-of-type ${TextLink} {
        cursor: pointer;
    }

    ${Group} {
        margin-bottom: 10px;
        
        &:last-of-type {
            margin-bottom: 0;
        }
        
    }

    button {
        margin-right: 10px;
    }

    p {
        font-size: 1rem;
        margin-bottom: 0;
        margin-top: 0;
    }
    `
    export const Profile = styled.div`
        display: inline;
        align-items: center;
        margin-left: 20px;
        position: relative;

        button {
            cursor: pointer;
        }

        &:hover > ${Dropdown} {
            display: flex;
            position: fixed;
            flex-direction: column;
        }`

export const SmallDropdown = styled.div`
    display: ${props => props.display==="display" ? "display":"none"};
    background:white;
    width:70vw;
    height:100%;
    position:fixed;
    top:0;
    left:0px;
    z-index:3;
    box-shadow: 0px 0px 10px rgb(98, 98, 98);


`

export const SmallGroup = styled.div`
    background:white;
    position:fixed;
    top:15%;
    left:7%;
`