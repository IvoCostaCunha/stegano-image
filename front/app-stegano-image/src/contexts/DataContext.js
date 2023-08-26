import React, { Component, createContext } from "react";

export const DataContext = createContext()

export default class DataContextProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // For later
    }
  }

  sendPngFiles = async (id, files) => {
    try {
      const request = await fetch("http://localhost:5000/api/0.1/files/upload", {
        method: "POST",
        body: files
      })

      const requestJSON = await request.json()

      if (request.status === 200) {
        console.log(requestJSON.message)
        return { message: requestJSON.message, confirmation: true, code: request.status }
      }
      else {
        return { message: requestJSON.error, confirmation: false, code: request.status }
      }

    } catch (err) {
      console.log(err)
      return { error: err.message, confirmation: false, code: "None" }
    }
  }

  getPngFiles = async (id) => {
    return id
  }

  render() {
    return (
      <DataContext.Provider value={{ ...this.state, sendPngFiles: this.sendPngFiles, getPngFiles: this.getPngFiles}}>
        {this.props.children}
      </DataContext.Provider>
    )
  }
}