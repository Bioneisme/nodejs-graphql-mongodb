import {useState, useEffect} from "react";
import Auth from "../../utils/auth";
import {Link} from "react-router-dom";
import "../../styles/navbar.css"

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
                <div className="navigation-menu">
                    <ul>
                        <li>
                            <a href="/" onClick={() => Auth.logout()}>
                                Logout
                            </a>
                        </li>
                        <li>
                            <a>
                                {email}
                            </a>
                        </li>
                    </ul>
                </div>
            );
        } else {
            return (
                <div className={isNavExpanded ? "navigation-menu expanded" : "navigation-menu"}>
                    <ul>
                        <li>
                            <Link to="/signup">
                                Signup
                            </Link>
                        </li>
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
