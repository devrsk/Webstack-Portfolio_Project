import styled from 'styled-components';

export const Container = styled.div`
    display:flex;
    flex-direction: column;
`;

export const FirstSection = styled.div`
    border-top: 2px solid grey;  
    border-bottom: 2px solid grey;
    margin: 0 auto;
    text-align:center;
    margin-bottom: 50px;
    height: 800px;
    p1{
        line-height: 50px;
        color: green;
        font-size: 25px;
    };
    p2{
        color: blue;
        font-size: 20px;
    };
`