import React, {useContext} from "react";
import StartOptions from "./StartOptions";
import MyAccount from "./MyAccount";
import EditName from "./EditName";
import EditPassword from "./EditPassword";
import Registration from "./Registration";
import {UserContext} from "../App";
import Login from "./Login";


function Main() {
    const value=useContext(UserContext);
    switch (value.page) {
        case "MyAccount":
            return (<MyAccount/>);
        case "Registration":
            return (<Registration/>)
        case "Login":
            return (<Login/>)
        case "EditName":
            return (<EditName/>);
        case "EditPassword":
            return (<EditPassword/>)
        case "StartOptions":
            return (<StartOptions/>);
        default:
            return (<StartOptions/>);

    }
}


export default Main;


