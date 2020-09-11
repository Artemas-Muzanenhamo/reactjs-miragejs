import React, {Component} from "react";
import {GetUser} from "../user/get_user/GetUser";
import {UsersApi} from "../../api/users/UsersApi";

interface IUser {
    name: string;
    surname: string;
}

export interface IUserJson {
    name: string
    surname: string
}

interface IUsers {
    users: IUser[];
}

export class Users extends Component {

    state: IUsers = {
        users: [{
            name: '',
            surname: ''
        }]
    };

    private mapToUser = (users: IUserJson[]): IUser[] => users
        .map(user => ({
                name: user.name,
                surname: user.surname
            })
        );

    componentDidMount(): void {
        UsersApi.fetchUsers()
            .then(this.mapToUser)
            .then(users => this.setState({users}));
    }

    render(): React.ReactElement {
        return <div className="uk-child-width-1-3@m uk-grid-small uk-grid-match uk-grid">
            {this.state.users
                .map(user =>
                    <GetUser key={user.name} name={user.name} surname={user.surname}/>
                )
            }
        </div>
    }
}
