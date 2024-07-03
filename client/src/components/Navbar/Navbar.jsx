import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../assets/logo.svg";
import search from "../../assets/search-solid.svg";
import bars from "../../assets/bars-solid.svg"
import Avatar from "../Avatar/Avatar.jsx";
import "./Navbar.css";
import { setCurrentUser } from "../../actions/currentUser.js";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const Navbar = ({ handleSlideIn }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  var User = useSelector((state) => state.currentUserReducer);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    dispatch(setCurrentUser(null));
  };

  useEffect(() => {
    const token = User?.token;
    if (token) {
      const decodeToken = jwtDecode(token);
      if (decodeToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
  }, [User?.token, dispatch]);

  return (
    <nav className="main-nav">
      <div className="navbar">
        <button className="slide-in-icon" onClick={() => handleSlideIn()}>
          <img src={bars} alt="bars" width="15" />
        </button>
        <div className="navbar-1">
          <Link to="/" className="nav-item nav-logo">
            <img src={logo} alt="logo" />
          </Link>
          <Link to="/" className="nav-item nav-btn res-nav">About</Link>
          <Link to="/" className="nav-item nav-btn res-nav">Products</Link>
          <Link to="/" className="nav-item nav-btn res-nav">For Teams</Link>
          <form>
            <input type="text" placeholder="Search..." />
            <img src={search} alt="search" width="18" className="search-icon" />
          </form>
        </div>
        <div className="navbar-2">
           {
              User === null ? (
                <Link to="/Auth" className="nav-item nav-links">
                  Log In
                </Link>
                ) : (
                <>
                  <Avatar backgroundColor="#009dff" px="10px"  py="7px" borderRadius="50%" color="white" >
                    <Link to={`/Users/${User?.result?._id}`} style={{ color: "white", textDecoration: "none" }}>
                      {User.result.name.charAt(0).toUpperCase()}
                    </Link>
                  </Avatar>
                  <button className="nav-item nav-links" onClick={handleLogout}> Log out </button>
                </>
              )
            }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
