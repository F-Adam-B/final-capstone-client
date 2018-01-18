import React from 'react';
import { shallow } from 'enzyme';
import adapter from '../setupTests';

import LoginForm from '../components/LoginForm';

describe('LoginForm component', () => {

  it('should render without fail', () => {
    shallow(<LoginForm />)
  })

});