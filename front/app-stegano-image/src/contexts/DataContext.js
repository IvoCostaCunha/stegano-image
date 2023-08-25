import React, { Component, createContext } from "react";

export const DataContext = createContext()

export default class DataContextProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sendPngFile: async (id, files) => {
              try {
                const request = await fetch("http://localhost:80/api/0.1/signimages", {
                  method: "POST",
                  body: files
                })
      
                const requestData = await request.json()
      
                if (request.status === 200) {
                  console.log("request data", requestData)
                } else return false
              } catch (err) {
                console.log(err)
                return false
              }
            },

            getPngFiles: (file, id) => {
                return id
            },

        }
    }

    render() {
        return (
          <DataContext.Provider value={{ ...this.state, }}>
            {this.props.children}
          </DataContext.Provider>
        )
      }
}

