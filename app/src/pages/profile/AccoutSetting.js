import React from 'react'
import { ListGroup } from 'react-bootstrap'
import {Profile} from "../../components/export"
function AccountSetting(){
    const user = JSON.parse(localStorage.getItem('authUser'))
    // console.log(user)
    if(user){
    return (
        <Profile>
        <ListGroup>
            <ListGroup.Item>Name: {user.username}</ListGroup.Item>
            <ListGroup.Item>Email: {user.email}</ListGroup.Item>
            <ListGroup.Item>Role: {user.role}</ListGroup.Item>
        </ListGroup>
        </Profile>
    )
    }else{
        return ( <Profile>
            <Profile.Text>
                Error! Seems like you have not logedin, Please contact admin
            </Profile.Text>
        </Profile>)
    }
}


export default AccountSetting
