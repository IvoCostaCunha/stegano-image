import React, { Component, createContext } from "react";

import { AuthContext } from "./AuthContext";

export const DataContext = createContext()

export default class DataContextProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // For later
    }
  }

  requestDownload = async (filesId, id) => {
    try {
      const request = await fetch('http://localhost:5000/api/0.1/files/upload-request', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          filesId: filesId,
          id: id
        }),
      })

      const requestJSON = await request.json()
      if (request.status === 200) {
        console.log(requestJSON.message)
        return { message: requestJSON.message, confirmation: true, code: request.status, files: requestJSON.files }
      }
      else {
        return { message: requestJSON.error, confirmation: false, code: request.status }
      }


    } catch (err) {
      console.log(err)
      return { error: err.message, confirmation: false, code: "None" }
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

        const downloadId = requestJSON.download_id	

        const downloadRequest = await fetch("http://localhost:5000/api/0.1/files/download-request", {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            filesId: downloadId,
            userId: id
          }),
        })

        const downloadRequestData = downloadRequest.files()

        console.log(files)

        return { message: requestJSON.message, confirmation: true, code: request.status }
      }
      else {
        return { error: requestJSON.error, confirmation: false, code: request.status }
      }

    } catch (err) {
      console.log(err)
      return { error: err.message, confirmation: false, code: "Unknown" }
    }
  }

  getPngFiles = async (id) => {
    return id
  }

  render() {
    return (
      <DataContext.Provider value={{ ...this.state, sendPngFiles: this.sendPngFiles, getPngFiles: this.getPngFiles, requestDownload: this.requestDownload }}>
        {this.props.children}
      </DataContext.Provider>
    )
  }
}