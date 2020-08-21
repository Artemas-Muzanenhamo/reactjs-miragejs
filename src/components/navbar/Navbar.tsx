import React from "react";

interface Props {
    title: string
}

export class Navbar extends React.Component<Props> {


    constructor(props: Readonly<Props>) {
        super(props);
    }

    render(): React.ReactElement {
        return <div className="uk-navbar-container uk-navbar">
            <div className="uk-navbar-center">
                <a href="" className="uk-navbar-item uk-logo">{this.props.title}</a>
            </div>
        </div>
    }
}
