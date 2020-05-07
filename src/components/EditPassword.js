import React, {useContext} from "react";
import {UserContext} from "../App";

const URL_EDIT_PASSWORD = "https://webaccounting.herokuapp.com/account/user/password";


function EditPassword() {
    const value = useContext(UserContext);
    const handlerOnSubmitForm = (e) => {
        e.preventDefault();

        let password = e.target.password.value ? e.target.password.value : value.user.password;


        let encodeData = `Basic ` + window.btoa(value.user.login + ":" + value.user.password);
        console.log(encodeData);
        console.log(password);

        fetch(URL_EDIT_PASSWORD, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: encodeData,
                'X-Password': password
            }
        })
            .then(response => response)
             .then(() => {
                // if (user.status) {
                    // console.log(user)
                    // alert(user.message)
                    // return;
                // }
                value.fillUser({password});
                value.changePage("MyAccount")
             })
            .catch(e => console.log(e));


    };


    return (
        <div>
            <form onSubmit={handlerOnSubmitForm}>
                <p className="h4 text-center mb-4">Change password</p>

                <label className="grey-text">
                    New password
                    <input type="text" name='password' className="form-control"/>
                </label>

                <br/>
                <button type="submit" className="btn btn-success">Send</button>
            </form>

            <button onClick={() => {
                value.changePage("MyAccount")
            }}
                    type="button"
                    className="btn btn-success">
                Back to start
            </button>
        </div>
    )
}

export default EditPassword;