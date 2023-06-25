import styled from 'styled-components';
import { Link as ReachRouterLink } from 'react-router-dom';
import img from '../../../img/formbg4.jpg'

    
export const Container = styled.section`
    display: flex;
    flex-direction: column;
    min-height 800px;
    background-color: white;
    border-radius: 5px;
    box-sizing: border-box;
    width: 100%;
    margin: 0;
    align-items:center;
    padding: 60px 68px 40px;
  
    background-image: url(${img});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    
`;

export const Error = styled.div`
    background: #e87c03;
    border-radius: 4px;
    font-size: 14px;
    margin: 0 0 16px;
    color: white;
    padding: 15px 20px;
`;

export const Base = styled.form`
    display: flex;
    flex-direction: column;
    max-width: 450px;
    width: 100%;
  
`;

export const Title = styled.h1`
    color: black;
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 28px;
`;

export const Text = styled.h1`
    color: black;
    font-size: 16px;
    font-weight: 500;
`;

export const TextSmall = styled.h2`
    margin-top: 10px;
    font-size: 14px;
    line-height: normal;
    color: black;
`;

export const Link = styled(ReachRouterLink)`
    color: #454545;
    text-decoration: none;
    
    &:hover {
        text-decoration: underline;
    }
`;

export const Input = styled.input`
    background: #d4d4d4;
    border-radius: 4px;
    border: 2px solid #78868a;
    color: black;
    height: 50px;
    line-height: 50px;
    padding: 5px 20px;
    margin-bottom: 20px;
    
    &:last-of-type {
        margin-bottom: 30px;
    }
`;

export const TextArea = styled.textarea`
    background: #d4d4d4;
    border-radius: 4px;
    border: 0;
    color: black;
    line-height: 30px;
    padding: 5px 20px;
    margin-bottom: 20px;
`;

export const Submit = styled.button`
    background: #e50914;
    border-radius: 4px;
    font-size: 15px;
    font-weight: bold;
    margin: 0 0 12px;
    padding: 16px;
    border: 0;
    color: white;
    cursor: pointer;
    
    &:disabled {
        opacity: 0.5;
    }
    &:hover {background-color: #ff8c92}

    &:active {
  background-color: #ff8c92;
  box-shadow: 0 5px #948e8e;
  transform: translateY(4px);
}
`;

export const Select = styled.select`
    position: relative;
    font-size: 16px;
    height: 55px;
    background: #d4d4d4;
    color:grey;
    text-shadow:0 1px 0 rgba(0,0,0,0.4);
    padding: 5px 20px;
    margin-bottom: 20px;
    border-radius: 5px;
`

export const Option = styled.option`
    background: #333;
    border-radius: 4px;
    border: 0;
    color: black;
    height: 50px;
    line-height: 50px;
    padding: 5px 20px;
    margin-bottom: 20px;
    
    &:last-of-type {
        margin-bottom: 30px;
    }
`;