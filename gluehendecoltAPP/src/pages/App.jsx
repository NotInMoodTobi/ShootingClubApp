//Libarys Imports
import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Components Import
import { AppHeader } from "../components/AppHeader";
import { Navigation } from "../components/Navigation";
import { UserList } from "../components/UserList";

// Pages Import
import { UserAdd } from "../pages/UserAdd";
import { UserEdit } from "../pages/UserEdit";
import { UserVisits } from "../pages/UserVisits";

// CSS import
import "./App.css";


function App() {
  return (
    <>
      <Router>
        <AppHeader />
        <Navigation />
        <ToastContainer />
        <Switch>
          <Route exact path="/" component={UserList} />
          <Route path="/useradd" component={UserAdd} />
          <Route path="/useredit/:id/uservisits" component={UserVisits} />
          <Route path="/useredit/:id" component={UserEdit} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
