import { useState } from "react";

import AuthContext  from './AuthContext'

const AuthState = ({children})=>{
    const token = localStorage.getItem('auth-token');
    const [auth, setAuth] = useState({token: token});
    return(
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthState;