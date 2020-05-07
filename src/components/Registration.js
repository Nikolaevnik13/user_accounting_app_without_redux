import React, {useContext} from "react";
import {UserContext} from "../App";

const URL_REGISTRATION = "https://webaccounting.herokuapp.com/account/user";


function Registration() {
    const value = useContext(UserContext);

    const handlerOnSubmitForm = (e) => {
        e.preventDefault();
        let userFromInput = {
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            login: e.target.email.value,
            password: e.target.password.value
        }
        fetch(URL_REGISTRATION,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userFromInput)
            })
            .then(response => response.json())
            .then(user => {
                if (user.status) {
                    alert(user.message)
                    return;
                }
                value.fillUser({...user,...userFromInput});
                value.changeStorage({...user,...userFromInput});
                value.changePage("MyAccount")
            })
            .catch((e) => {
                alert("request is wrong")
                value.changePage("StartOptions")
            })
    }

    return (
        <div>
            <form onSubmit={handlerOnSubmitForm}>
                <p className="h4 text-center mb-4">Sign in</p>

                <label className="grey-text">
                    Your First name
                    <input type="text" name='firstName' className="form-control"/>
                </label>
                <label className="grey-text">
                    Your last name
                    <input type="text" name="lastName" className="form-control"/>
                </label>
                <label className="grey-text">
                    Your login / email
                    <input type="email" name="email" className="form-control"/>
                </label>

                <br/>
                <label className="grey-text">
                    Your password
                    <input type="password" name="password" className="form-control"/>
                </label>
                <button type="submit" className="btn btn-success">Send</button>
            </form>
            <button onClick={() => {
                value.changePage("StartOptions")
            }} type="button" className="btn btn-success">Back to start
            </button>
        </div>
    )


}

export default Registration;