import styled from "styled-components"

export const Container = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    min-height: calc(100vh - 550px);

`;

export const Card = styled.div`
    display:flex;
    border-bottom: 1px solid #cccccc;
    height:300px;

    align-items:center;
    margin: 0 5%;
    @media (max-width: 800px) {
        flex-direction:column;
        height:450px;
    }
  

`
export const Base = styled.div`

`
export const Button = styled.button`
    margin: 0 1rem;
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
@media (min-width: 1800px) {
        
        font-size: 1.5rem;
        padding: 0.75rem 1.5rem;
        margin: 0 0.5rem;
        margin-bottom: 1rem;
}
`

export const Text = styled.p`
    margin: 0 0.8rem;
    font-size: 1rem;
    @media (max-width: 800px) {
        margin: 0.25rem 0.5rem;
    font-size: 0.9rem;
}
@media (min-width: 1800px) {
        
    margin: 0 1rem;
    font-size: 1.5rem;
}
    
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
export const Image = styled.img`
    object-fit: cover;
    width: 100%;
    height: 200px;
`   