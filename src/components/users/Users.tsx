import React, {Component, useState} from "react";
import {Server} from "miragejs";
import {render} from "react-dom";

export interface User {
    name: string;
    surname: string;
}

interface UserJson {
    name: string
    surname: string
}

export class Users extends Component {

    state = {
        users: [{
            name: '',
            surname: ''
        }]
    };

    constructor(props: User) {
        super(props);
    }

    componentDidMount(): void {

        this.mirageJsServer();

        fetch('/api/users')
            .then(response => response.json())
            .then((response) => Users.mapToUser(response))
            .then(users => useState(() => users))
            .catch(error => console.error('Failed to retrieve users: ', error));
    }

    private static mapToUser(users: UserJson[]): User[] {
        return users.map(user => {
            return {
                name: user.name,
                surname: user.surname
            }
        })
    }

    public mirageJsServer(): Server {
        return new Server({
            routes(): void {
                this.namespace = 'api';

                this.get('/users', () => {
                    return [
                        {
                            name: 'Bob',
                            surname: 'Muza'
                        }]
                });
            },
        });
    }

    render(): React.ReactElement {
        return <div>
            {this.state.users.map(user => <div>{user.name}</div>)}
        </div>
    }
}
