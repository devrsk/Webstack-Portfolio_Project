import React, { useContext, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Context } from '../context/userInfo';
import { Header } from "../components/export";
import * as ROUTES from '../constants/routes';

function HeaderContainer(props) {
  const { user, logout } = useContext(Context);

  const conditionalRentals = (user === null || user.role === "A") ? null : (
    <Header.Link to={ROUTES.RENT_POST}>Manage Rentals</Header.Link>
  );

  const conditionalSignin = user === null ? (
    <Header.Link to={ROUTES.SIGN_IN}>Sign in</Header.Link>
  ) : (
    <Header.Group>
      <Header.Profile>
        <Header.Link to='#'>{user.username}</Header.Link>
        <Header.Dropdown>
          <Header.Group>
            <Header.TextLink to={ROUTES.SAVED_HOME}>Saved Home</Header.TextLink>
          </Header.Group>
          <Header.Group>
            <Header.TextLink to={ROUTES.SAVED_SEARCH}>Saved Search</Header.TextLink>
          </Header.Group>
          <Header.Group>
            <Header.TextLink to={ROUTES.LISTING}>Listing</Header.TextLink>
          </Header.Group>
          <Header.Group>
            <Header.TextLink to={ROUTES.APPLICATION}>Application</Header.TextLink>
          </Header.Group>
          <Header.Group>
            <Header.TextLink to={ROUTES.ACCOUNT_SETTING}>Account Setting</Header.TextLink>
          </Header.Group>
          <Header.Group>
            <Header.TextLink to='#' onClick={() => logout()}>
              Sign out
            </Header.TextLink>
          </Header.Group>
        </Header.Dropdown>
      </Header.Profile>
    </Header.Group>
  );

  const conditionalAdmin = (user !== null && user.role === "A") ? (
    <Header.Link to={ROUTES.HELP}>Admin</Header.Link>
  ) : null;

  const conditionalRent = user === null ? null : (
    <Header.Link to={ROUTES.SELL}>Sell</Header.Link>
  );

  const [Menu, setMenuDisplay] = useState("none");

  function toggleMenu() {
    if (Menu === "none") {
      setMenuDisplay("display");
    } else {
      setMenuDisplay("none");
    }
  }

  const small_conditionalRentals = (user === null || user.role === "A") ? null : (
    <Header.Group>
      <Header.TextLink to={ROUTES.RENTALS} onClick={toggleMenu}>Manage Rentals</Header.TextLink>
    </Header.Group>
  );

  const small_conditionalSignin = user === null ? (
    <Header.Group>
      <Header.TextLink to={ROUTES.SIGN_IN} onClick={toggleMenu}>Sign in</Header.TextLink>
    </Header.Group>
  ) : (
    <>
      <Header.Group>
        <Header.TextLink to={ROUTES.SAVED_HOME} onClick={toggleMenu}>Saved Home</Header.TextLink>
      </Header.Group>
      <Header.Group>
        <Header.TextLink to={ROUTES.SAVED_SEARCH} onClick={toggleMenu}>Saved Search</Header.TextLink>
      </Header.Group>
      <Header.Group>
        <Header.TextLink to={ROUTES.LISTING} onClick={toggleMenu}>Listing</Header.TextLink>
      </Header.Group>
      <Header.Group>
        <Header.TextLink to={ROUTES.APPLICATION} onClick={toggleMenu}>Application</Header.TextLink>
      </Header.Group>
      <Header.Group>
        <Header.TextLink to={ROUTES.ACCOUNT_SETTING} onClick={toggleMenu}>Account Setting</Header.TextLink>
      </Header.Group>
      <Header.Group>
        <Header.TextLink to='#' onClick={() => logout()}>Sign out</Header.TextLink>
      </Header.Group>
    </>
  );

  const samll_conditionalAdmin = (user !== null && user.role === "A") ? (
    <Header.Group>
      <Header.TextLink to={ROUTES.HELP} onClick={toggleMenu}>Admin</Header.TextLink>
    </Header.Group>
  ) : null;

  return (
    <Header>
      <Header.Frame>
        <Header.LeftPanel>
          <Header.Link to={ROUTES.BUY}>Buy</Header.Link>
          <Header.Link to={ROUTES.RENT}>Rent</Header.Link>
          {conditionalRent}
          <Header.Link to={ROUTES.AGENT_FINDER}>Agent finder</Header.Link>
        </Header.LeftPanel>

        <Header.Logo to={ROUTES.HOME}>PropertyPro</Header.Logo>

        <Header.SmallIcon toggleMenu={toggleMenu}>
          <i className="fas fa-align-justify"></i>
        </Header.SmallIcon>

        <Header.SmallDropdown display={Menu}>
          <Header.SmallGroup>
            <Header.Group>
              <Header.TextLink to={ROUTES.BUY} onClick={toggleMenu}>Buy</Header.TextLink>
            </Header.Group>
            <Header.Group>
              <Header.TextLink to={ROUTES.RENT} onClick={toggleMenu}>Rent</Header.TextLink>
            </Header.Group>
            <Header.Group>
              <Header.TextLink to={ROUTES.SELL} onClick={toggleMenu}>Sell</Header.TextLink>
            </Header.Group>
            <Header.Group>
              <Header.TextLink to={ROUTES.AGENT_FINDER} onClick={toggleMenu}>Agent finder</Header.TextLink>
            </Header.Group>
            {small_conditionalRentals}
            {samll_conditionalAdmin}
            {small_conditionalSignin}
          </Header.SmallGroup>
        </Header.SmallDropdown>

        <Header.RightPanel>
          {conditionalRentals}
          {conditionalAdmin}
          {conditionalSignin}
        </Header.RightPanel>
      </Header.Frame>
    </Header>
  );
}

export default HeaderContainer;
