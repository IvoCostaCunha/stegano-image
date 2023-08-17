import React, { Component, createContext } from "react";

// Done using this tutorial https://www.youtube.com/watch?v=CGRpfIUURE0
export const AuthContext = createContext()

export default class AuthContextProvider extends Component {

    state = {
        token: localStorage.getItem('token'),
        username: localStorage.getItem('username'),
        mail: localStorage.getItem('mail'),
    }

    signout = () => {
        return 'duie'
    }

    signin = () => {
        return "OK NOT OK"
    }

    isConnected = () => {
        if (this.state.token) return true
        else return false
    }

    render() {
        return (
            <AuthContext.Provider value={{ ...this.state }}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }

}