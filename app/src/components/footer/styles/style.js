import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 70px 56px;
    margin: 0;
    height: 600px;
    width: 100%;
    background: black;
    vertical-align:bottom;
    display:block;
    padding-bottom:10px;
    @media (max-width: 1000px) {
        padding: 70px 30px;
        height: 800px;
    }
    @media (min-width: 1800px) {
        height: 400px;
    }
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
`;

export const Row = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    grid-gap: 15px;
    
    @media (max-width: 1000px) {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }
`;

export const Link = styled.a`
    color: #00eaff;
    margin-bottom: 20px;
    font-size: 13px;
    text-decoration: none;
`;

export const Title = styled.p`
    font-size: 16px;
    color: #00eaff;
    margin-bottom: 40px;
`;

export const Text = styled.p`
    font-size: 13px;
    color: #00eaff;
    margin-bottom: 40px;
`;

export const Break = styled.div`
    flex-basis: 100%;
    height: 0;
`;

export const ExternalLink = styled.a``