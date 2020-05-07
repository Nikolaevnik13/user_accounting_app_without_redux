import React, {useEffect, useState} from 'react';

import './App.css';

import Main from "./components/Main";

export const UserContext = React.createContext();

function App(props) {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        login: "",
        password: "",
        roles: [],
        // token: ""
    });

    const [page, setPage] = useState("StartOptions");

    useEffect(() => {
        let data = localStorage.getItem("auth");
        if (data) {
            let res = JSON.parse(data);
            setUser(res.user);
            // setUser({
            //     firstName: res.user.firstName,
            //     lastName: res.user.lastName,
            //     login: res.user.last,
            //     password: res.user.password,
            //     roles: [...res.user.roles]
            // });
            setPage("MyAccount");
        }

    }, []);

    const changeStorage = (user) => {
        let encodeData = `Basic ` + window.btoa(user.login + ":" + user.password);
        localStorage.setItem("auth", JSON.stringify({token: encodeData, user}));
    }
///
    const deleteToken = () => {
        localStorage.removeItem("auth");
        setUser({
            firstName: "",
            lastName: "",
            login: "",
            password: "",
            roles: []
        })
        setPage("StartOptions")
    }

    const changePage = (newPage) => {
        setPage(newPage);
    }

    const fillUser = (newUser) => {
       let  res={...user,...newUser}
        console.log("fill user");
        console.log(res);
        setUser(res);
    }

    return (
        <div>
            <UserContext.Provider value={{
                user,
                page,
                changePage,
                fillUser,
                changeStorage,
                deleteToken,

            }}>
                <Main/>
            </UserContext.Provider>
        </div>
    )

}

export default App;




