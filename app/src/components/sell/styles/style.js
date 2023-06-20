import styled from 'styled-components'

export const Container = styled.div`
    display:flex;
    flex-direction: column;
`;

export const Notice = styled.div`
    width: 100%;
    padding-bottom: 3%;
    background-color: #a8d5ef;
    padding-top: 5px;
    img {
        width: 100px;
        height: 100px;
        margin-left: 100px;
        float:left;
        border: 1px solid #a8a8a8;
        border-radius: 8px;
    }
    p {
        font-size: 1rem;
        margin-bottom: 0;
        margin-top: 0;
        padding-left: 5px;
    }
`