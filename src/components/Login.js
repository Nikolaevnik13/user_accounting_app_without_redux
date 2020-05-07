import React, {useContext} from "react";
import {UserContext} from "../App";

const URL_LOGIN = "https://webaccounting.herokuapp.com/account/login";

function Login() {
    const value = useContext(UserContext);


    const handlerOnSubmitForm = (e) => {
        e.preventDefault();
        let data = {
            login: e.target.login.value,
            password: e.target.password.value
        };
        let encodeData = `Basic ` + window.btoa(data.login + ":" + data.password);
        fetch(URL_LOGIN, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: encodeData
            }
        })
            .then(response => response.json())
            .then(user => {
                if (user.status) {
                    alert(user.message)
                    return;
                }
                console.log(user);
                user.password = data.password;
                value.fillUser(user);
                value.changeStorage({...user, ...data});
                value.changePage("MyAccount")
            })
            .catch(e => console.log(e));

    }
    return (
        <div>
            <form onSubmit={handlerOnSubmitForm}>
                <p className="h4 text-center mb-4">Log in</p>
                <label className="grey-text">
                    Login / Email
                    <input type="text" name='login' className="form-control"/>
                </label>
                <label className="grey-text">
                    Password
                    <input type="text" name="password" className="form-control"/>
                </label>
                <br/>
                <button type="submit" className="btn btn-success">Send</button>
            </form>
            <button onClick={() => {
                value.changePage("StartOptions")
            }}
                    type="button"
                    className="btn btn-success">
                Back to start
            </button>
        </div>
    )
}

export default Login;