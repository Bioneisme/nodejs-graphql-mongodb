import React, {useState, useEffect} from 'react';
import {useMutation} from '@apollo/client';
import {Link} from 'react-router-dom';
import {LOGIN} from '../utils/mutations';
import Auth from '../utils/auth';

import "../styles/auth.css"

function Login(props) {
    const [formState, setFormState] = useState({email: '', password: ''});
    const [login, {error}] = useMutation(LOGIN);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const mutationResponse = await login({
                variables: {email: formState.email, password: formState.password},
            });
            const token = mutationResponse.data.login.token;
            Auth.login(token);
        } catch (e) {
            console.log(e);
        }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    useEffect(() => {
        if (window.location.search === '') {
            window.location.reload()
            window.location.search = "r"
        }
    }, []);

    return (
            <div className="auth-container">
                <div className="auth">
                    <div className="auth-content">
                        <h2 className="display-6 text-center">Login</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="form-group mt-3">
                                <label htmlFor="email">Email address:</label>
                                <input className="form-control mt-1"
                                       placeholder="sample@test.com"
                                       name="email"
                                       type="email"
                                       id="email"
                                       onChange={handleChange}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="pwd">Password:</label>
                                <input className="form-control"
                                       placeholder="********"
                                       name="password"
                                       type="password"
                                       id="pwd"
                                       onChange={handleChange}
                                />
                            </div>
                            {error ? (
                                <div>
                                    <p className="error-text">The provided credentials are incorrect</p>
                                </div>
                            ) : null}
                            <div className="form-group mt-3">
                                <button type="submit" className="form-control">Submit</button>
                            </div>
                        </form>
                        <br/>
                        <p>Don't have an account yet?
                            <Link className="signup" to="/signup"> Create an account</Link>
                        </p>
                    </div>
                </div>
            </div>
    )
        ;
}

export default Login;
