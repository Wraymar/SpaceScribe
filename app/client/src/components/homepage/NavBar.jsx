import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import AccountDeet from "./AccountDeet";
import currentUserContext from "../../context/current-user-context";

import logo from "../../assets/images/SpaceScribeLogo2.png";

function NavBar() {
  const { currentUser } = useContext(currentUserContext);
  const location = useLocation();

  return (
    <>
      <div className="glass-card nav-wrapper">
        <Link to="/homepage" className="logo">
          {/* <h2>SpaceScribe!</h2> */}
          <img src={logo} />
        </Link>

        <div className="nav-links">
          <Link
            to="/recap"
            className={`nav-link ${
              location.pathname === "/recap" ? "active" : ""
            }`}
          >
            Weekly Recap
          </Link>
          <Link
            to="/entries"
            className={`nav-link ${
              location.pathname === "/entries" ? "active" : ""
            }`}
          >
            My Entries
          </Link>
          <Link
            to="/calender"
            className={`nav-link ${
              location.pathname === "/calender" ? "active" : ""
            }`}
          >
            Calendar
          </Link>
        </div>

        {currentUser && (
          <Link to="/userpage">
            <AccountDeet
              imgSrc={
                "https://www.freeiconspng.com/uploads/blue-circle-icon-18.png"
              }
              username={currentUser.username}
              email={currentUser.email}
            />
          </Link>
        )}
      </div>
    </>
  );
}

export default NavBar;
