import styled from "styled-components"

export const Container = styled.div`
    display: flex;
    padding-left:1rem;
    height:60px;
    border-bottom: 1px solid #cccccc;
    align-items: center;
    justify-content:center;
    
`;
export const Link = styled.a``;
export const TextLink = styled.p`
    font-size:1.5rem;
    font-weight:500;
    margin: 1rem;
    &:hover{
        border-bottom: 2px solid blue;
    }
    @media (max-width: 800px) {
        font-size:0.9rem;
        margin: 0.5rem;
    }
`;
export const Text = styled.p``;