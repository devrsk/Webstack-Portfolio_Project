import styled from 'styled-components';

export const Container = styled.div`
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        min-height: calc(100vh - 550px);

`
export const Base = styled.div`
        display:flex;
        
        border-bottom: 1px solid #cccccc;
        height:300px;
        width:50%;
        align-items:center;
        justify-content:center;

        @media (max-width: 800px) {
                margin-top:2rem;
                display:initial;
                width:100%;
                height:400px;
                text-align:center;
                
       }
`
export const ListingImg = styled.img`
        object-fit: cover;
        width: 100%;
        height: 200px;
        
`
export const ListingButton = styled.button`
        margin: 0 1.5rem;
        font-size: 1rem;
        background-color:#3d6eff;
        padding: 0.75rem 1.5rem;
        border-radius: 15px;
        color:white;
        font-weight: bolder;
        outline:none;
        border:1px solid #cccccc;
        @media (max-width: 800px) {
                font-size: 0.8rem;
                padding: 0.5rem 1rem;
                margin: 0 0.5rem;
                margin-bottom: 1rem;
        }

        &:hover {background-color:#8abdff}

        &:active {
      background-color: #8abdff;
      box-shadow: 0 5px #948e8e;
      transform: translateY(4px);
    }

`

export const Title = styled.p`
        font-size:1.5rem;
        font-weight:bolder;

        @media (max-width: 800px) {
                font-size:1.2rem;
        }
        
`

export const Text = styled.p`
        font-size:1rem;
        @media (max-width: 800px) {
                font-size:0.8rem;
        }
`

export const Link = styled.a`
        a{
            text-decoration:none;
        }
`
export const Favorite = styled.i`
    
`
export const ImageContainer = styled.div`
        position:relative;
        width:300px;
        margin:1rem;
      
        max-height: 200px;
        @media (max-width: 800px) {
                width:250px;
                margin:0 auto;
                
       }
`
export const TextContainer = styled.div`
        min-width: 150px;
        text-align:center;
   
`