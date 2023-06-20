import React, { useState, useEffect } from 'react'
import {Table} from "react-bootstrap"
//npm install react-bootstrap bootstrap
import {DB} from '../constants/DB'
function Admin() {

    const [users, setUsers] = useState([]);
    
    const getUser = async () => {
        try{
            let res = await fetch(`${DB}/get_user`, {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            let result = await res.json();
            //console.log(result);
            if(result && result.success){
                //console.log(result);
                // console.log("Get all user");
                let users = result.dataset;
                setUsers(users);
            }else if(result && result.success === false){
                alert(result.msg);
            }
        }catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
        getUser();
        handleUpdateClick();
    }, []);

    const handleUpdateClick = async (user_id) =>{
        //console.log(user_id);
        try{
            let res = await fetch(`${DB}/update_user`, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: user_id,
                })
            });
            let result = await res.json();
            //console.log(result);
            if(result && result.success){
                console.log(result);
                console.log("Get all user after update");
                setUsers(result.dataset);
            }else if(result && result.success === false){
                alert(result.msg);
            }
        }catch(e){
            console.log(e);
        }
    }

    const handleRemoveClick = async (user_id) =>{
        //console.log(user_id);
        try{
            let res = await fetch(`${DB}/remove_user`, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: user_id
                })
            });
            let result = await res.json();
            //console.log(result);
            if(result && result.success){
                console.log(result);
                console.log("Get all user after remove");
                setUsers(result.dataset);
            }else if(result && result.success === false){
                alert(result.msg);
            }
        }catch(e){
            console.log(e);
        }
    }

    function getButtonsUsingMap(status, id){
        if(status === "P"){
            return(
                <>
                <button onClick={()=> handleUpdateClick(id)} >Approve</button>
                </>
            )
        }
        else
            return null;
    }

    function getRemoveUsingMap(status, id){
        if(status === "Y")
            return <button onClick={()=> handleRemoveClick(id)} >Remove</button>
        else
            return <button onClick={()=> handleRemoveClick(id)} >Reject</button>;
    }
    
    return (
        <>
            <Table striped bordered hover style={{width: "800px", float: "right", marginRight: "100px"}}>
            <thead>
                <tr>
                <th>#</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => {
                    return(
                        <tr key={user.ID}>
                            <td>{user.ID}</td>
                            <td>{user.username}</td>
                            <td>{user.Email}</td>
                            <td>{user.a_type}</td>
                            <td>{getButtonsUsingMap(user.approved, user.ID)}</td>
                            <td>{getRemoveUsingMap(user.approved, user.ID)}</td>
                        </tr>
                    )
                }
                )}
            </tbody>
            </Table>
        </>
    )
}

export default Admin