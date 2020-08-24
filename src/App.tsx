import React, {Component} from 'react';
import './App.css';
import {Navbar} from "./components/navbar/Navbar";
import {Users} from "./components/users/Users";

export default class App extends Component {
    private navbarTitle: string = "Users Infomation";

    render(): React.ReactElement {
        return (
            <div className="App">
                <Navbar title={this.navbarTitle} />
                <Users />
            </div>
        );
    }
}
