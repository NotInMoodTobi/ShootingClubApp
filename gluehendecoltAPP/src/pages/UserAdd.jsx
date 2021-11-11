import React, { useState, useCallback } from "react";
import TextField from '@material-ui/core/TextField';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';
import { ESex, addUser } from '../api/users';
import dayjs from 'dayjs';
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


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const abteilungen = [
    "Bogen",
    "Luftdruck",
    "Feuerwaffe"
];

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export const UserAdd = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [registerDate, setRegisterDate] = useState('');
    const [sex, setSex] = useState('');
    const [abteilung, setAbteilung] = useState([]);
    const [notes, setNotes] = useState('');


    const theme = useTheme();
    const classes = useStyles();

    const handleNotes = (event) => {
        setNotes(event.target.value);
    }

    const handleSex = (event) => {
        setSex(event.target.value);
    };
    const handleAbteilung = (event) => {
        setAbteilung(event.target.value);
    };

    const handleSave = useCallback(() => {
        addUser({
            name,
            lastName,
            birthdate: dayjs(birthday).valueOf(),
            registerDate: dayjs(registerDate).valueOf(),
            sex,
            department: abteilung,
            visitsTimestamps: "",
            notes
        }).then(() => {
            toast.success("Mitglied hinzugefügt!", {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }).catch((e) => {
            toast.error(`Error beim hinzufügen, ${e}`, {
                position: toast.POSITION.BOTTOM_CENTER
            });
        });


    }, [name, lastName, birthday, registerDate, sex, abteilung,notes]);

    return (
        <>
            <div className="App-Body">
                <form className={classes.root} noValidate autoComplete="off">
                    <div className="userAddBody">
                        <TextField
                            required
                            id="outlined-required"
                            label="Name"
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <TextField
                            required
                            id="outlined-required"
                            label="Nachname"
                            variant="outlined"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />

                        <TextField
                            id="outlined-required"
                            label="Geburtsdatum"
                            type="date"
                            variant="outlined"
                            required
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                        />

                        <TextField
                            id="outlined-required"
                            label="Mitglied seit"
                            type="date"
                            variant="outlined"
                            required
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={registerDate}
                            onChange={(e) => setRegisterDate(e.target.value)}
                        />

                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label">Geschlecht</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={sex}
                                onChange={handleSex}
                                label="Geschlecht"
                            >
                                <MenuItem value={ESex.male}>M</MenuItem>
                                <MenuItem value={ESex.female}>F</MenuItem>
                                <MenuItem value={ESex.other}>D</MenuItem>
                            </Select>
                        </FormControl>


                        <FormControl id="outlined-required" className={classes.formControl}>
                            <InputLabel id="demo-mutiple-chip-label">Abteilungen</InputLabel>
                            <Select
                                labelId="demo-mutiple-chip-label"
                                id="demo-mutiple-chip"
                                multiple
                                value={abteilung}
                                onChange={handleAbteilung}
                                input={<Input id="select-multiple-chip" />}
                                renderValue={(selected) => (
                                    <div className={classes.chips}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} className={classes.chip} />
                                        ))}
                                    </div>
                                )}
                                MenuProps={MenuProps}
                            >
                                {abteilungen.map((department) => (
                                    <MenuItem key={department} value={department} style={getStyles(department, abteilung, theme)}>
                                        {department}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            id="outlined-multiline-static"
                            label="Notizfeld"
                            multiline
                            rows={4}
                            variant="outlined"
                            value={notes}
                            onChange={handleNotes}
                        />
                        <div>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                startIcon={<SaveIcon />}
                                onClick={handleSave}
                            >
                                Speichern
                            </Button>
                        </div>
                    </div>
                </form>
            </div>

        </>
    )
}