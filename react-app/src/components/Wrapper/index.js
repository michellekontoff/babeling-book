import React from "react";
import { useLocation } from "react-router";

function Wrapper(props) {
    const location = useLocation()

    return (
        <div id='wrapper' style={location.pathname === '/' ? {"background-image": "none"} : {} }>
            {props.children}
        </div>
    )
}

export default Wrapper;
