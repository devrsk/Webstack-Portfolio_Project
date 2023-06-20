import React, {useState,useContext}from 'react'
import { useHistory} from 'react-router-dom';
import { Form } from '../../components/export';
import {Context} from '../../context/userInfo'
import * as ROUTES from '../../constants/routes'
import Footer from "../../containers/footer"
import jwt_decode from "jwt-decode";
import {DB} from '../../constants/DB'
function Signin(){
    const [error] = useState('');

    const [username, setuUsername] = useState('');
    const [password, setPassword] = useState('');

    const isInvalid = password === '' | password === '';
    const {setUser,user} = useContext(Context)
    const history = useHistory();
    
    const Login_URL = `${DB}/login`
    function refreshPage() {
        window.location.reload(false);
      }
    async function handleSignin(event){
        event.preventDefault();
        if(!username){
            return;
        }
        if(!password){
            return;
        }
        try{
            let res = await fetch(Login_URL, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });
            let result = await res.json();
            
            if(result && result.success){
                if(result && result.token ){
                    var token = result.token;
                    var decoded = jwt_decode(token);
                    localStorage.setItem('authUser', JSON.stringify(decoded.user));
                    setUser(JSON.parse(localStorage.getItem('authUser')));
                   const U = JSON.parse(localStorage.getItem('authUser'))
                 
                    if(U.role === "A"){
                        history.push(ROUTES.HELP);
                      
                    }
                    else{
                        history.push(ROUTES.HOME);
        
                    }
                    refreshPage()
                }
                
                console.log("login success");
            }else if(result && result.success === false){
                alert(result.msg);
            }
        }catch(e){
            console.log(e);
        }
    }
    { console.log(user)}
    // console.log(isInvalid)
    return (
            <>    
                {/* {user}  ? <Redirect to={ROUTES.HOME} /> :     */}
                    <Form>
                        <Form.Title>Sign In</Form.Title>
                        {error && <Form.Error>{error}</Form.Error>}
                        
                        <Form.Base onSubmit={handleSignin} method="POST">
                            <Form.Input
                                placeholder="Username"
                                value={username}
                                onChange={({ target }) => setuUsername(target.value)}
                            />
                
                            <Form.Input
                                type="password"
                                value={password}
                                autoComplete="off"
                                placeholder="Password"
                                onChange={({ target }) => setPassword(target.value)} 
                            />
                            <Form.Submit disabled={isInvalid} type="submit">
                                Sign In
                            </Form.Submit>
                            
                            <Form.Text>
                                New to our website? <Form.Link to={ROUTES.SIGN_UP}>Sign up now.</Form.Link>
                            </Form.Text>    
      
                            <Form.TextSmall>
                                This page is protected by Google reCAPTCHA.
                            </Form.TextSmall>
                        </Form.Base>
                    </Form>
                <Footer/>
        </>
    )
}

export default Signin
