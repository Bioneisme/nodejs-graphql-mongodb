import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";

import "../styles/profile.css"
import Auth from "../utils/auth";
import {useQuery} from "@apollo/client";
import {QUERY_USER} from "../utils/queries";

function Profile() {
    const {loading, error, data} = useQuery(QUERY_USER);
    let user
    if (data) {
        user = data.user
    }

    const {register, handleSubmit} = useForm();

    useEffect(() => {
        try {
            if (window.location.pathname === '/profile')
                window.location.href = "/profile/" + user.email
        }
        catch (e) {
            console.log(e)
        }
    })

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("avatar", data.file[0]);
        formData.append("email", user.email);

        setTimeout(function(){
            window.location.reload();
        }, 2000);

        await fetch("http://localhost:4000/api/avatar", {
            method: "POST",
            body: formData,
        })
    };

    if (loading) return 'Loading...'

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
                        <img className="avatar" src={user.image} />
                        <p>Email: <input className="input" value={user.email} readOnly/></p>
                        <p>First Name: <input className="input" value="" readOnly/></p>
                        <p>Last Name: <input className="input" value="" readOnly/></p>
                        <p>Phone: <input className="input" value="" readOnly/></p>
                        <hr/>
                        <div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <input name="avatar" type="file" {...register("file")} />

                                <input type="submit" />
                            </form>
                        </div>
                        <br/>
                    </fieldset>
                </div>
            </div>
        </div>
    )
}

export default Profile;
