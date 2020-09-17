import React, {Component, createContext} from "react";

interface IUser {
    name: string;
    surname: string;
}

interface IUsers {
    users: IUser[];
}

export const UserContext = createContext<IUsers>({
    users: [{
        name: '',
        surname: ''
    }]
});

export class UserContextProvider extends Component<any, any> {
    state: IUsers = {
        users: [{
            name: '',
            surname: ''
        }]
    };

    render() {
        return (
            <UserContext.Provider value={{...this.state}}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}
