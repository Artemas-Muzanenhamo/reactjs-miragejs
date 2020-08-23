import {shallow} from "enzyme";
import {User} from "../../user/User";
import React from "react";
import {Users} from "../Users";
import renderer from 'react-test-renderer';

describe('<Users />', () => {
    function Users() {
        return <div>
            <User name="Don" surname="Morretti"/>
            <User name="Sarah" surname="Vaughn"/>
            <User name="Steve" surname="Smith"/>
        </div>
    }

    it('renders <User /> component', () => {
        let wrapper = shallow(<Users/>);
        expect(wrapper.find(User)).toHaveLength(3);
    });

    it('renders fetched Users', () => {
        let tree = renderer.create(
            <Users />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
