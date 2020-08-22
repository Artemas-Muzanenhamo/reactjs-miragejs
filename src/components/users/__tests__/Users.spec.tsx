import {shallow} from "enzyme";
import {User} from "../../user/User";
import React from "react";
import {IUserJson, Users} from "../Users";
import renderer from 'react-test-renderer';

describe('<Users />', () => {
    it('renders <User /> component', () => {
        let wrapper = shallow(<Users/>);
        expect(wrapper.find(User)).toHaveLength(1);
    });

    function testUsersJson(): IUserJson[] {
        return [
            {
                name: 'Dummy',
                surname: 'Test'
            },
            {
                name: 'Hello',
                surname: 'World'
            }
        ];
    }

    function mockSuccessFetchPromise(users = testUsersJson()) {
        return Promise.resolve({
            json: () => Promise.resolve(users),
            status: 200
        });
    }

    it('renders fetched Users', () => {
        jest.spyOn(global, 'fetch').mockImplementation(() => mockSuccessFetchPromise() as Promise<Response>);

        let tree = renderer.create(
            <Users/>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
