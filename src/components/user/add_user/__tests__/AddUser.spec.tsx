import React from "react";
import renderer from "react-test-renderer";
import {AddUser} from "../AddUser";

describe('<AddUser /> component', () => {
    it('should render <AddUser /> component', () => {
        let addUserComponentJson = renderer.create(
            <AddUser/>
        ).toJSON();

        expect(addUserComponentJson).toMatchSnapshot();
    });
});
