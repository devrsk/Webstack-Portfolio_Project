import styled from 'styled-components';

export const Container = styled.div`
        width:100%;
        height: 100%;
        overflow: scroll;
        overflow-x: hidden;
        display: grid;
        grid-template-columns: repeat(2, minmax(500px,250px));
        grid-template-rows: repeat(auto-fill, minmax(300px,100px)); 
 
        padding:1rem;
        @media (min-width: 1800px) {
                grid-template-columns: repeat(3, minmax(510px,250px));
            }
        @media (max-width: 800px) {
                grid-template-columns: repeat(1, minmax(350px,200px));
                grid-template-rows: repeat(auto-fill, minmax(250px,100px));
                overflow: hidden; 
                padding-bottom: 3rem;
                border-top: 1px solid #cccccc;
                border-left: 0;
        }
`
export const Base = styled.div`
    max-width: 500px;
    max-height: 250px;
    border: solid 1px rgb(194, 194, 194);
    box-shadow: 2px 5px 10px 0px rgba(0, 0, 0, 0.5);
    transition: all 0.3s linear;
    margin: 1rem 1rem;
    *{
        margin:0;
    }
    &:hover {
        box-shadow: 4px 10px 5px 0px rgba(0, 0, 0, 0.5);
    }
    @media (min-width: 1800px) {
        max-width: 500px;
        max-height: 250px;
    }
    @media (max-width: 800px) {
        max-width: 350px;
        max-height: 200px;
}
`
export const CardImg = styled.img`
        object-fit: cover;
        width: 300px;
        height:250px;
        @media (min-width: 1800px) {
                width: 300px;
                height: 250px;
            }
            @media (max-width: 800px) {
                width: 200px;
                height: 200px;
        }
`
export const CardButton = styled.button`

`

export const Title = styled.div`
        color:#0b6ab3;
        font-weight:bold;
        font-size:0.8rem;
        margin-bottom: 1rem;

            @media (max-width: 800px) {
                font-size:0.55rem;
                margin-bottom: 0.5rem;
        }
`
export const Price = styled.p`
        color: black;
        font-weight:bold;
        font-size:1.2rem;
        margin-bottom: 2rem;
        @media (max-width: 800px) {
                font-size:0.8rem;
                margin-bottom: 0.5rem;
        }
`
export const TextControl = styled.div`
`
export const Text = styled.div`
        color:black;
        font-size:0.8rem;
        @media (max-width: 800px) {
                font-size:0.7rem;

        }
`
export const NormalText = styled.div`
        position:relative;
        top:50px;
        color:#3675ff;
        font-size:0.8rem;
        font-weight:bolder;
        display:inline;
        border-right:1px solid black;
        padding:0 0.3rem;
        margin-top:1rem;

        @media (max-width: 800px) {
                font-size:0.55rem;
                padding:0 0.2rem;
                margin-top:0;
                top:35px;
        }
        
`
export const Link = styled.a`
   
        a{
            text-decoration:none;
        }
`
export const Content = styled.div` 
        display:flex;
        flex-direction:row;
`
export const Favorite = styled.i`
        position: absolute;
        color: pink;
        font-size:30px;
        top: 5px;
        left: 10px;
        z-index:1;
        cursor: pointer;
        &:hover{
                opacity:0.7;
        }
        @media (max-width: 800px) {
                font-size:20px;
        }
`
export const ImageContainer = styled.div`
        position:relative
      
`
export const TextContainer = styled.div`
        position:relative
        display:flex;
        margin:0.75rem;
        @media (max-width: 800px) {
                margin:0.25;
        }
`

export const Error = styled.div` 
        text-align:center:

        font-weight:bold;
        color:#0b6ab3;

`