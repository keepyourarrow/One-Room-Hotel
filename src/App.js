//dependencies
import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";

// Pages
import { HomePage } from "./pages/HomePage";
import { RoomsPage } from "./pages/RoomsPage";
import { CreateRoomPage } from "./pages/CreateRoomPage";
import { ErrorPage } from "./pages/ErrorPage";
import { SingleRoomPage } from "./pages/SingleRoomPage";
import { LoginPage } from "./pages/LoginPage";
import { Navbar } from "./components/globals/Navbar";
import { PleaseLoginAlert } from "./components/globals/PleaseLoginAlert";

function App() {
  return (
    <>
      <PleaseLoginAlert />
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/rooms" component={RoomsPage} />
        <Route exact path="/create-new-room" component={CreateRoomPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/rooms/:slug" component={SingleRoomPage} />
        <Route component={ErrorPage} />
      </Switch>
    </>
  );
}

export default App;
