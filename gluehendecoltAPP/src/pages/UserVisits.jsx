import TextField from '@material-ui/core/TextField';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React, { useState, useCallback, useEffect } from "react";
import { List, ListItem, ListItemText, ListItemAvatar, IconButton, ListItemSecondaryAction } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useUserById } from '../hooks/users';
import { useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import dayjs from 'dayjs';
import { editUser } from '../api/users';
import SaveIcon from '@material-ui/icons/Save';
import useDeepCompareEffect from 'react-use/lib/useDeepCompareEffect';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));





export const UserVisits = () => {
    const { id } = useParams();
    const { user, error } = useUserById(id);
    const [visits, setVisits] = useState([""]);
    const [currentVisit, setCurrentVisit] = useState(0);

    const classes = useStyles();

    useDeepCompareEffect(() => {
        setVisits(user?.visitsTimestamps ? user.visitsTimestamps.split(',') : [])
    }, [user]);

    const handleSave = useCallback(() => {
        editUser(id, {
            ...user,
            // TODO
            visitsTimestamps: visits,
        }).then(() => {
            toast.success("Anwesenheit gespeichert!", {
                position: toast.POSITION.BOTTOM_CENTER
            })
        }).catch((e) => {
            console.error('error saving', e);
            toast.error(`Error beim speichern, ${e}`, {
                position: toast.POSITION.BOTTOM_CENTER
            })
        })


    }, [id, user, visits]);

    return (
        <div className="App-Body">
            <TextField
                id="outlined-required"
                label="Anwesenheit hinzufügen"
                type="date"
                variant="outlined"
                required
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                value={currentVisit}
                onChange={(e) => setCurrentVisit(e.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<AddIcon />}
                onClick={() => {
                    setVisits([...visits, currentVisit]);
                }}
            >
                Anwesenheit hinzufügen
            </Button>

            <List className="Anwesenheit hinzufügen">
                {visits.map((value) => {
                    return (
                        <ListItem>
                            <ListItemAvatar>
                            </ListItemAvatar>
                            <ListItemText aria-label="dsd" >
                                {value}
                            </ListItemText>
                            <ListItemSecondaryAction>
                                <IconButton onClick={() => setVisits(visits.filter((v) => v !== value))}>
                                    <DeleteForeverIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
            </List>
            <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<SaveIcon />}
                onClick={handleSave}
            >
                Speichern
            </Button>
        </div >
    );
} 