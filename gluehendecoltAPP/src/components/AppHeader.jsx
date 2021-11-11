import {AppBar} from '@material-ui/core'
import logo from '../images/AppLogoTransWhite.png';
import "./components.css";

export const AppHeader = () => {
    return (
        <AppBar position="sticky" id="AppBar">
            <img
                src={logo}
                className={"App-Logo"}
            />
        </AppBar>
    )
};