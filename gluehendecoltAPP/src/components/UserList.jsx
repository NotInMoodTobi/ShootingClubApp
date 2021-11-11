import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, ListItemAvatar, IconButton, ListItemSecondaryAction, Chip, Typography } from '@material-ui/core';
import axios from "axios";
import { TextField } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import "./components.css";
import { Link } from 'react-router-dom';
import { useAllUsers } from '../hooks/users';
import dayjs from "dayjs";
import CakeIcon from '@material-ui/icons/Cake';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import DoneIcon from '@material-ui/icons/Done';
import EuroIcon from '@material-ui/icons/Euro';



function meetsRequirement(visit) {
    const _visit = typeof visit === 'string' ? visit.split(',') : Array(visit);
    if (_visit.length >= 18 && _visit.every((v) => dayjs(v).year() === dayjs().year())) return true;
    const months = [...new Array(12)];
    return _visit.length >= 12 && months.every((month) => _visit.find((v) => dayjs(v).month() === month));
}

function getCosts(depart) {
    const _depart = typeof depart === 'string' ? depart.split(','):Array(depart);
    if (_depart.length > 1) return 18;
    if (_depart.includes('Bogen')) return 8;
    if (_depart.includes('Luftdruck')) return 10;
    if (_depart.includes('Feuerwaffe')) return 15;
    return 0;
}

export const UserList = () => {
    const [names, setNames] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const { users, error } = useAllUsers();

    const handleEdit = (index) => {
        console.log(index);
    }


    return (
        <div className="App-Body">
            <TextField
                label="Mitglied Suchen"
                className="userSearchField"
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                }}
            />

            <List className="userList">
                {users.filter((val) => {
                    if (searchTerm === "") {
                        return val;
                    } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase()) || val.lastName.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return val;
                    }
                }).map((value, index) => {
                    return (
                        <ListItem>
                            <ListItemAvatar>
                                {value.ID}
                            </ListItemAvatar>
                            <ListItemText primary={
                                <>
                                    <Typography as="span" display="inline" style={{ marginRight: '16px'}}>
                                        {`${value.name} ${value.lastName}`}
                                    </Typography>
                                    {dayjs(value.birthdate).month() === dayjs().month() && dayjs(value.birthdate).date() === dayjs().date() && <Chip label="Geburtstag!" icon={<CakeIcon />} style={{ marginRight: '16px'}} />}
                                    {Math.round(dayjs().diff(dayjs(value.registerDate), 'year', true)) > 1 && <Chip icon={<ShoppingCartIcon />} label="Waffen Kauf!" style={{ marginRight: '16px'}} />}
                                    {meetsRequirement(value.visitsTimestamps) && <Chip label="Anwesenheit" icon={<DoneIcon />} style={{ marginRight: '16px'}} />}
                                    {Boolean(getCosts(value.department)) && <Chip label={`${getCosts(value.department)}€`} icon={<EuroIcon />} style={{ marginRight: '16px'}} />}

                                </>
                            } />
                            
                            <ListItemSecondaryAction>
                                <IconButton
                                    onClick={
                                        () => { handleEdit(index) }
                                    }
                                    component={Link} to={`/useredit/${value.ID}`}
                                >
                                    <EditIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )
                })}
            </List>
        </div >
    )
}