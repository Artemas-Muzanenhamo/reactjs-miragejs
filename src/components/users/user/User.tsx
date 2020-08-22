import React, {Component, ReactElement} from "react";

interface IUser {
    name: string;
    surname: string;
}

export class User extends Component<IUser> {
    render(): ReactElement<IUser> {
        return <div>
            <div className="uk-card uk-card-primary uk-card-body">
                <h3 className="uk-card-title">{this.props.name} {this.props.surname}</h3>
                <p>This is a profile card for {this.props.name}</p>
            </div>
        </div>
    }
}
