import React from 'react';
import App from "./App";
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Navbar} from "./components/navbar/Navbar";
import {Users} from "./components/users/Users";

configure({ adapter: new Adapter() });

describe('<App />', () => {
  it('renders <NavBar /> and <Users /> component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Navbar)).toHaveLength(1);
    expect(wrapper.find(Users)).toHaveLength(1);
  });
});
