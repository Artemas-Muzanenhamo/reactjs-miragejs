import React, {Component} from "react";
import {Server} from "miragejs";

interface IUser {
    name: string;
    surname: string;
}

interface IUserJson {
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

    componentDidMount(): void {
        this.mirageJsServer();
        this.fetchUsers();
    }

    private fetchUsers(): void {
        fetch('/api/users')
            .then(response => response.json())
            .then((response) => Users.mapToUser(response))
            .then(users => this.setState({users}))
            .catch(error => console.error('Failed to retrieve users: ', error));
    }

    private static mapToUser = (users: IUserJson[]): IUser[] => users
        .map(user => ({
                name: user.name,
                surname: user.surname
            })
        );

    private static mockedUsers = (): IUserJson[] => [
        {
            name: 'Artemas',
            surname: 'Muza'
        }, {
            name: 'LeBron',
            surname: 'James'
        }, {
            name: 'Lara',
            surname: 'Croft'
        }
    ];

    mirageJsServer(): Server {
        return new Server({
            routes(): void {
                this.namespace = 'api';

                this.get('/users', () => {
                    return Users.mockedUsers();
                });
            },
        });
    }

    render(): React.ReactElement {
        return <div className="uk-child-width-1-3@m uk-grid-small uk-grid-match uk-grid">
            {this.state.users
                .map(user =>
                    <div key={user.name}>
                        <div>
                            <div className="uk-card uk-card-primary uk-card-body">
                                <h3 className="uk-card-title">{user.name} {user.surname}</h3>
                                <p>This is a profile card for {user.name}</p>
                            </div>
                        </div>
                    </div>)}
        </div>
    }
}
