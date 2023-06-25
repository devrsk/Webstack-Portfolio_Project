import styled from 'styled-components';

export const Container = styled.div`
    display:flex;
    flex-direction: column;
`;


export const Search = styled.div`
        float: left;
        width: 300px;
        position: relative;
        display: flex;  
        border: 1px solid #a8a8a8;
        border-radius: 10px;
        margin: 1rem 2rem;
        @media (max-width: 1200px) {
            width: 200px;
        }
        @media (max-width: 800px) {
            width: 300px;
        }
       
        
`
export const SearchIcon = styled.button`
        margin: 0;
        outline: none;
        width: 30px;
        height: 35px;
        background:white;
        border-radius: 10px;
        border:none;
        text-align: center;
        color: black;
        cursor: pointer;
        font-size: 15px;
`
export const SearchInput = styled.input`
        margin: 0;
        width: 100%;
        
        padding: 6px;
        outline: none;
        border-radius: 10px;
        border:none;
        color: black;
        margin: 0 auto;
        &::-webkit-input-placeholder {
            font-size:14px;
            text-indent: 8px;
          }
       
`

export const ButtonSection = styled.div`
    
    width: 600px;
    display:flex;
    @media (max-width: 1000px){
        width: 600px
    }

`
export const ButtonCircle = styled.circle`
    width: 10px;      
    height: 10px;      
    background-color:red;      
    border-radius: 50%;      
    -moz-border-radius: 50%;      
    -webkit-border-radius: 50%;
`

export const Button = styled.button`
    width: 120px;
    height: 30px;
    margin: 0.5rem;
    margin-top: 1rem;
    border-radius: 3px;
    border: solid 1px blue;
    background-color: white;
    color: blue;
`

// export const TextLink = styled.p`
//     color: black;
//     text-decoration: none;
//     margin-right: 30px;
//     font-weight: ${({ active }) => (active === 'true' ? '700' : 'normal')};
//     cursor: pointer;
    
//     &:hover {
//         font-weight: bold;
//     }
//     &:last-of-type {
//         margin-right: 0;
//     }
// `

// export const Group = styled.div`
// display: flex;
// align-items: center;
// `

// export const Dropdown = styled.div`
//     display: none;
//     positon: absolute;
//     background-color: white;
//     padding: 10px;
//     width: 200px;
//     top: 48px;
//     right: 10px;
//     z-index:11;
//     box-shadow: 0px 0px 10px rgb(98, 98, 98);
//     ${Group}:last-of-type ${TextLink} {
//         cursor: pointer;
//     }

//     ${Group} {
//         margin-bottom: 10px;
        
//         &:last-of-type {
//             margin-bottom: 0;
//         }
        
//     }

//     button {
//         margin-right: 10px;
//     }

//     p {
//         font-size: 1rem;
//         margin-bottom: 0;
//         margin-top: 0;
//     }
// `


export const FirstSection = styled.div`
    padding: 0.5rem 0;
    border-bottom: 1px solid #cccccc;
    height: 90px;
`
export const SecondSection = styled.div`
    display: flex;
    height: calc(100vh - 90px);
    @media (max-width:1000px){

        flex-direction: column;
    } 
`
export const Footer = styled.div`

    flex:1 1 80px;
    background: black;
`
export const List = styled.div`
    z-index: 2;
    width: 100%;
    

`;

export const Map = styled.div`
    flex: 0 1 auto;
`;

