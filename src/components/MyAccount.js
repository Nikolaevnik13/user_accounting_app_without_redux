import React, {useContext} from "react";
import {UserContext} from "../App";
const URL_DELETE_USER="https://webaccounting.herokuapp.com/account/user";

function MyAccount(props) {
    const value = useContext(UserContext);

    const deleteUser = (e) => {
        let encodeData = `Basic ` + window.btoa(value.user.login + ":" + value.user.password);
        fetch(URL_DELETE_USER, {
            method: "DELETE",
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
                value.deleteToken();
                value.changePage("StartOptions");
            })
            .catch(e => console.log(e));
    }

    return (
        <div>
            <div className="">Name is {value.user.firstName}</div>
            <div className="">Last name is {value.user.lastName}</div>
            <div className="">Email / Login is {value.user.login}</div>
            <div className="">Roles is {value.user.roles} </div>
            <div>
                <button onClick={() => {
                    value.changePage("EditName")
                }} type="button" className="btn btn-success">Edit Name
                </button>
                <button onClick={() => {
                    value.changePage("EditPassword")
                }} type="button" className="btn btn-success">Change Password
                </button>
                <button onClick={deleteUser} type="button" className="btn btn-danger">Delete User</button>
                <button onClick={() => {
                    value.deleteToken()
                }} type="button" className="btn btn-danger">Log Out
                </button>
            </div>
        </div>
    )
}
export default MyAccount;


