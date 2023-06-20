import styled from 'styled-components'
import img from '../../../img/background.jpg'
export const Background = styled.section`
    background-image: url(${img});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: calc(100vh - 90px);
    background-color: #464646;
    padding: 10rem 0 ;
    outline: none;
    @media (max-width: 600px){
        min-height: 400px;
        
    }
`
export const Search = styled.div`
        width: 40%;
        position: relative;
        display: flex;  
        margin-left: auto;
        margin-right: auto;
        @media (max-width: 600px){
            width: 80%
            
        }
        
`
export const SearchIcon = styled.button`
        outline: none;
        width: 50px;
        height: 60px;
        background:white;
        border: 1px solid white;
        border-radius: 0px 0.75rem 0.75rem 0px;
        text-align: center;
        color: black;
        cursor: pointer;
        font-size: 20px;
`
export const SearchInput = styled.input`
        width: 100%;
        border-right: none;
        font-size:20px;
        padding-left: 15px;
        outline: none;
        border: 4px solid white;
        border-radius: 0.75rem 0rem 0rem 0.75rem;
        color: black;
        margin: 0 auto;
       
    
`
export const Title = styled.h1`
    color: black;
    font-size: 3rem;
    text-align: center;
    margin-bottom: 4rem;
    @media (max-width: 600px){
        font-size: 2rem;
        
    }
`
export const Subtitle = styled.h3``
export const Group = styled.div``
