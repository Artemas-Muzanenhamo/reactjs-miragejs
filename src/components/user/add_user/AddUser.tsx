import React, {Component} from "react";
import {Field, Form, Formik} from "formik";


interface User {
    user: {
        name: string;
        surname: string;
    }
}

export class AddUser extends Component<any, User> {

    constructor(props: any, state: User) {
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
                    await new Promise(resolve => setTimeout(resolve, 500));
                    this.setState({
                        user: {
                                name: values.name,
                                surname: values.surname
                            }
                    })
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
