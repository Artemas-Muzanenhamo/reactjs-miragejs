import React from "react";
import renderer from "react-test-renderer";
import {User} from "../User";

describe('<User /> component', () => {
    it('renders <User /> component', () => {
        let userComponentAsJson = renderer.create(
            <User name="Jane" surname="Doe"/>
        ).toJSON();

        expect(userComponentAsJson).toMatchSnapshot();
    });
});
