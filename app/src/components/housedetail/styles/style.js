import styled from 'styled-components';

export const Container = styled.div`
       
       display: flex;
       @media (max-width: 800px) {
        flex-direction:column;
        width:100%;
}

`
export const ImageBase = styled.div`
        text-align: center;
        width:50%;
        height: calc(100vh - 90px);
        overflow:scroll;
        overflow-x: hidden;
        @media (max-width: 800px) {
                width:100%;
                height: auto;
                overflow:hidden;
        }
`
export const Base = styled.div`
        margin:2rem;
        width:50%;
        height: calc(100vh - 90px);
        display:flex;
        flex-direction:column;
        overflow:hidden;
        
        @media (max-width: 800px) {

                width:380px;
                height: auto;
                margin:1rem;
 
        }
        
`
export const CardImg = styled.img`
        object-fit: cover;
        width: 100%;
        

`

export const CardButton = styled.button`
        background: #e50914;
        border-radius: 4px;
        font-size: 15px;
        font-weight: bold;
        margin: 0 40%;
        padding: 0.75rem 1rem;
        border: 0;
        color: white;
        cursor: pointer;
        @media (max-width: 800px) {
                margin: 0 30%;

        }
`

export const Title = styled.div`
        font-size:1rem;
        font-weight:600;
        @media (max-width: 800px) {
                font-size:0.8rem;
 
        }

`

export const Text = styled.div`
        font-size:1.2rem;
        margin: 1rem 0;
        color:#287382;
        @media (max-width: 800px) {
                font-size:1rem;
                margin: 0.2rem 0;
        }
`

export const Link = styled.a`
        a{
            text-decoration:none;
        }
`
export const TextControl = styled.div`
       
`
export const Price = styled.div`
        font-size:3rem;
        font-weight:bold;
        margin-bottom:1rem;
        @media (max-width: 800px) {
                font-size:2rem;

        }
`
export const Bath = styled.div`
        margin: 0 0.1rem;
        display:inline;
        font-size:0.8rem;
        padding:0 0.5rem;
        font-weight:500;
        @media (max-width: 800px) {
                font-size:0.6rem;

        }
`
export const BathInfo = styled.div`
        display:inline;
        font-size:1.5rem;
        color:#3675ff;
        @media (max-width: 800px) {
                font-size:1rem;

        }
`

export const Area = styled.div`
        margin: 0 0.1rem;
        display:inline;
        font-size:0.8rem;
        padding:0 0.5rem;
        font-weight:500;
        @media (max-width: 800px) {
                font-size:0.6rem;

        }
`

export const FeatureContainer = styled.div`
        display: grid;
        grid-template-columns: repeat(2, minmax(0px,250px));
        grid-template-rows: repeat(auto-fill, minmax(auto)); 
        justify-content: center;
        align-content: center;
        margin-bottom:2rem;
        
        @media (max-width: 800px) {
        grid-template-columns: repeat(2, minmax(0px,175px));
        justify-content: initial;
        align-content: initial;
        }
        
`

export const FeatureBase = styled.div`
        font-weight:bolder;
        margin: 0.2rem;
        display:flex;

        @media (max-width: 800px) {
                margin: 0;
                font-size:0.8rem;
                }

`
export const FeatureText = styled.div`
        display:inline; 
        font-weight:500;
        margin: 0 1rem;
        @media (max-width: 800px) {
                font-size:0.8rem;
   
                margin:0 0.5rem;
        
        }
`


export const FeatureTitle = styled.div`
        font-size:2rem;
        font-weight:bold;
        margin-bottom:1rem;
 
        text-align:center;
        @media (max-width: 800px) {
                font-size:1.5rem;
                margin-bottom:1rem;
                
        }

`

export const Icon = styled.div`
        margin:0 1rem;
       font-size: 1.2rem;
       color: #4f80ff;
       @media (max-width: 800px) {
        font-size:1rem;
        margin:0 0.5rem;

}

`