import React, { Component, createContext } from "react";

export const AppContext = createContext()

export default class AppContextProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
          currentPage: "SignIn"
        }
    }

    render() {
        return (
          <AppContext.Provider value={{ ...this.state, }}>
            {this.props.children}
          </AppContext.Provider>
        )
      }
}