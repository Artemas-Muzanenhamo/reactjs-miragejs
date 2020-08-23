import {shallow} from "enzyme";
import {User} from "../../user/User";
import React from "react";
import {Users} from "../Users";
import renderer from 'react-test-renderer';

describe('<Users />', () => {
    it('renders <User /> component', () => {
        let wrapper = shallow(<Users/>);
        expect(wrapper.find(User)).toHaveLength(1);
    });

    it('renders fetched Users', () => {
        let tree = renderer.create(
            <User name="Arty" surname="Prime" />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
