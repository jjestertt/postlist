import React from "react";
import {NavLink} from "react-router-dom";

export default function Header(){
    return (
        <header className="mb-3">
            <nav className="navbar navbar-expand-md navbar-light bg-light">
                <NavLink to='/' className="navbar-brand">На главную</NavLink>
            </nav>
        </header>
    );
}