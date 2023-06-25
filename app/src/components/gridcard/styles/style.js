
import styled from 'styled-components';

export const Container = styled.div`
    margin:3rem;
    display: grid;
    grid-template-columns: repeat(3, minmax(300px,500px));
    grid-template-rows: repeat(auto-fill, minmax(auto));
    justify-content: center;  
    @media (max-width:1000px){
        margin :0;
        grid-template-columns: 1fr;
        grid-template-rows: repeat(3, minmax(300px,1fr));
        justify-items: center;
    } 
`
export const Base = styled.div`
        max-width: 400px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding:1em 2em;
        border: solid 1px rgb(194, 194, 194);
        box-shadow: 0px 0px 10px rgb(98, 98, 98);
        transition: all .2s;
        margin: 1rem;
        &:hover{
            transform: scale(1.05);
        }
`
export const CardImg = styled.img`
        object-fit: cover;
        width: 100%;
    
    
`

export const CardButton = styled.button`
        display:inline-block;
        font-size: 1.05rem;
        font-weight: 500;
        padding: 0.5em 1em ;
        border-radius: 0.8em;
        border: 1px solid rgb(170, 170, 170);
        font-size:0.75rem;
        &:hover{
            background-color: rgb(0, 61, 194);
            color: white;
        }
        @media (max-width:1000px){
            font-size : 0.6rem;
            padding: 0.25 0.75rem;
        } 
`

export const Title = styled.p`
        font-weight:600;
        font-size:1rem;
        @media (max-width:1000px){
            font-size : 0.8rem;
        } 
        
`

export const Text = styled.p`
        font-size : 0.75rem;
        text-align: center;
        padding: 0 1.5rem;
        @media (max-width:1000px){
            font-size : 0.6rem;
            padding: 0 1rem;
        } 
`

export const Link = styled.a``




// .Homepage-grid-card:hover{
//     transform: scale(1.05);
// }
// .grid-title,.grid-image,.grid-description{
//     margin-bottom: 1rem;
// }

// .Button{
//     font-size: 1.05rem;
//     font-weight: 500;
//     padding: 0.5em 1em ;
//     border-radius: 0.8em;
//     border: 1px solid rgb(170, 170, 170);
// }
// .Button:hover{
//     background-color: rgb(0, 61, 194);
//     color: white;
// }
// @media (max-width:1300px){
//     .Home-grid-container{
//         padding: 10%;
//         grid-template-columns: 1fr;
//         grid-template-rows: repeat(3, minmax(300px,1fr));
//         justify-items: center;
//     }

//     .Homepage-grid-card{
//         margin: 1rem 0;
//     }
// }