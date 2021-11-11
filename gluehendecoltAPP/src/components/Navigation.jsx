import React from "react";
import {BottomNavigation, BottomNavigationAction} from '@material-ui/core';
import PersonAdd from '@material-ui/icons/PersonAdd';
import SearchIcon from '@material-ui/icons/Search';
import {Link, useLocation} from 'react-router-dom';
import "./components.css";

export const Navigation = () => {


    const location = useLocation();

    return (
        <BottomNavigation
            value={location.pathname}
            showLabels
            className={"BottomNavigation"}
        >
            <BottomNavigationAction icon={<SearchIcon />} label='Mitglied suchen' component={Link} to="/" value="/" />
            <BottomNavigationAction icon={<PersonAdd />}  label='Hinzufügen' component={Link} to="/useradd" value="/useradd" />
        </BottomNavigation>
    )
}