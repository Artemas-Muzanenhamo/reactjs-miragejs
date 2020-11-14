import React, {Component} from "react";
import {Field, Form, Formik} from "formik";
import {UsersApi} from "../../../api/users/UsersApi";


interface UserForm {
    user: {
        name: string;
        surname: string;
    }
}

export class AddUser extends Component<any, UserForm> {

    constructor(props: any, state: UserForm) {
        super(props, state);
        this.state = {
            user: {
                name: '',
                surname: ''
            }
        };
    }

    private formTitle = "Add A User";
    private buttonValue = "Add User";

    render() {
        return <div>
            <Formik
                initialValues={{name: '', surname: ''}}
                onSubmit={async values => {
                    this.setState({
                        user: {
                            name: values.name,
                            surname: values.surname
                        }
                    });
                    await UsersApi.addUser(values);
                }}
            >
                <Form>
                    <fieldset className="uk-fieldset">
                        <legend className="uk-legend">{this.formTitle}</legend>

                        <div className="uk-margin">
                            <Field className="uk-input uk-form-width-large" type="text" placeholder="First Name"
                                   name="name"/>
                        </div>
                        <div className="uk-margin">
                            <Field className="uk-input uk-form-width-large" type="text" placeholder="Surname"
                                   name="surname"/>
                        </div>

                        <div>
                            <input className="uk-button uk-button-default" type="submit" value={this.buttonValue}/>
                        </div>
                    </fieldset>
                </Form>
            </Formik>
        </div>
    }
}
