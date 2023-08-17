import { createContext } from "react";

const UserContext = createContext(
    {
        'token': false,
        'username': "",
        'mail': "",
    }
)

function isAuthentified() { return(UserContext.token) }

export  {UserContext, isAuthentified};

