import React from 'react';
import App from "./App";
import { shallow } from 'enzyme';
import {Navbar} from "./components/navbar/Navbar";
import {Users} from "./components/users/Users";

describe('<App />', () => {
  it('renders <NavBar /> and <Users /> component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Navbar)).toHaveLength(1);
    expect(wrapper.find(Users)).toHaveLength(1);
  });
});
