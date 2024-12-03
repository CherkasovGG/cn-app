import React from 'react';
import { Navigate, Route } from 'react-router-dom';

const RouteGuard = ({ children }) => {
    function hasJWT() {
        let flag = false;

        localStorage.getItem("token") ? flag=true : flag=false

        return flag
    }

    return hasJWT() ? children : <Navigate to='/auth/signin' />
};

export default RouteGuard;
