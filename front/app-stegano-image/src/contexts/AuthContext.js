import React, { Component, createContext } from "react";

// Done using this tutorial https://www.youtube.com/watch?v=CGRpfIUURE0
export const AuthContext = createContext()

export default class AuthContextProvider extends Component {

  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem('token'),
      id: localStorage.getItem('id'),
      username: localStorage.getItem('username'),
      mail: localStorage.getItem('mail'),

      isConnected: () => {
        if (this.state.token) return true
        else return false
      },

      signOut: async () => {

        // Send request to purge user token on API
        try {
          const delTokenRequest = await fetch(`http://localhost:80/api/0.1/disconnect/user/${this.state.id}`)
          const delTokenRequestDataJSON = await delTokenRequest.json()

          if (delTokenRequest.status === 200) {
            if (delTokenRequestDataJSON.response === "OK") {
              this.state.token = ""
              this.state.id = ""
              this.state.username = ""
              this.state.mail = ""

              // Delete cookies associated with user
              localStorage.removeItem('id')
              localStorage.removeItem('username')
              localStorage.removeItem('mail')
              localStorage.removeItem('token')

              console.log("User disconnected successfully")
              return true
            }
          } else {
            this.state.token = ""
            this.state.id = ""
            this.state.username = ""
            this.state.mail = ""

            // Delete cookies associated with user
            localStorage.removeItem('id')
            localStorage.removeItem('username')
            localStorage.removeItem('mail')
            localStorage.removeItem('token')
            console.log("Deconnexion failed on server")
            return false
          }
        } catch (err) {
          console.log(err)
          return false
        }
      },

      verifyToken: async () => {
        try {
          const verifyTokenRequest = await fetch("http://localhost:80/api/0.1/verifytoken", {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: this.state.id,
              token: this.state.token
            })
          })

          const verifyTokenRequestDataJSON = await verifyTokenRequest.json()

          if (verifyTokenRequest.status === 200) {
            return verifyTokenRequestDataJSON.response === "OK"
          } else return false
        } catch (err) {
          console.log(err)
          return false
        }
      },

      signIn: async (signInData) => {

        try {
          const signInRequest = await fetch("http://localhost:80/api/0.1/signin", {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              mail: signInData.get('mail'),
              password: signInData.get('password'),
            }),

          })

          const signInRequestDataJSON = await signInRequest.json()

          if (signInRequest.status === 200) {

            if (signInRequestDataJSON.response === "OK") {

              this.state.token = signInRequestDataJSON.token
              this.state.id = signInRequestDataJSON.id
              this.state.mail = signInRequestDataJSON.mail
              this.state.username = signInRequestDataJSON.username

              localStorage.setItem('token', this.state.token)
              localStorage.setItem('id', this.state.id)
              localStorage.setItem('mail', this.state.mail)
              localStorage.setItem('username', this.state.username)

              console.log("User authentified and user data retrieved")
              return true

            }
            else {
              console.log("User non authentified")
              this.token = false
              return false
            }
          }

        } catch (err) {
          console.log(err)
          if (err.message === "NetworkError when attempting to fetch resource.") return "NETWORK_ERROR"
          return "ERROR"
        }
      }
    }
  }

  render() {
    return (
      <AuthContext.Provider value={{ ...this.state, }}>
        {this.props.children}
      </AuthContext.Provider>
    )
  }

}