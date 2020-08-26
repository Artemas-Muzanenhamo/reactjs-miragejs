import {shallow} from "enzyme";
import {GetUser} from "../../user/GetUser";
import React from "react";
import {Users} from "../Users";
import renderer from 'react-test-renderer';

describe('<Users />', () => {
    function Users() {
        return <div>
            <GetUser name="Don" surname="Morretti"/>
            <GetUser name="Sarah" surname="Vaughn"/>
            <GetUser name="Steve" surname="Smith"/>
        </div>
    }

    it('renders <GetUser /> component', () => {
        let wrapper = shallow(<Users/>);
        expect(wrapper.find(GetUser)).toHaveLength(3);
    });

    it('renders fetched Users', () => {
        let tree = renderer.create(
            <Users />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
