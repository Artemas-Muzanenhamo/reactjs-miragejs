import renderer from 'react-test-renderer';
import {Navbar} from "../Navbar";
import React from "react";

describe('<Navbar/> component', () => {
    it('renderes <Navbar/> component with title', () => {
        let navbarComponentAsJSON = renderer.create(
            <Navbar title="My Navbar title"/>
        ).toJSON();

        expect(navbarComponentAsJSON).toMatchSnapshot();
    });
});
