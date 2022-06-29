import React, {useEffect, useState} from "react";

import "../styles/profile.css"
import Auth from "../utils/auth";

function Profile() {
    const [email, setEmail] = useState(null)
    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)
    const [phone, setPhone] = useState(null)

    useEffect(() => {
            try {
                const profile = Auth.getProfile()
                if (Auth.loggedIn()) {
                    setEmail(profile.email)
                    setFirstName(profile.first_name)
                    setLastName(profile.last_name)
                    setPhone(profile.phone)
                }
                if (window.location.pathname === '/profile')
                    window.location.href = "/profile/" + profile.email
            } catch (e) {
                window.location.href = '/login?r'
            }

        }
        ,
        []
    )
    ;

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-12 mt-2 col-md-4">
                    <fieldset className="px-2 fSet">
                        <div className="text-center">
                            <span className="profile_text">Profile </span>
                            <img onClick={Auth.logout}
                                 src="https://res.cloudinary.com/dluwizg51/image/upload/v1656498300/logout_ir9fsh.png"
                                 height="19" className="mx-1 logout"/>
                        </div>
                        <hr/>
                        <p>Email: <input className="input" value={email} readOnly/></p>
                        <p>First Name: <input className="input" value={firstName} readOnly/></p>
                        <p>Last Name: <input className="input" value={lastName} readOnly/></p>
                        <p>Phone: <input className="input" value={phone} readOnly/></p>
                        <hr/>
                        <br/>
                    </fieldset>
                </div>
            </div>
        </div>
    );
}

export default Profile;
