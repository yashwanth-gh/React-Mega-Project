import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import authSlice from '../store/authSlice'
import { useSelector } from 'react-redux'

export default function Protected({ children, authentication }) {
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate();
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        //TODO: make it more easy to understand

        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }

        //let authValue = authStatus === true ? true : false

        if (authentication && authentication !== authStatus) {
            navigate("/login");
        } else if (!authentication && authentication !== authStatus) {
            navigate("/");
        }
        setLoader(false);
    }, [authentication, authStatus, navigate])
    return loader ? <h1>Loading ...</h1> : { children };
}

