import React, {useState, useEffect} from "react";
import Auth from "../../utils/auth";
import {Link} from "react-router-dom";
import "../../styles/navbar.css"

import 'bootstrap/dist/css/bootstrap.min.css';

function Nav() {
    const [email, setEmail] = useState(null)
    const [isNavExpanded, setIsNavExpanded] = useState(false)

    useEffect(() => {
        async function fetchData() {
            if (Auth.loggedIn())
                setEmail(Auth.getProfile().email)
        }

        fetchData()
    }, [])

    function showNavigation() {
        if (Auth.loggedIn()) {
            return (
                <div className={isNavExpanded ? "navigation-menu expanded" : "navigation-menu mx-4"}>
                    <ul>
                        <li>
                            <Link to="/profile">
                                { email }
                            </Link>
                        </li>
                    </ul>
                </div>
            );
        } else {
            return (
                <div className={isNavExpanded ? "navigation-menu expanded" : "navigation-menu mx-4"}>
                    <ul>
                        <li>
                            <Link to="/login">
                                Login
                            </Link>
                        </li>
                    </ul>
                </div>
            );
        }
    }

    return (
        <header className="navigation">
            <Link to="/" className="brand-name">
                <img src="https://res.cloudinary.com/dluwizg51/image/upload/v1656498085/favicon_twx90v.png" alt="favicon" height="32" className="mx-2" />
                <span>
                    Quiz Evolve
                </span>
            </Link>
            <button className="hamburger" onClick={() => {
                setIsNavExpanded(!isNavExpanded)
            }}>
                <svg xmlns="http://www.w3.org/2000/svg"
                     className="h-5 w-5"
                     viewBox="0 0 20 20"
                     fill="white">
                    <path fillRule="evenodd"
                          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                          clipRule="evenodd"/>
                </svg>
            </button>

            <nav>
                {showNavigation()}
            </nav>
        </header>
    );
}

export default Nav;
