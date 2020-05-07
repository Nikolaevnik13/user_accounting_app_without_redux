import React, {useContext} from "react";
import {UserContext} from "../App";


function StartOptions(props) {
    const value=useContext(UserContext);
    return (
        <div>
            <button onClick={() => {value.changePage("Registration")}} type="button" className="btn btn-success">Registration</button>
            <button onClick={() => {value.changePage("Login")}} type="button" className="btn btn-danger">Sign In</button>
        </div>
    )
}

export default StartOptions;

