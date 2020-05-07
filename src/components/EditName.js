import React, {useContext} from "react";
import {UserContext} from "../App";

const URL_EDIT_USER = "https://webaccounting.herokuapp.com/account/user";


function EditName() {
    const value = useContext(UserContext);

    console.log(value.user);
    const handlerOnSubmitForm = (e) => {
        e.preventDefault();
        let data = {
            firstName: e.target.firstName.value ? e.target.firstName.value : value.user.firstName,
            lastName: e.target.lastName.value ? e.target.lastName.value : value.user.lastName
        };

        let encodeData = `Basic ` + window.btoa(value.user.login + ":" + value.user.password);

        fetch(URL_EDIT_USER, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: encodeData
            },
            body: (JSON.stringify(data))
        })
            .then(response => response.json())
            .then(user => {
                if (user.status) {
                    alert(user.message)
                    return;
                }
                console.log("edit name+");
                console.log(user);

                value.fillUser(user);
                value.changePage("MyAccount")
            })
            .catch(e => console.log(e));


    };


    return (
        <div>
            <form onSubmit={handlerOnSubmitForm}>
                <p className="h4 text-center mb-4">Edit user</p>

                <label className="grey-text">
                    First Name
                    <input type="text" name='firstName' className="form-control"/>
                </label>
                <label className="grey-text">
                    Last Name
                    <input type="text" name="lastName" className="form-control"/>
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

export default EditName;