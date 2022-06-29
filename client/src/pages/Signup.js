import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useMutation} from '@apollo/client';
import Auth from '../utils/auth';
import {ADD_USER} from '../utils/mutations';

import "../styles/auth.css"


function Signup(props) {
    const [formState, setFormState] = useState({email: '', password: ''});
    const [addUser, {error}] = useMutation(ADD_USER);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        await addUser({
            variables: {
                email: formState.email,
                password: formState.password,
                // firstName: formState.firstName,
                // lastName: formState.lastName,
            },
        });
        window.location.assign('/login?r');
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
        <div className="signup-container">
            <div className="auth">
                <div className="auth-content">
                    <h2 className="display-6 text-center">Sign Up</h2>
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-group mt-3">
                            <label htmlFor="email">Email address:</label>
                            <input className="form-control mt-1"
                                   placeholder="sample@test.com"
                                   name="email"
                                   type="email"
                                   id="email"
                                   onChange={handleChange}
                                   required/>
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="first_name">First Name:</label>
                            <input className="form-control mt-1"
                                   placeholder="Steve"
                                   name="first_name"
                                   type="text"
                                   id="first_name"
                                   onChange={handleChange}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="last_name">Last Name:</label>
                            <input className="form-control mt-1"
                                   placeholder="Anderson"
                                   name="last_name"
                                   type="text"
                                   id="last_name"
                                   onChange={handleChange}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="phone">Phone:</label>
                            <input className="form-control mt-1"
                                   placeholder="+12345678901"
                                   name="phone"
                                   type="tel"
                                   id="phone"
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
                                   required
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="confirm_password">Confirm Password:</label>
                            <input className="form-control"
                                   placeholder="********"
                                   name="confirm_password"
                                   type="password"
                                   id="confirm_password"
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
                    <p>Already have an account?
                        <Link className="signup" to="/login?r"> Log In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
