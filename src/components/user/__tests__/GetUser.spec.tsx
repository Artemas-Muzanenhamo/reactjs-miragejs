import React from "react";
import renderer from "react-test-renderer";
import {GetUser} from "../GetUser";

describe('<GetUser /> component', () => {
    it('renders <GetUser /> component', () => {
        let userComponentAsJson = renderer.create(
            <GetUser name="Jane" surname="Doe"/>
        ).toJSON();

        expect(userComponentAsJson).toMatchSnapshot();
    });
});
