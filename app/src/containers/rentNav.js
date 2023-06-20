import React from 'react'
import {ProfileNav} from '../components/export'
import *as ROUTES from '../constants/routes'
function rentNavbar(){
    return(
        <ProfileNav>
              <ProfileNav.TextLink to ={ROUTES.RENT_POST}>Post Listing</ProfileNav.TextLink>
              <ProfileNav.TextLink to ={ROUTES.RENT_LISTING}>Listing</ProfileNav.TextLink>
              <ProfileNav.TextLink to ={ROUTES.RENT_APPLICATION}>Application</ProfileNav.TextLink>
        </ProfileNav>
    )
}
export default rentNavbar

// import React, { useContext, useReducer } from "react"
// import 'bootstrap/dist/css/bootstrap.min.css';
// import {Context} from '../context/userInfo'
// import { Header } from "../components/export";
// import *as ROUTES from '../constants/routes'
// import {Nav} from 'react-bootstrap'

// function RentHeader(){
//     return(
//         <Nav
//             activeKey="/home"
//             // onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
//             >
//             <Nav.Item>
//                 <Nav.Link href={ROUTES.RENT_OWNER}>Post Listing</Nav.Link>
//             </Nav.Item>
//             <Nav.Item>
//                 <Nav.Link eventKey="link-1">Update Listing</Nav.Link>
//             </Nav.Item>
//             <Nav.Item>
//                 <Nav.Link eventKey="link-2">Review Application</Nav.Link>
//             </Nav.Item>
//         </Nav>
//     )
// }

// export default RentHeader

// // import React, { useContext, useReducer } from "react"
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import {Context} from '../context/userInfo'
// // import { Header } from "../components/export";
// // import *as ROUTES from '../constants/routes'



// // function HeaderContainer(props){

// //     const {user,logout} = useContext(Context);
// //     const conditionalSignin = user === null ? (<Header.Link to = {ROUTES.SIGN_IN}>Sign in</Header.Link>):
    
// //             (<Header.Group>
// //             <Header.Profile>
// //             <Header.Link to ='#'>{user.username}</Header.Link>

// //                 <Header.Dropdown>

// //                         <Header.Group>
// //                             <Header.TextLink to ={ROUTES.SAVED_HOME}>Saved Home</Header.TextLink>
// //                         </Header.Group>
// //                         <Header.Group>
// //                             <Header.TextLink to ={ROUTES.SAVED_SEARCH}>Saved Search</Header.TextLink>
// //                         </Header.Group>
// //                         <Header.Group>
// //                             <Header.TextLink to ={ROUTES.LISTING}>Listing</Header.TextLink>
// //                         </Header.Group>
// //                         <Header.Group>
// //                             <Header.TextLink to ={ROUTES.APPLICATION}>Application</Header.TextLink>
// //                         </Header.Group>
// //                         <Header.Group>
// //                             <Header.TextLink to ={ROUTES.ACCOUNT_SETTING}>Account Setting</Header.TextLink>
// //                         </Header.Group>
// //                         <Header.Group>
// //                             <Header.TextLink to ='#' onClick = {()=>logout()}>
// //                                 Sign out
// //                             </Header.TextLink>
// //                         </Header.Group>
// //                 </Header.Dropdown>
// //             </Header.Profile>
// //         </Header.Group>)

// //     return(
// //         <Header>
// //             <Header.Frame>
// //                 <Header.LeftPanel>
// //                     <Header.Link to = {ROUTES.BUY}>Buy</Header.Link>
// //                     <Header.Link to = {ROUTES.RENT}>Rent</Header.Link>
// //                     <Header.Link to = {ROUTES.SELL}>Sell</Header.Link>
// //                     <Header.Link to = {ROUTES.AGENT_FINDER}>Agent finder</Header.Link>
// //                 </Header.LeftPanel>
                
// //                 <Header.Logo to = {ROUTES.HOME}>Zillow</Header.Logo>

// //                 <Header.RightPanel>
// //                     <Header.Link to = {ROUTES.MANAGERENTALS}>Manage Rentals</Header.Link>
// //                     <Header.Link to = {ROUTES.HELP}>Help</Header.Link>
// //                     {conditionalSignin}
// //                 </Header.RightPanel>
// //             </Header.Frame>
// //         </Header>
// //     )
// // }

// // export default HeaderContainer