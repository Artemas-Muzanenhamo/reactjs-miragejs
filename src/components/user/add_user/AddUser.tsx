import React, {Component} from "react";

interface User {
    name: string;
    surname: string;
}

export class AddUser extends Component {

    state = {
        user: {
            name: '',
            surname: ''
        }
    };

    private formTitle = "Add A User";
    private buttonValue = "Add User";

    render() {
        return <div>
            <form>
                <fieldset className="uk-fieldset">
                    <legend className="uk-legend">{this.formTitle}</legend>

                    <div className="uk-margin">
                        <input className="uk-input uk-form-width-large" type="text" placeholder="First Name"/>
                    </div>
                    <div className="uk-margin">
                        <input className="uk-input uk-form-width-large" type="text" placeholder="Surname"/>
                    </div>

                    <div>
                        <input className="uk-button uk-button-default" type="button" value={this.buttonValue}/>
                    </div>
                </fieldset>
            </form>
        </div>
    }
}
