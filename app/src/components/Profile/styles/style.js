import styled from "styled-components"

export const Container = styled.div`
    min-height: calc(100vh - 150px);
`;
export const Link = styled.a``;
export const TextLink = styled.p`

`;
export const Text = styled.div`
    text-align:center;
    font-size:2rem;
    font-weight:bold;
    margin:0 auto;
    color: black;
    @media (max-width: 800px) {
        font-size: 1.5rem;

}
`;

export const CardsContainer = styled.div`
    width:100%;
    height: 100%;

    display: grid;
    grid-template-columns: repeat(3, minmax(500px,250px));
    grid-template-rows: repeat(auto-fill, minmax(300px,100px)); 

    padding:1rem;
    @media (min-width: 1700px) {
            grid-template-columns: repeat(3, minmax(500px,250px));
        }
    @media (max-width: 800px) {
            grid-template-columns: repeat(1, minmax(350px,200px));
            grid-template-rows: repeat(auto-fill, minmax(250px,100px));
            overflow: hidden; 
            padding-bottom: 3rem;
    }
`