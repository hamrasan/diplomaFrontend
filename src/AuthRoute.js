import React from "react";
import { useContext } from "react";
import contextValue from "./appContext";
import {Navigate, Route, useNavigate} from "react-router";

function AuthRoute(props) {
    const context = useContext(contextValue);

    if(props.logout && !props.guest){
        context.logout();
        return props.children;
    }

    if (context.isAuth && props.guest) {
        if(context.oldUrl) return <Navigate to={context.oldUrl} />;
        return <Navigate to="/" />;
    }
    else if (context.isAuth) {
        return props.children;
    } else if (!context.isAuth && props.guest) {
        return props.children;
    } else {
        context.setOldUrl(props.path);
         return <Navigate to="/login" />;
    }
}

export default AuthRoute;
