import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function PrivateRoutes() {
    const {auth} = useAuth();

    if(auth === undefined) {
        return 'Loading...'
    }

    return auth === true ? 
        <Outlet></Outlet> 
        : <Navigate to="/auth" />
}
