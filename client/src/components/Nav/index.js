import {useState, useEffect} from "react";
import Auth from "../../utils/auth";
import {Link} from "react-router-dom";

function Nav() {
    const [email, setEmail] = useState(null)

    useEffect( () => {
        async function fetchData() {
            if (Auth.loggedIn())
                setEmail(Auth.getProfile().email)
        }
        fetchData()
    }, [])

    function showNavigation() {
        if (Auth.loggedIn()) {
            return (
                <ul className="flex-row">
                    <li className="mx-1">
                        <a href="/" onClick={() => Auth.logout()} >
                            Logout
                        </a>
                    </li>
                    <li className="mx-1">
                        <a>
                            {email}
                        </a>
                    </li>
                </ul>
            );
        } else {
            return (
                <ul className="flex-row">
                    <li className="mx-1">
                        <Link to="/signup">
                            Signup
                        </Link>
                    </li>
                    <li className="mx-1">
                        <Link to="/login">
                            Login
                        </Link>
                    </li>
                </ul>
            );
        }
    }

    return (
        <header className="flex-row px-1">
            <h1>
                <Link to="/">
                    <span role="img" aria-label="shopping bag">🛍️</span>
                    MCQ Tests
                </Link>
            </h1>

            <nav>
                {showNavigation()}
            </nav>
        </header>
    );
}

export default Nav;
